import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MuzejiAdmin = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMuseum, setNewMuseum] = useState({
    name: '',
    description: '',
    type: '',
    location: '',
    ticket_price: '',
    image_url: '',
  });
  const [editingMuseumId, setEditingMuseumId] = useState(null); // Dodajemo stanje za ID muzeja koji se uređuje

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

  const deleteMuseum = async (id) => {
    const confirmDelete = window.confirm('Da li ste sigurni da želite da obrišete ovaj muzej?');
    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem('auth_token');
      await axios.delete(`http://127.0.0.1:8000/api/museums/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMuseums(museums.filter((museum) => museum.id !== id));
    } catch (error) {
      setError('Greška prilikom brisanja muzeja.');
    }
  };

  const createOrUpdateMuseum = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token');

    try {
      if (editingMuseumId) {
        // Ažuriramo postojeći muzej
        await axios.put(
          `http://127.0.0.1:8000/api/museums/${editingMuseumId}`,
          {
            name: newMuseum.name,
            description: newMuseum.description,
            type: newMuseum.type,
            location: newMuseum.location,
            ticket_price: newMuseum.ticket_price,
            image_url: newMuseum.image_url,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Ažuriramo listu muzeja nakon izmena
        setMuseums(museums.map((museum) => (museum.id === editingMuseumId ? { ...museum, ...newMuseum } : museum)));
      } else {
        // Kreiramo novi muzej
        const response = await axios.post(
          'http://127.0.0.1:8000/api/museums',
          {
            name: newMuseum.name,
            description: newMuseum.description,
            type: newMuseum.type,
            location: newMuseum.location,
            ticket_price: newMuseum.ticket_price,
            image_url: newMuseum.image_url,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Dodajemo novi muzej u listu
        setMuseums([...museums, response.data]);
      }

      // Resetujemo formu i editovanje
      setNewMuseum({
        name: '',
        description: '',
        type: '',
        location: '',
        ticket_price: '',
        image_url: '',
      });
      setEditingMuseumId(null);
    } catch (error) {
      setError('Greška prilikom kreiranja ili ažuriranja muzeja.');
    }
  };

  const handleInputChange = (e) => {
    setNewMuseum({ ...newMuseum, [e.target.name]: e.target.value });
  };

  const handleEdit = (museum) => {
    setNewMuseum({
      name: museum.name,
      description: museum.description,
      type: museum.type,
      location: museum.location,
      ticket_price: museum.ticket_price,
      image_url: museum.image_url,
    });
    setEditingMuseumId(museum.id);
  };

  if (loading) {
    return <p>Učitavanje muzeja...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Spisak muzeja</h1>

      {/* Forma za kreiranje ili ažuriranje muzeja */}
      <form onSubmit={createOrUpdateMuseum}>
        <h2>{editingMuseumId ? 'Izmeni muzej' : 'Kreiraj novi muzej'}</h2>
        <div>
          <label>Naziv:</label>
          <input
            type="text"
            name="name"
            value={newMuseum.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Opis:</label>
          <textarea
            name="description"
            value={newMuseum.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Tip:</label>
          <select name="type" value={newMuseum.type} onChange={handleInputChange} required>
            <option value="">Izaberi tip</option>
            <option value="umetnost">Umetnost</option>
            <option value="istorijski">Istorijski</option>
            <option value="naučni">Naučni</option>
            <option value="savremeni">Savremeni</option>
            <option value="vojni">Vojni</option>
          </select>
        </div>
        <div>
          <label>Lokacija:</label>
          <input
            type="text"
            name="location"
            value={newMuseum.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cena karte:</label>
          <input
            type="number"
            name="ticket_price"
            value={newMuseum.ticket_price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>URL slike:</label>
          <input
            type="url"
            name="image_url"
            value={newMuseum.image_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingMuseumId ? 'Ažuriraj muzej' : 'Dodaj muzej'}</button>
      </form>

      {/* Tabela sa spiskom muzeja */}
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
                <button onClick={() => handleEdit(museum)}>Izmeni</button>
                <button onClick={() => deleteMuseum(museum.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MuzejiAdmin;
