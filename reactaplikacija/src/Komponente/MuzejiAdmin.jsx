import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MuzejiAdmin.css'; // Uvoz CSS stilova

const MuzejiAdmin = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Stanje za modal
  const [newMuseum, setNewMuseum] = useState({
    name: '',
    description: '',
    type: '',
    location: '',
    ticket_price: '',
    image_url: '',
  });
  const [editingMuseumId, setEditingMuseumId] = useState(null);

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

        setMuseums(museums.map((museum) => (museum.id === editingMuseumId ? { ...museum, ...newMuseum } : museum)));
      } else {
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

        setMuseums([...museums, response.data]);
      }

      setNewMuseum({
        name: '',
        description: '',
        type: '',
        location: '',
        ticket_price: '',
        image_url: '',
      });
      setEditingMuseumId(null);
      setIsModalOpen(false); // Zatvaramo modal
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
    setIsModalOpen(true); // Otvaramo modal
  };

  const openModal = () => {
    setNewMuseum({
      name: '',
      description: '',
      type: '',
      location: '',
      ticket_price: '',
      image_url: '',
    });
    setEditingMuseumId(null);
    setIsModalOpen(true); // Otvaramo modal za kreiranje
  };

  const closeModal = () => {
    setIsModalOpen(false); // Zatvaramo modal
  };

  if (loading) {
    return <p>Učitavanje muzeja...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="muzeji-admin">
      <h1>Spisak muzeja</h1>

      <button onClick={openModal} className="add-museum-button">Dodaj novi muzej</button>

      {/* Modal za kreiranje ili ažuriranje muzeja */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <form className="muzeji-admin-form" onSubmit={createOrUpdateMuseum}>
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
              <button type="submit" className="submit-button">
                {editingMuseumId ? 'Ažuriraj muzej' : 'Dodaj muzej'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabela sa spiskom muzeja */}
      <table className="muzeji-admin-table">
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
                <button onClick={() => handleEdit(museum)} className="edit-button">Izmeni</button>
                <button onClick={() => deleteMuseum(museum.id)} className="delete-button">Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MuzejiAdmin;
