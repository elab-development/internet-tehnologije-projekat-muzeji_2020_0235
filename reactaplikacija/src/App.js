import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegisterForm from './Komponente/RegisterForm';
import MessageForm from './Komponente/MessageForm';
import MuseumList from './Komponente/MuseumList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/message" element={<MessageForm />} />
          <Route path="/museums" element={<MuseumList />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
