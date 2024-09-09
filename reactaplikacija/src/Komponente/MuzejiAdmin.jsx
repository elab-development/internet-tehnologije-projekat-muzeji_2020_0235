import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MuzejiAdmin = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <p>Učitavanje muzeja...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Spisak muzeja</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Tip</th>
            <th>Lokacija</th>
            <th>Cena karte</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {museums.map((museum) => (
            <tr key={museum.id}>
              <td>{museum.id}</td>
              <td>{museum.name}</td>
              <td>{museum.description}</td>
              <td>{museum.type}</td>
              <td>{museum.location}</td>
              <td>{museum.ticket_price}</td>
              <td>
                <button>Izmeni</button>
                <button>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MuzejiAdmin;
