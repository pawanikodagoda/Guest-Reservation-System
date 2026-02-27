import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Calendar, Home, ArrowLeft, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const AddReservation = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    roomId: '', checkInDate: '', checkOutDate: ''
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rooms/available').then(res => setRooms(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const guestRes = await api.post('/guests', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });

      await api.post('/reservations', {
        guest: { id: guestRes.data.id },
        room: { id: formData.roomId },
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate
      });

      navigate('/reservations');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-4 mb-5">
        <button onClick={() => navigate(-1)} className="btn btn-outline-light rounded-circle p-3 glass-card">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="display-4 fw-bold mb-1">New Booking</h1>
          <p className="text-muted lead mb-0">Secure a premium suite for your guest</p>
        </div>
      </div>

      <div className="glass-card p-5 mx-auto" style={{ maxWidth: '1000px' }}>
        <Form onSubmit={handleSubmit}>
          <div className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="p-2 rounded-3" style={{ background: 'rgba(45, 212, 191, 0.1)' }}>
                <UserPlus size={24} className="text-primary" />
              </div>
              <h4 className="mb-0 fw-bold">Guest Particulars</h4>
            </div>
            <Row className="g-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Legal First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    className="form-control-lg"
                    placeholder="e.g. Alexander"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Legal Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    className="form-control-lg"
                    placeholder="e.g. Hamilton"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Digital Address (Email)</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="form-control-lg"
                    placeholder="guest@domain.com"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Primary Contact Number</Form.Label>
                  <Form.Control
                    name="phone"
                    className="form-control-lg"
                    placeholder="+1 (555) 000-0000"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Residential Address</Form.Label>
                  <Form.Control
                    name="address"
                    as="textarea"
                    rows={2}
                    className="form-control-lg"
                    placeholder="Full street address..."
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="p-2 rounded-3" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Home size={24} className="text-primary" style={{ color: '#3B82F6' }} />
              </div>
              <h4 className="mb-0 fw-bold">Suite & Analytics</h4>
            </div>
            <Row className="g-4">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Available Inventory</Form.Label>
                  <Form.Select
                    name="roomId"
                    className="form-control-lg"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an available suite...</option>
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        Suite {r.roomNumber} — {r.roomType.charAt(0) + r.roomType.slice(1).toLowerCase()} (${r.pricePerNight}/night)
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Arrival Date (Check-in)</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkInDate"
                    className="form-control-lg"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Departure Date (Check-out)</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkOutDate"
                    className="form-control-lg"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-3 btn-lg fw-bold d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <>
                  <CheckCircle2 size={20} /> Finalize Intelligence Booking
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddReservation;
