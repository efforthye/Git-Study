import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  return (
    <div className="App">
      <div onClick={() => {
        window.prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", window.location.href);
      }}>클릭시 현재 url 띄움</div>

      <div onClick={async () => {
        const mail = prompt("인증번호를 보낼 메일을 작성해주세요.");
        // sendMail();

        const mailSend = await axios.post("http://localhost:8080/board/mail/mailSend", {
          mail : mail
        });

        // 인증번호
        console.log(mailSend.data);

      }}>
        클릭시 이메일 보내기
      </div>

    </div>
  );
}

export default App;
