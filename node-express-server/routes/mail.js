// /board/mail
const router = require("express").Router();

// 메일 보내는 라이브러리
const nodemailer = require('nodemailer');

// n자리 랜덤 숫자 생성 함수
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str;
}

let code = "";

// 메일 보내는 함수
const sendGmail = (_userEmail) => {

    code = generateRandomCode(6);
    console.log(_userEmail, code);

    let transporter = nodemailer.createTransport({
        service: 'gmail',   // 메일 보내는 곳
        prot: 587,
        host: 'smtp.gmlail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.NODEMAILER_USER,  // 보내는 메일의 주소
            // pass: process.env.NODEMAILER_PASS   // 보내는 메일의 비밀번호
            pass: process.env.MAIL_APP_PASSWORD   // 보내는 메일의 2차 비밀번호
        }
    });
    // 메일 옵션
    let mailOptions = {
        from: `"HYERIM" <${process.env.NODEMAILER_USER}>`, // 보내는 메일의 주소
        to: _userEmail, // 수신할 이메일
        subject: "[HYERIM TEST] 인증번호를 입력해주세요.", // 메일 제목
        // text: code, // 메일 내용
        text: `인증번호 [${code}]를 인증 창에 입력하세요.`, // 메일 내용
        html: `<h1>이메일 인증</h1>
          <div>
            인증번호 [${code}]를 인증 창에 입력하세요.
            <a href='www.efforthye.com'>금쪽이스토리로가기</a>
          </div>`,
    };

    // 메일 발송    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


router.post("/mailSend", (req, res) => {
    console.log(req.body.mail);
    sendGmail(req.body.mail);
    res.send(code);
    res.end();
});

module.exports = router;

