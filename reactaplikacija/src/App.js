import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegisterForm from './Komponente/RegisterForm';
import MessageForm from './Komponente/MessageForm';
import MuseumList from './Komponente/MuseumList';
import Navbar from './Komponente/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Učitavanje tokena i korisnika iz sessionStorage
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const storedToken = sessionStorage.getItem('auth_token');

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} token={token} setUser={setUser} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          {!token ? (
            <>
              <Route path="/login" element={<LoginForm setUser={setUser} setToken={setToken} />} />
              <Route path="/register" element={<RegisterForm />} />
            </>
          ) : (
            <>
              <Route path="/message" element={<MessageForm />} />
              <Route path="/museums" element={<MuseumList />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
