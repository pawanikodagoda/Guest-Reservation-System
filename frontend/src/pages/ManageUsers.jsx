import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Badge, Modal, Spinner } from 'react-bootstrap';
import { Plus, Trash2, Users, ArrowLeft, Shield, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ROLE_STAFF'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
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
      await api.post('/users', formData);
      setShowModal(false);
      setFormData({ username: '', password: '', role: 'ROLE_STAFF' });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  return (
    <Container className="py-5 text-white">
      <div className="d-flex align-items-center gap-4 mb-5">
        <button onClick={() => navigate('/admin-dashboard')} className="btn btn-outline-light rounded-circle p-3 glass-card text-white">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="display-4 fw-bold mb-1">User Directory</h1>
          <p className="text-muted lead mb-0">Manage system administrators and staff access</p>
        </div>
        <Button
          variant="primary"
          className="ms-auto d-flex align-items-center gap-2 px-4 py-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} /> Add System User
        </Button>
      </div>

      <div className="glass-card p-5">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="table-responsive table-container">
            <Table className="mb-0 text-white">
              <thead>
                <tr>
                  <th><UserIcon size={14} className="me-2" /> Username</th>
                  <th><Shield size={14} className="me-2" /> Role</th>
                  <th>Joined Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="fw-bold">{user.username}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        className="w-auto bg-transparent border-0 text-white fw-bold"
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="ROLE_USER">Customer</option>
                        <option value="ROLE_STAFF">Staff</option>
                        <option value="ROLE_ADMIN">Admin</option>
                      </Form.Select>
                    </td>
                    <td className="text-muted">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-end">
                      <Button
                        variant="link"
                        className="p-2 glass-card text-accent"
                        onClick={() => handleDelete(user.id)}
                        style={{ color: 'var(--accent)' }}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-card border-0 text-white">
        <Modal.Header closeButton className="border-0 pb-0" closeVariant="white">
          <Modal.Title className="fw-bold">Create System User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small fw-bold text-uppercase">Username</Form.Label>
              <Form.Control
                name="username"
                className="form-control-lg"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small fw-bold text-uppercase">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="form-control-lg"
                placeholder="Temporary password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-muted small fw-bold text-uppercase">Initial Role</Form.Label>
              <Form.Select
                name="role"
                className="form-control-lg"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="ROLE_STAFF">Staff Member</option>
                <option value="ROLE_ADMIN">Administrator</option>
                <option value="ROLE_USER">Customer Account</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-4">
            <Button variant="link" className="text-white text-decoration-none me-auto" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="px-4 py-2">
              Initialize Account
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ManageUsers;
