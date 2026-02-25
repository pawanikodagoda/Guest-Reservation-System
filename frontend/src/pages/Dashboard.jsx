import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import api from '../services/api';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const roomRes = await api.get('/rooms');
      const resRes = await api.get('/reservations');
      setRooms(roomRes.data);
      setReservations(resRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const availableCount = rooms.filter(r => r.status === 'AVAILABLE').length;

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <Card.Title>Total Rooms</Card.Title>
              <h3>{rooms.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <Card.Title>Available Rooms</Card.Title>
              <h3>{availableCount}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <Card.Title>Total Reservations</Card.Title>
              <h3>{reservations.length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3>Recent Reservations</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.slice(0, 5).map(res => (
            <tr key={res.id}>
              <td>{res.guest.firstName} {res.guest.lastName}</td>
              <td>{res.room.roomNumber}</td>
              <td>{res.checkInDate}</td>
              <td>{res.checkOutDate}</td>
              <td><Badge bg={res.status === 'CONFIRMED' ? 'success' : 'secondary'}>{res.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
