import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddReservation = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    roomId: '', checkInDate: '', checkOutDate: ''
  });
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rooms/available').then(res => setRooms(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Create Guest first
      const guestRes = await api.post('/guests', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });

      // 2. Create Reservation
      await api.post('/reservations', {
        guest: { id: guestRes.data.id },
        room: { id: formData.roomId },
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate
      });

      navigate('/reservations');
    } catch (err) {
      alert('Failed to book reservation: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="mb-4">New Reservation</h2>
        <Form onSubmit={handleSubmit}>
          <h4>Guest Information</h4>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" onChange={handleChange} required />
          </Form.Group>

          <h4 className="mt-4">Stay Information</h4>
          <Form.Group className="mb-3">
            <Form.Label>Select Room</Form.Label>
            <Form.Select name="roomId" onChange={handleChange} required>
              <option value="">Choose...</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>Room {r.roomNumber} - {r.roomType} (${r.pricePerNight}/night)</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Check-in Date</Form.Label>
                <Form.Control type="date" name="checkInDate" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Check-out Date</Form.Label>
                <Form.Control type="date" name="checkOutDate" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit" className="mt-3">Confirm Booking</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddReservation;
