import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Badge, Container, Spinner, Button } from 'react-bootstrap';
import {
  BarChart3, DoorOpen, CalendarCheck, Users, ArrowUpRight,
  RefreshCw, Bed, PlusCircle, ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isCustomer = user?.role === 'ROLE_USER';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [roomRes, resRes] = await Promise.all([
        api.get('/rooms'),
        api.get('/reservations')   // Backend already filters by role
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

  /* ── CUSTOMER DASHBOARD ─────────────────────────────────── */
  if (isCustomer) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-4 fw-bold mb-1">My Dashboard</h1>
            <p className="text-muted lead mb-0">Welcome back, {user.username}! Here are your reservations.</p>
          </div>
          <button onClick={fetchData} className="btn btn-outline-light rounded-circle p-3 glass-card">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Customer Stats */}
        <Row className="mb-5 g-4">
          <Col lg={6} md={6}>
            <div className="glass-card stat-card">
              <div className="stat-icon" style={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2DD4BF' }}>
                <CalendarCheck size={28} />
              </div>
              <p className="text-muted small fw-bold text-uppercase mb-1">My Reservations</p>
              <h2 className="display-4 mb-2" style={{ color: '#2DD4BF' }}>{reservations.length}</h2>
              <div className="d-flex align-items-center gap-2">
                <Badge className="badge-success">Active</Badge>
                <span className="small text-muted">Bookings on file</span>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6}>
            <div className="glass-card stat-card">
              <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                <Bed size={28} />
              </div>
              <p className="text-muted small fw-bold text-uppercase mb-1">Available Rooms</p>
              <h2 className="display-4 mb-2" style={{ color: '#3B82F6' }}>{availableRooms}</h2>
              <div className="d-flex align-items-center gap-2">
                <Badge className="badge-primary">Live</Badge>
                <span className="small text-muted">Ready to book</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mb-5 g-4">
          <Col md={6}>
            <Link to="/rooms" className="text-decoration-none">
              <div className="glass-card p-4 d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
                <div className="stat-icon mb-0" style={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2DD4BF' }}>
                  <Bed size={24} />
                </div>
                <div>
                  <h5 className="mb-1">Browse Available Rooms</h5>
                  <p className="text-muted small mb-0">View all suites and pricing</p>
                </div>
                <ArrowUpRight size={20} className="ms-auto text-muted" />
              </div>
            </Link>
          </Col>
          <Col md={6}>
            <Link to="/add-reservation" className="text-decoration-none">
              <div className="glass-card p-4 d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
                <div className="stat-icon mb-0" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                  <PlusCircle size={24} />
                </div>
                <div>
                  <h5 className="mb-1">Make a New Booking</h5>
                  <p className="text-muted small mb-0">Reserve a suite online</p>
                </div>
                <ArrowUpRight size={20} className="ms-auto text-muted" />
              </div>
            </Link>
          </Col>
        </Row>

        {/* My Bookings Table */}
        <div className="glass-card p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="p-2 rounded-3" style={{ background: 'rgba(165, 180, 252, 0.1)' }}>
                <ClipboardList size={24} className="text-primary" />
              </div>
              <h3 className="h4 mb-0">My Reservations</h3>
            </div>
          </div>
          <div className="table-responsive table-container">
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Total (Rs.)</th>
                  <th className="text-end">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res.id} style={{ background: 'rgba(30, 58, 138, 0.3)', color: '#F8FAFC' }}>
                    <td style={{ color: '#F8FAFC', fontWeight: '600' }}>
                      Suite {res.room?.roomNumber} — {res.room?.roomType}
                    </td>
                    <td style={{ color: '#F8FAFC' }}>{new Date(res.checkInDate).toLocaleDateString()}</td>
                    <td style={{ color: '#F8FAFC' }}>{new Date(res.checkOutDate).toLocaleDateString()}</td>
                    <td style={{ color: '#2DD4BF', fontWeight: '600' }}>Rs. {res.totalPrice?.toLocaleString()}</td>
                    <td className="text-end">
                      <Badge className={res.status === 'CONFIRMED' ? 'badge-success' : 'badge-primary'}>
                        {res.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      You have no bookings yet. <Link to="/rooms" className="text-primary">Browse our rooms</Link> to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    );
  }

  /* ── STAFF / ADMIN DASHBOARD ────────────────────────────── */
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-4 fw-bold mb-1">Resort Dashboard</h1>
          <p className="text-muted lead mb-0">Unified view of your resort's operational performance</p>
        </div>
        <button onClick={fetchData} className="btn btn-outline-light rounded-circle p-3 glass-card">
          <RefreshCw size={20} />
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
          <Link to="/reservations" className="btn btn-sm btn-link text-primary text-decoration-none fw-bold d-flex align-items-center gap-2">
            View All <ArrowUpRight size={16} />
          </Link>
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
                <tr key={res.id} style={{ background: 'rgba(30, 58, 138, 0.3)', color: '#F8FAFC' }}>
                  <td style={{ color: '#F8FAFC', fontWeight: 'bold' }}>#{res.id?.toString().padStart(4, '0')}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 rounded-circle bg-dark text-primary small fw-bold" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {res.guest?.firstName?.[0]}{res.guest?.lastName?.[0]}
                      </div>
                      <div>
                        <div style={{ color: '#F8FAFC', fontWeight: '600' }}>{res.guest?.firstName} {res.guest?.lastName}</div>
                        <div className="small text-muted">{res.guest?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: '#F8FAFC' }}>Room {res.room?.roomNumber}</div>
                    <div className="small text-muted">{res.room?.roomType?.charAt(0) + res.room?.roomType?.slice(1)?.toLowerCase()}</div>
                  </td>
                  <td>
                    <div style={{ color: '#F8FAFC' }}>{new Date(res.checkInDate).toLocaleDateString()}</div>
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
                  <td colSpan="5" className="text-center py-5 text-muted">No reservation data found.</td>
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
