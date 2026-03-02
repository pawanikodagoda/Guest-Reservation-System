import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FileText,
  Trash2,
  Plus,
  Search,
  Hash,
  User,
  Bed,
  Calendar,
  DollarSign,
  Filter
} from 'lucide-react';
import api from '../services/api';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = '') => {
    if (query) setSearching(true);
    else setLoading(true);

    try {
      const endpoint = query ? `/reservations/search?query=${query}` : '/reservations';
      const res = await api.get(endpoint);
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchQuery);
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await api.delete(`/reservations/${id}`);
        fetchData(searchQuery);
      } catch (err) {
        console.error('Failed to cancel reservation');
      }
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-4 fw-bold mb-1">Reservation Matrix</h1>
          <p className="text-muted lead mb-0">Central repository of all operational guest data</p>
        </div>
        <Button as={Link} to="/add-reservation" className="btn-primary d-flex align-items-center gap-2">
          <Plus size={20} /> New Guest Booking
        </Button>
      </div>

      <div className="glass-card p-4 mb-4">
        <form onSubmit={handleSearch} className="d-flex gap-3">
          <div className="position-relative flex-grow-1">
            <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
            <input
              type="text"
              className="form-control form-control-lg ps-5 border-0"
              placeholder="Search by guest name (e.g. John Doe)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: '12px' }}
            />
          </div>
          <Button type="submit" variant="primary" disabled={searching} className="px-4 rounded-3 d-flex align-items-center gap-2">
            {searching ? <Spinner animation="border" size="sm" /> : <Filter size={18} />}
            Search bookings
          </Button>
          {searchQuery && (
            <Button variant="outline-light" onClick={() => { setSearchQuery(''); fetchData(''); }} className="px-4 rounded-3">
              Clear
            </Button>
          )}
        </form>
      </div>

      <div className="glass-card p-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2 rounded-3" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <Search size={22} className="text-primary" style={{ color: '#3B82F6' }} />
            </div>
            <h3 className="h4 mb-0">Active Dossiers</h3>
          </div>
          <Badge bg="primary" className="badge-primary">Total: {reservations.length}</Badge>
        </div>

        <div className="table-responsive table-container">
          <Table className="mb-0">
            <thead>
              <tr>
                <th><Hash size={14} className="me-1" /> Res. ID</th>
                <th><User size={14} className="me-1" /> Guest Profile</th>
                <th><Bed size={14} className="me-1" /> Allocation</th>
                <th><Calendar size={14} className="me-1" /> Duration</th>
                <th><DollarSign size={14} className="me-1" /> Revenue</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(res => (
                <tr key={res.id} style={{ background: 'rgba(30, 58, 138, 0.3)', color: '#F8FAFC' }}>
                  <td style={{ color: '#F8FAFC', fontWeight: '600' }}>#{res.id.toString().padStart(4, '0')}</td>
                  <td>
                    <div className="fw-bold text-white">{res.guest.firstName} {res.guest.lastName}</div>
                    <div className="small text-muted">{res.guest.email}</div>
                  </td>
                  <td>
                    <div className="text-white fw-medium">Suite {res.room.roomNumber}</div>
                    <div className="small text-muted">{res.room.roomType.charAt(0) + res.room.roomType.slice(1).toLowerCase()}</div>
                  </td>
                  <td>
                    <div className="text-white">{new Date(res.checkInDate).toLocaleDateString()}</div>
                    <div className="small text-muted">to {new Date(res.checkOutDate).toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div className="text-white fw-bold">${res.totalPrice}</div>
                  </td>
                  <td>
                    <Badge className={res.status === 'CONFIRMED' ? 'badge-success' : 'badge-primary'}>
                      {res.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button
                        as={Link}
                        to={`/billing/${res.id}`}
                        variant="link"
                        className="p-2 glass-card text-decoration-none"
                        title="View Invoice"
                      >
                        <FileText size={18} className="text-primary" />
                      </Button>
                      {res.status !== 'CANCELLED' && (
                        <Button
                          onClick={() => handleCancel(res.id)}
                          variant="link"
                          className="p-2 glass-card text-decoration-none"
                          title="Cancel Booking"
                        >
                          <Trash2 size={18} className="text-accent" style={{ color: 'var(--accent)' }} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="mb-3 text-muted">No reservation dossiers currently on file.</div>
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

export default ReservationList;
