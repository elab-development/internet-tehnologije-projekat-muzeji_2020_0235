import React from 'react';
import './Pocetna.css';

const Pocetna = () => {
  return (
    <div className="app-container"> 
      <section className="features-section">
        <h2>Why Visit a Museum?</h2>
        <div className="features-container">
          <div className="feature-box">
            <h3>Explore Art</h3>
            <p>From classical paintings to modern sculptures, our museums offer a wide range of artistic expressions from renowned artists worldwide.</p>
          </div>
          <div className="feature-box">
            <h3>Step into History</h3>
            <p>Walk through history with exhibitions that bring the past to life, from ancient civilizations to the modern era.</p>
          </div>
          <div className="feature-box">
            <h3>Learn Science</h3>
            <p>Experience the wonders of science through interactive exhibits and displays that ignite curiosity and inspire innovation.</p>
          </div>
        </div>
      </section>

      <section className="museum-highlights-section">
        <h2>Featured Museums</h2>
        <div className="museum-gallery">
          <div className="museum-card">
            <img src="https://palaceoffinearts.com/wp-content/uploads/sites/8/2017/05/pofa_home_hero_v1.jpg" alt="Museum 1" />
            <h3>The Art Palace</h3>
            <p>A grand collection of fine arts from around the world. A must-visit for art lovers.</p>
          </div>
          <div className="museum-card">
          <img src="https://palaceoffinearts.com/wp-content/uploads/sites/8/2017/05/pofa_home_hero_v1.jpg" alt="Museum 1" />
            <h3>History Museum</h3>
            <p>Dive into the history of mankind with exhibits dating back thousands of years.</p>
          </div>
          <div className="museum-card">
          <img src="https://palaceoffinearts.com/wp-content/uploads/sites/8/2017/05/pofa_home_hero_v1.jpg" alt="Museum 1" />
            <h3>Science Center</h3>
            <p>Interactive exhibits and displays that make science fun for all ages.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Museum Explorer | Bringing Culture to You</p>
      </footer>
    </div>
  );
};

export default Pocetna;
