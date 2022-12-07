import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

// database
import db from './models/index.js';

// socket
// const socket = require('./socket.js');
// import socket from './socket.js';

dotenv.config();

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
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결됨");
  })
  .catch((err) => {
    console.log(err);
  });

// socket
// socket(server);

app.listen(app.get("port"), () => {
  console.log(app.get("port") + " 서버를 열었습니다.");
});
