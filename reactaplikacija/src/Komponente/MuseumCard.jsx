import React from 'react';
import './MuseumCard.css';  

const MuseumCard = ({ museum }) => {
  return (
    <div className="museum-card">
      <img src={museum.image_url} alt={museum.name} className="museum-image" />
      <h3>{museum.name}</h3>
      <p>{museum.description}</p>
      <p>Lokacija: {museum.location}</p>
      <p>Tip: {museum.type}</p>
      <p>Cena ulaznice: {museum.ticket_price} din</p>
    </div>
  );
};

export default MuseumCard;
