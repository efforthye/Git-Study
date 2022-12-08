import logo from './logo.svg';
import './App.css';

function App() {
  

  return (
    <div className="App">
      <div onClick={()=>{
        window.prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", window.location.href);
      }}>클릭시 현재 url 띄움</div>
      
    </div>
  );
}

export default App;
