import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      setReservations(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await api.delete(`/reservations/${id}`);
        fetchReservations();
      } catch (err) {
        alert('Failed to cancel reservation');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Reservations</h1>
        <Button as={Link} to="/add-reservation" variant="primary">Add Reservation</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(res => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.guest.firstName} {res.guest.lastName}</td>
              <td>{res.room.roomNumber} ({res.room.roomType})</td>
              <td>{res.checkInDate}</td>
              <td>{res.checkOutDate}</td>
              <td>${res.totalPrice}</td>
              <td><Badge bg={res.status === 'CONFIRMED' ? 'success' : 'danger'}>{res.status}</Badge></td>
              <td>
                <Button variant="info" size="sm" as={Link} to={`/billing/${res.id}`} className="me-2 text-white">Bill</Button>
                {res.status !== 'CANCELLED' && (
                  <Button variant="danger" size="sm" onClick={() => handleCancel(res.id)}>Cancel</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReservationList;
