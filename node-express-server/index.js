const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

// database
db = require("./models/index.js");

// router
const router = require("./routes/index.js");

// 크로스오리진
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "maple")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// database
db.sequelize
    .sync({force:false})
    .then(()=>{
        console.log("DB 연결됨");
    })
    .catch((err)=>{
       console.log(err); 
    });

// /board로 라우팅
app.use("/board", router);

// 크로스오리진(서버한테 요청하는 애 react)
// 크로스오리진 해결
// 단, 현재는 단점이 있다고 함(모든 주소에 대해서 응답해준다.)
// 우리는 응답하도록 3000포트만 해주고 싶은데..
// app.use(cors());
// 그래서 이렇게 이 주소만 원본이라고 설정해 3000포트만 응답하도록 했다.
// origin : 원본 주소이며, 해당 원본 주소에 대해서만 요청을 응답하도록 한다.
// 원본 주소에는 http와 같은 프로토콜, localhost와 같은 도메인 주소, :3000와 같은 포트까지 포함한다.
// /api와 같은 라우터는 포함하지 않는다.
// 어떤 서버로 요청보낼 것인지 지정해준다.
app.use(cors({origin : "http://localhost:3000"}));

app.listen(app.get("port"), () => {
  console.log(app.get("port")+" 서버를 열었습니다.");
});
