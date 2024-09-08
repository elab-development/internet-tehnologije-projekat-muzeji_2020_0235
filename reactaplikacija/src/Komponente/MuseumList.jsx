import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MuseumCard from './MuseumCard';
import './MuseumList.css'; // Stilizacija za listu kartica

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Pretraga
  const [sortOption, setSortOption] = useState(''); // Sortiranje

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Filtriranje muzeja na osnovu pojma za pretragu
  const filteredMuseums = museums.filter((museum) =>
    museum.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sortiranje muzeja
  const sortedMuseums = filteredMuseums.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'price') {
      return a.ticket_price - b.ticket_price;
    }
    return 0;
  });

  if (loading) return <p>Učitavanje muzeja...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
          {/* Pretraga */}
          <div className="search-sort-container">
          <input
            type="text"
            placeholder="Pretraži muzeje..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
  
          {/* Sortiranje */}
          <select value={sortOption} onChange={handleSort} className="sort-select">
            <option value="">Sortiraj po</option>
            <option value="name">Nazivu</option>
            <option value="price">Ceni ulaznice</option>
          </select>
        </div>
    <div className="museum-list-container">


      {sortedMuseums.length > 0 ? (
        sortedMuseums.map((museum) => <MuseumCard key={museum.id} museum={museum} />)
      ) : (
        <p>Nema dostupnih muzeja.</p>
      )}
    </div></>
  );
};

export default MuseumList;
