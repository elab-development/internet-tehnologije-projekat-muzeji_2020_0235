import logo from './logo.svg';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegisterForm from './Komponente/RegisterForm';

function App() {
  return (
    <div className="App">
      <RegisterForm></RegisterForm>
       <LoginForm></LoginForm>
        {/* <Pocetna></Pocetna> */}
       
    </div>
  );
}

export default App;
