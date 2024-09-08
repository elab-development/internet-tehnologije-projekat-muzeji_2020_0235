import logo from './logo.svg';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegisterForm from './Komponente/RegisterForm';
import MessageForm from './Komponente/MessageForm';

function App() {
  return (
    <div className="App">
      <MessageForm></MessageForm>
      <RegisterForm></RegisterForm>
       <LoginForm></LoginForm>
        {/* <Pocetna></Pocetna> */}
       
    </div>
  );
}

export default App;
