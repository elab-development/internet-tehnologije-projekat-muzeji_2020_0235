import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ user, token, setUser, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ukloni token i korisničke podatke iz sessionStorage
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');

      // Resetuj state
      setToken(null);
      setUser(null);

      // Preusmeri na početnu stranicu
      navigate('/');
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Početna</Link>
        {!token ? (
          <>
            <Link to="/login">Prijava</Link>
            <Link to="/register">Registracija</Link>
          </>
        ) : (
          <>
            {user && user.role === 'user' ? (
              <>
                <Link to="/message">Poruka</Link>
                <Link to="/museums">Muzeji</Link>
                <Link to="/mojeRezervacije">Moje rezervacije</Link>
              </>
            ) : user && user.role == 'worker' ? (
              <>
                <Link to="/admin/message">Admin Poruke</Link>
                <Link to="/admin/museums">Admin Muzeji</Link>
              </>
            ) : null}

            <button onClick={handleLogout}>Odjava</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
