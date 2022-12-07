// /board
const router = require("express").Router();

// 라우터 추가
// const user = require("./user.js");


// 여기에서 요청을 받음
router.post("/test", (req, res, next)=>{
    console.log(req.body); // { id: '후후', pw: '비비' } 잘 출력됨을 확인
});


// 라우터 추가
// router.use("/user", user);

module.exports = router;