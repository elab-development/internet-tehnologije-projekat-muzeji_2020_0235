import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PorukeAdmin.css';

const PorukeAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(2); // Broj poruka po stranici
  const [filter, setFilter] = useState(''); // Polje za filtriranje

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
        setFilteredMessages(response.data); // Inicijalno prikazivanje svih poruka
        setLoading(false);
      } catch (error) {
        setError('Greška prilikom učitavanja poruka.');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm('Da li ste sigurni da želite da obrišete ovu poruku?');
    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem('auth_token');
      await axios.delete(`http://127.0.0.1:8000/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(messages.filter((message) => message.id !== id));
      setFilteredMessages(filteredMessages.filter((message) => message.id !== id));
    } catch (error) {
      setError('Greška prilikom brisanja poruke.');
    }
  };

  // Funkcija za promenu stranice
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logika za određivanje trenutne stranice
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Funkcija za filtriranje poruka
  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilter(searchValue);
    setFilteredMessages(
      messages.filter(
        (message) =>
          message.content.toLowerCase().includes(searchValue) ||
          message.user.name.toLowerCase().includes(searchValue)
      )
    );
    setCurrentPage(1); // Vraćamo paginaciju na prvu stranicu nakon filtriranja
  };

  if (loading) {
    return <p>Učitavanje poruka...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Broj stranica
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  return (
    <div className="poruke-admin">
      <h1>Spisak korisničkih poruka</h1>

      {/* Filter za pretragu */}
      <input
        type="text"
        placeholder="Pretraži po sadržaju ili korisniku"
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />

      {/* Tabela sa spiskom poruka */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Korisnik</th>
            <th>Muzej</th>
            <th>Sadržaj poruke</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.user.name}</td>
              <td>{message.museum.name}</td>
              <td>{message.content}</td>
              <td>
                <button onClick={() => deleteMessage(message.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginacija */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PorukeAdmin;
