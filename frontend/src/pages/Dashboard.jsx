import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Badge, Container, Spinner } from 'react-bootstrap';
import {
  BarChart3,
  DoorOpen,
  CalendarCheck,
  Users,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [roomRes, resRes] = await Promise.all([
        api.get('/rooms'),
        api.get('/reservations')
      ]);
      setRooms(roomRes.data);
      setReservations(resRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const availableRooms = rooms.filter(r => r.status === 'AVAILABLE').length;
  const occupiedRooms = rooms.filter(r => r.status === 'OCCUPIED').length;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-4 fw-bold mb-1">Intelligence Dashboard</h1>
          <p className="text-muted lead mb-0">Unified view of your resort's operational performance</p>
        </div>
        <button onClick={fetchData} className="btn btn-outline-light rounded-circle p-3 glass-card">
          <RefreshCw size={20} className={loading ? 'spin' : ''} />
        </button>
      </div>

      <Row className="mb-5 g-4">
        <Col lg={4} md={6}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2DD4BF' }}>
              <DoorOpen size={28} />
            </div>
            <p className="text-muted small fw-bold text-uppercase mb-1">Available Inventory</p>
            <h2 className="display-4 mb-2" style={{ color: '#2DD4BF' }}>{availableRooms}</h2>
            <div className="d-flex align-items-center gap-2">
              <Badge className="badge-success">Live</Badge>
              <span className="small text-muted">/{rooms.length} Total Units</span>
            </div>
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
              <CalendarCheck size={28} />
            </div>
            <p className="text-muted small fw-bold text-uppercase mb-1">Current Occupancy</p>
            <h2 className="display-4 mb-2" style={{ color: '#3B82F6' }}>{occupiedRooms}</h2>
            <div className="d-flex align-items-center gap-2">
              <Badge className="badge-primary">Active</Badge>
              <span className="small text-muted">Checked-in Guests</span>
            </div>
          </div>
        </Col>
        <Col lg={4} md={12}>
          <div className="glass-card stat-card">
            <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#F43F5E' }}>
              <Users size={28} />
            </div>
            <p className="text-muted small fw-bold text-uppercase mb-1">Total Reservations</p>
            <h2 className="display-4 mb-2" style={{ color: '#F43F5E' }}>{reservations.length}</h2>
            <div className="d-flex align-items-center gap-2">
              <Badge className="badge-warning">Cumulative</Badge>
              <span className="small text-muted">Historical Data</span>
            </div>
          </div>
        </Col>
      </Row>

      <div className="glass-card p-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2 rounded-3" style={{ background: 'rgba(165, 180, 252, 0.1)' }}>
              <BarChart3 size={24} className="text-primary" />
            </div>
            <h3 className="h4 mb-0">Guest Activity Timeline</h3>
          </div>
          <button className="btn btn-sm btn-link text-primary text-decoration-none fw-bold d-flex align-items-center gap-2">
            View Analytics <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="table-responsive table-container">
          <Table className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Room Detail</th>
                <th>Timeline</th>
                <th className="text-end">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.slice(0, 5).map(res => (
                <tr key={res.id}>
                  <td className="text-white fw-bold">#{res.id.toString().padStart(4, '0')}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 rounded-circle bg-dark text-primary small fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                        {res.guest.firstName[0]}{res.guest.lastName[0]}
                      </div>
                      <div>
                        <div className="fw-bold text-white">{res.guest.firstName} {res.guest.lastName}</div>
                        <div className="small text-muted">{res.guest.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-white fw-medium">Room {res.room.roomNumber}</div>
                    <div className="small text-muted">{res.room.roomType.charAt(0) + res.room.roomType.slice(1).toLowerCase()}</div>
                  </td>
                  <td>
                    <div className="text-white">{new Date(res.checkInDate).toLocaleDateString()}</div>
                    <div className="small text-muted">until {new Date(res.checkOutDate).toLocaleDateString()}</div>
                  </td>
                  <td className="text-end">
                    <Badge className={res.status === 'CONFIRMED' ? 'badge-success' : 'badge-primary'}>
                      {res.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <div className="mb-3 text-muted">No operational data found for this period.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
