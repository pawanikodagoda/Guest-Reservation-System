import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Badge, Modal } from 'react-bootstrap';
import { Plus, Edit3, Trash2, Home, DollarSign, Tag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'SINGLE',
    pricePerNight: '',
    status: 'AVAILABLE'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await api.put(`/rooms/${editingRoom.id}`, formData);
      } else {
        await api.post('/rooms', formData);
      }
      setShowModal(false);
      setEditingRoom(null);
      setFormData({ roomNumber: '', roomType: 'SINGLE', pricePerNight: '', status: 'AVAILABLE' });
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      status: room.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to decommission this room?')) {
      try {
        await api.delete(`/rooms/${id}`);
        fetchRooms();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-4 mb-5">
        <button onClick={() => navigate('/admin-dashboard')} className="btn btn-outline-light rounded-circle p-3 glass-card">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="display-4 fw-bold mb-1">Inventory Control</h1>
          <p className="text-muted lead mb-0">Manage resort suites, pricing, and availability</p>
        </div>
        <Button
          variant="primary"
          className="ms-auto d-flex align-items-center gap-2 px-4 py-2"
          onClick={() => {
            setEditingRoom(null);
            setFormData({ roomNumber: '', roomType: 'SINGLE', pricePerNight: '', status: 'AVAILABLE' });
            setShowModal(true);
          }}
        >
          <Plus size={20} /> Add New Suite
        </Button>
      </div>

      <div className="glass-card p-5">
        <div className="table-responsive table-container">
          <Table className="mb-0">
            <thead>
              <tr>
                <th>Suite #</th>
                <th>Classification</th>
                <th>Base Rate</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td className="text-white fw-bold">#{room.roomNumber}</td>
                  <td className="text-white">{room.roomType}</td>
                  <td className="text-white fw-medium">Rs. {room.pricePerNight}</td>
                  <td>
                    <Badge className={room.status === 'AVAILABLE' ? 'badge-success' : 'badge-primary'}>
                      {room.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button variant="link" className="p-2 glass-card" onClick={() => handleEdit(room)}>
                        <Edit3 size={18} className="text-primary" />
                      </Button>
                      <Button variant="link" className="p-2 glass-card" onClick={() => handleDelete(room.id)}>
                        <Trash2 size={18} className="text-accent" style={{ color: 'var(--accent)' }} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-card border-0">
        <Modal.Header closeButton className="border-0 pb-0" closeVariant="white">
          <Modal.Title className="fw-bold">{editingRoom ? 'Update Suite' : 'Provision New Suite'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Suite Number</Form.Label>
                  <Form.Control
                    name="roomNumber"
                    className="form-control-lg"
                    placeholder="e.g. 104"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Classification</Form.Label>
                  <Form.Select
                    name="roomType"
                    className="form-control-lg"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                  >
                    <option value="SINGLE">Single</option>
                    <option value="DOUBLE">Double</option>
                    <option value="SUITE">Suite</option>
                    <option value="DELUXE">Deluxe</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Rate / Night</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    className="form-control-lg"
                    placeholder="15000.00"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold text-uppercase">Operational Status</Form.Label>
                  <Form.Select
                    name="status"
                    className="form-control-lg"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="OCCUPIED">Occupied</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-4">
            <Button variant="link" className="text-white text-decoration-none me-auto" onClick={() => setShowModal(false)}>
              Discard
            </Button>
            <Button variant="primary" type="submit" className="px-4 py-2 d-flex align-items-center gap-2">
              {editingRoom ? 'Commit Changes' : 'Initialize Suite'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ManageRooms;
