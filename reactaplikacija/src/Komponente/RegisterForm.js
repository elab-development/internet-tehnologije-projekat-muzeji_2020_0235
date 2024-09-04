import React, { useState } from 'react';
import axios from 'axios';
 

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      
      // Čuvanje tokena i korisničkih podataka u sessionStorage
      sessionStorage.setItem('auth_token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

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
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password:</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="explore-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
