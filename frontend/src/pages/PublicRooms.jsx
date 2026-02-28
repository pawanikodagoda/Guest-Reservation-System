import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { Bed, Wifi, Coffee, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const PublicRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    api.get('/rooms/available')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleReserve = (roomId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/add-reservation');
    }
  };

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-2">Experience Elegance</h1>
        <p className="text-muted lead">
          Explore our handpicked selection of premium suites, where coastal serenity meets modern luxury.
        </p>
      </div>

      <Row className="g-4">
        {rooms.map(room => (
          <Col key={room.id} lg={4} md={6}>
            <div className="glass-card h-100 p-0 overflow-hidden" style={{ cursor: 'pointer' }}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: '180px',
                  background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.1), rgba(59, 130, 246, 0.1))',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <Bed size={64} style={{ color: 'var(--primary)', opacity: 0.6 }} />
              </div>
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="fw-bold mb-0">Suite {room.roomNumber}</h5>
                    <span className="text-muted small">{room.roomType}</span>
                  </div>
                  <Badge className={room.status === 'AVAILABLE' ? 'badge-success' : 'badge-primary'}>
                    {room.status}
                  </Badge>
                </div>

                <div className="d-flex align-items-center gap-2 mb-4" style={{ marginTop: '12px' }}>
                  <span className="h4 mb-0 fw-bold text-primary">Rs. {room.pricePerNight.toLocaleString()}</span>
                  <span className="text-muted small">/ night</span>
                </div>

                <p className="text-muted small mb-4">
                  Complimentary high-speed Wi-Fi, premium linens, and a private balcony with stunning ocean views.
                </p>

                <div className="d-flex gap-3 mb-4">
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Wifi size={14} /> Wi-Fi
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Coffee size={14} /> Breakfast
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Eye size={14} /> Ocean View
                  </div>
                </div>

                <button
                  onClick={() => handleReserve(room.id)}
                  className="btn btn-primary w-100 py-2 fw-bold"
                  style={{ borderRadius: '12px' }}
                >
                  Reserve Now →
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {rooms.length === 0 && (
        <div className="text-center py-5">
          <Bed size={48} className="text-muted mb-3" />
          <p className="text-muted">No available suites at the moment. Please check back soon.</p>
        </div>
      )}
    </Container>
  );
};

export default PublicRooms;
