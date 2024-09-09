import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MojeRezervacije.css';  

const MojeRezervacije = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/reservations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sortiramo rezervacije hronološki unazad (najnovije prvo)
        const sortedReservations = response.data.sort(
          (a, b) => new Date(b.reservation_date) - new Date(a.reservation_date)
        );

        setReservations(sortedReservations);
        setLoading(false);
      } catch (error) {
        setError('Greška prilikom učitavanja rezervacija.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const cancelReservation = async (id) => {
    const confirmDelete = window.confirm('Da li ste sigurni da želite da otkažete ovu rezervaciju?');
    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem('auth_token');
      await axios.delete(`http://127.0.0.1:8000/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } catch (error) {
      setError('Greška prilikom otkazivanja rezervacije.');
    }
  };

  const isCancelable = (reservationDate) => {
    const today = new Date().setHours(0, 0, 0, 0); // Danasnji datum
    const resDate = new Date(reservationDate).setHours(0, 0, 0, 0); // Datum rezervacije
    return resDate >= today; // Provera da li je datum danas ili u budućnosti
  };

  if (loading) {
    return <p>Učitavanje rezervacija...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="moje-rezervacije">
      <h1>Moje rezervacije</h1>

      {reservations.length === 0 ? (
        <p>Nemate rezervacija.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Muzej</th>
              <th>Datum rezervacije</th>
              <th>Broj karata</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              const cancelable = isCancelable(reservation.reservation_date);

              return (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.museum.name}</td>
                  <td>{new Date(reservation.reservation_date).toLocaleDateString()}</td>
                  <td>{reservation.num_tickets}</td>
                  <td>
                    {cancelable ? (
                      <button
                        onClick={() => cancelReservation(reservation.id)}
                        className="delete-button"
                      >
                        Otkaži rezervaciju
                      </button>
                    ) : (
                      <button className="delete-button" disabled>
                        Nije moguće otkazati
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MojeRezervacije;
