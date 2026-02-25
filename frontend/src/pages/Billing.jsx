import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Billing = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    api.get(`/reservations/${id}`).then(res => setReservation(res.data));
  }, [id]);

  if (!reservation) return <div>Loading...</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="p-4 shadow">
      <div className="d-flex justify-content-between">
        <h2>INVOICE</h2>
        <Button onClick={handlePrint}>Print Bill</Button>
      </div>
      <hr />
      <Row className="mb-4">
        <Col>
          <h5>Customer:</h5>
          <p>{reservation.guest.firstName} {reservation.guest.lastName}<br />
            {reservation.guest.email}<br />
            {reservation.guest.phone}</p>
        </Col>
        <Col className="text-end">
          <h5>Reservation Details:</h5>
          <p>Res ID: #{reservation.id}<br />
            Date: {new Date().toLocaleDateString()}</p>
        </Col>
      </Row>
      <Table bordered>
        <thead>
          <tr>
            <th>Description</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Price/Night</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Room {reservation.room.roomNumber} ({reservation.room.roomType})</td>
            <td>{reservation.checkInDate}</td>
            <td>{reservation.checkOutDate}</td>
            <td>${reservation.room.pricePerNight}</td>
            <td>${reservation.totalPrice}</td>
          </tr>
        </tbody>
      </Table>
      <div className="text-end mt-4">
        <h4>Total Amount Due: ${reservation.totalPrice}</h4>
      </div>
      <div className="mt-5 text-center text-muted">
        <p>Thank you for staying at Ocean View Resort!</p>
      </div>
    </Card>
  );
};

// Simple Row/Col if not imported
const Row = ({ children, className }) => <div className={`row ${className}`}>{children}</div>;
const Col = ({ children, className }) => <div className={`col ${className}`}>{children}</div>;

export default Billing;
