import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';  
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser, setToken }) => {
  const [formData, setFormData] = useState({
    email: 'anadrobnjak@gmail.com',
    password: 'password',
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  let navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      
      // Čuvanje tokena i korisničkih podataka u sessionStorage
      sessionStorage.setItem('auth_token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      // Postavljanje tokena i korisnika u state
      setToken(response.data.token);
      setUser(response.data.user);

      setSuccess('Login successful!');
      setError(null);
      if(response.data.user.role=="worker"){
        navigate("/admin/museums")
      }else{
        navigate("/museums")
      }
    
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setSuccess(null);
    }
  };
  return (
    <div className="app-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Login to Your Museum Account</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="explore-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
