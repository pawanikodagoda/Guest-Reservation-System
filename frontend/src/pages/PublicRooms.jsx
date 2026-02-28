import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Bed, DollarSign, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PublicRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rooms/available')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold mb-3">Experience Elegance</h1>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
          Explore our handpicked selection of premium suites, where coastal serenity meets modern luxury.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <Row className="g-4">
          {rooms.map(room => (
            <Col key={room.id} lg={4} md={6}>
              <div className="glass-card h-100 d-flex flex-column">
                <div
                  className="w-100"
                  style={{
                    height: '240px',
                    background: `linear-gradient(135deg, rgba(45, 212, 191, 0.1), rgba(59, 130, 246, 0.1))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Bed size={64} className="text-primary opacity-50" />
                </div>
                <div className="p-4 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 className="h5 mb-1 text-white">Suite {room.roomNumber}</h3>
                      <p className="text-muted small mb-0">{room.roomType}</p>
                    </div>
                    <Badge className="badge-success">Available</Badge>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-4">
                    <span className="h4 mb-0 fw-bold text-primary">Rs. {room.pricePerNight}</span>
                    <span className="text-muted small">/ night</span>
                  </div>

                  <p className="text-muted small mb-0">
                    Complimentary high-speed Wi-Fi, premium linens, and a private balcony with stunning ocean views.
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <Button
                    as={Link}
                    to="/login"
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    Reserve Now <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
          {rooms.length === 0 && (
            <Col xs={12} className="text-center py-5">
              <div className="glass-card p-5">
                <Info size={48} className="text-muted mb-3" />
                <h4>All Suites are Occupied</h4>
                <p className="text-muted">Please check back later for new availability.</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default PublicRooms;
