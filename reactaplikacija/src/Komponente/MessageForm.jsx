import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [museums, setMuseums] = useState([]); // Lista muzeja
  const [selectedMuseum, setSelectedMuseum] = useState(''); // Odabrani muzej
  const [content, setContent] = useState(''); // Sadržaj poruke
  const [successMessage, setSuccessMessage] = useState(''); // Poruka uspeha
  const [errorMessage, setErrorMessage] = useState(''); // Poruka greške

  useEffect(() => {
    // Dohvati sve muzeje prilikom učitavanja komponente
    const fetchMuseums = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/museums', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMuseums(response.data);
      } catch (error) {
        console.error('Greška prilikom dobijanja muzeja:', error);
      }
    };

    fetchMuseums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('auth_token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/messages',
        {
          museum_id: selectedMuseum,
          content: content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Ako je uspešno, prikaži poruku uspeha
      setSuccessMessage('Poruka je uspešno kreirana.');
      setErrorMessage(''); // Očisti grešku ako postoji
      setContent(''); // Očisti polje za unos
      setSelectedMuseum(''); // Resetuj odabrani muzej
    } catch (error) {
      // Ako nije uspešno, prikaži grešku
      setErrorMessage('Došlo je do greške prilikom kreiranja poruke.');
      setSuccessMessage(''); // Očisti poruku uspeha
    }
  };

  return (
    <div className="message-form-container">
      <h2>Kreiraj Poruku</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="museum">Izaberi Muzej:</label>
          <select
            id="museum"
            value={selectedMuseum}
            onChange={(e) => setSelectedMuseum(e.target.value)}
            required
          >
            <option value="">Izaberi Muzej</option>
            {museums.map((museum) => (
              <option key={museum.id} value={museum.id}>
                {museum.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Poruka:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Unesi poruku"
            required
          ></textarea>
        </div>

        <button type="submit">Pošalji Poruku</button>
      </form>
    </div>
  );
};

export default MessageForm;
