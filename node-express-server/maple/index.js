

const hi = document.getElementById("hi");

hi.onclick = async function() {
    const test = await axios.post("/board/test", {
       id : "후후",
       pw : "비비" 
    });

};


// 회원가입
// signUpBtn.onclick = async function(e){
//     console.log("회원가입 클릭");
//     e.preventDefault(); // 이거 안하면 어떻게 되는지? : 

//     // 서버쪽(user regist)으로 axios를 이용해 데이터에 대한 요청(post)을 보낸다.
//     // 라우터 경로 설정해주기
//     const signUp = document.forms["sign-up"];
//     await axios.post("/user/regist", {
//         id :         signUp.id.value,
//         pw :         signUp.pw.value,
//         name :       signUp.name.value,
//         nickname :   signUp.nickname.value,
//         gender :     signUp.gender.value,
//         age :        signUp.age.value
//     });

//     console.log("회원가입 데이터 보내기 끝");
//     // console.log(`회원가입 데이터 : ${JSON.stringify(data)}`);

// }