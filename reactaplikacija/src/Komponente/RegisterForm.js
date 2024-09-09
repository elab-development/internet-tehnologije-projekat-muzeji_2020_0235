import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';  
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      
      // Čuvanje tokena i korisničkih podataka u sessionStorage
    
      navigate('/login')
      setSuccess('Registration successful!');
      setError(null);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Registration failed. Please check your input.');
      }
      setSuccess(null);
    }
  };

  return (
    <div className="app-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Create Your Museum Account</h1>
          {error && <p className="error-message">{error.email || error.password || 'An error occurred during registration.'}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit} className="register-form">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            <InputField
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            <button type="submit" className="explore-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
