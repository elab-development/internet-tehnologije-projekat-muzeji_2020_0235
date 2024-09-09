import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './MojeRezervacije.css';
import JsBarcode from 'jsbarcode';

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

  const generatePDF = (reservation) => {
    const doc = new jsPDF();

    // Naslov karte
    doc.setFontSize(20);
    doc.text(`Ulaznica za ${reservation.museum.name}`, 20, 20);

    // Detalji muzeja
    doc.setFontSize(12);
    doc.text(`Muzej: ${reservation.museum.name}`, 20, 40);
    doc.text(`Lokacija: ${reservation.museum.location}`, 20, 50);
    doc.text(`Tip: ${reservation.museum.type}`, 20, 60);
    doc.text(`Cena ulaznice: ${reservation.museum.ticket_price} din`, 20, 70);

    // Detalji o rezervaciji
    doc.text(`Datum rezervacije: ${new Date(reservation.reservation_date).toLocaleDateString()}`, 20, 90);
    doc.text(`Broj karata: ${reservation.num_tickets}`, 20, 100);
    doc.text(`Ukupna cena: ${reservation.total_price} din`, 20, 110);

    // Prikaz slike muzeja
    if (reservation.museum.image_url) {
      const img = new Image();
      img.src = reservation.museum.image_url;
      doc.addImage(img, 'JPEG', 150, 40, 40, 40);  // Pozicioniranje i veličina slike
    }

    // Bar kod
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, reservation.id.toString(), {
      format: 'CODE128',
    });
    const barcodeImage = canvas.toDataURL('image/png');
    doc.addImage(barcodeImage, 'PNG', 20, 130, 120, 40);

    // Generišemo PDF
    doc.save(`ulaznica_${reservation.museum.name}.pdf`);
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
              <th>Ukupna cena</th>
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
                  <td>{reservation.total_price} din</td>
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
                    <button
                      onClick={() => generatePDF(reservation)}
                      className="pdf-button"
                    >
                      Generiši ulaznicu (PDF)
                    </button>
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
