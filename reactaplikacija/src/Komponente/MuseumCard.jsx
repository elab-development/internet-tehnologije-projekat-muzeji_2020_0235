import React, { useState } from 'react';
import './MuseumCard.css';

const MuseumCard = ({ museum, onReserve, selectedCurrency }) => {  // Dodato selectedCurrency kao prop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [reservationDate, setReservationDate] = useState('');
  const [error, setError] = useState('');  // Stanje za prikazivanje grešaka

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNumTickets(1);
    setReservationDate('');
    setError('');  // Resetujemo grešku
  };

  const handleReserve = () => {
    const today = new Date().setHours(0, 0, 0, 0); // Danasnji datum bez vremena
    const selectedDate = new Date(reservationDate).setHours(0, 0, 0, 0); // Izabrani datum bez vremena

    if (selectedDate < today) {
      setError('Ne možete rezervisati datum iz prošlosti.');
      return;
    }

    // Kreiraj rezervaciju
    onReserve(museum.id, reservationDate, numTickets);
    closeModal();
  };

  return (
    <div className="museum-card">
      <img src={museum.image_url} alt={museum.name} className="museum-image" />
      <h3>{museum.name}</h3>
      <p>{museum.description}</p>
      <p>Lokacija: {museum.location}</p>
      <p>Tip: {museum.type}</p>
      <p>
        Cena ulaznice: {museum.ticket_price.toFixed(2)} {selectedCurrency} {/* Zaokruženo na 2 decimale i dodata oznaka valute */}
      </p>
      <button onClick={openModal} className="reserve-button">
        Rezerviši
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Rezervacija za {museum.name}</h2>
            {error && <p className="error-message">{error}</p>}  {/* Prikaz greške */}
            <div>
              <label>Datum rezervacije:</label>
              <input
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Broj karata:</label>
              <input
                type="number"
                value={numTickets}
                min="1"
                onChange={(e) => setNumTickets(e.target.value)}
                required
              />
            </div>
            <button onClick={handleReserve} className="submit-button">
              Potvrdi rezervaciju
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MuseumCard;
