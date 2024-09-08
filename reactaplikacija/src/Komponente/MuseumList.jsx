import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MuseumCard from './MuseumCard';
import './MuseumList.css'; // Stilizacija za listu kartica

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/museums', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMuseums(response.data);
        setLoading(false);
      } catch (error) {
        setError('Greška prilikom učitavanja muzeja.');
        setLoading(false);
      }
    };

    fetchMuseums();
  }, []);

  if (loading) return <p>Učitavanje muzeja...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="museum-list-container">
      {museums.length > 0 ? (
        museums.map((museum) => <MuseumCard key={museum.id} museum={museum} />)
      ) : (
        <p>Nema dostupnih muzeja.</p>
      )}
    </div>
  );
};

export default MuseumList;
