import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PorukeAdmin.css';

const PorukeAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
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
    } catch (error) {
      setError('Greška prilikom brisanja poruke.');
    }
  };

  if (loading) {
    return <p>Učitavanje poruka...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="poruke-admin">
      <h1>Spisak korisničkih poruka</h1>

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
          {messages.map((message) => (
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
    </div>
  );
};

export default PorukeAdmin;
