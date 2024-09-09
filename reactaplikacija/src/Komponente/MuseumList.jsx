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
  const [selectedCurrency, setSelectedCurrency] = useState('RSD');
  const [currencyList, setCurrencyList] = useState(['RSD', 'USD', 'EUR', 'GBP', 'JPY', 'CHF']);  
  const [apiKey] = useState('97881401fc7e1ad5c8095cd5');  
  const [convertedPrices, setConvertedPrices] = useState({}); // Dodato za čuvanje konvertovanih cena

  // Učitavanje muzeja
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

  // Dohvatanje kursa valute sa ExchangeRate-API
  const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`
      );
      return response.data.conversion_rate;
    } catch (error) {
      console.error('Greška prilikom dohvatanja kursa valute.', error);
      return 1; // Vraćamo default kurs u slučaju greške
    }
  };

  // Konvertovanje svih cena prilikom promene valute
  useEffect(() => {
    const convertAllPrices = async () => {
      const newPrices = {};
      for (const museum of museums) {
        const exchangeRate = await getExchangeRate('RSD', selectedCurrency);
        const convertedPrice = museum.ticket_price * exchangeRate;
        newPrices[museum.id] = convertedPrice;
      }
      setConvertedPrices(newPrices);
    };

    if (museums.length > 0) {
      convertAllPrices();
    }
  }, [museums, selectedCurrency]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Kreiranje rezervacije
  const handleReserve = async (museumId, reservationDate, numTickets) => {
    try {
      const token = sessionStorage.getItem('auth_token');
      await axios.post(
        'http://127.0.0.1:8000/api/reservations',
        {
          museum_id: museumId,
          reservation_date: reservationDate,
          num_tickets: numTickets,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Rezervacija je uspešno kreirana!');
    } catch (error) {
      console.error('Greška prilikom kreiranja rezervacije:', error);
      alert('Došlo je do greške prilikom kreiranja rezervacije.');
    }
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
    const priceA = convertedPrices[a.id] || a.ticket_price; // Koristi konvertovanu cenu ako je dostupna
    const priceB = convertedPrices[b.id] || b.ticket_price;
    return priceA - priceB;
  }
  return 0;
});


  // Prikazivanje muzeja
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

      {/* Izbor valute */}
      <div className="currency-selector">
        <label>Izaberite valutu: </label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="museum-list-container">
        {sortedMuseums.length > 0 ? (
          sortedMuseums.map((museum) => (
            <MuseumCard
              key={museum.id}
              museum={{
                ...museum,
                ticket_price: convertedPrices[museum.id] || museum.ticket_price, // Konvertujemo cenu u odabranu valutu
              }}
              onReserve={handleReserve}
              selectedCurrency={selectedCurrency}   
            />
          ))
        ) : (
          <p>Nema dostupnih muzeja.</p>
        )}
      </div>
    </>
  );
};

export default MuseumList;
