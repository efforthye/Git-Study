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

// 크로스오리진
app.use(cors({origin : "http://localhost:3000", credentials :true}));

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
    .sync({force:true})
    .then(()=>{
        console.log("DB 연결됨");
    })
    .catch((err)=>{
       console.log(err); 
    });

// /board로 라우팅
app.use("/board", router);

// 크로스오리진(origin : 서버한테 요청을 하는 애 - react)
app.use(cors({origin : "http://localhost:3000"}));

app.listen(app.get("port"), () => {
  console.log(app.get("port")+" 서버를 열었습니다.");
});
