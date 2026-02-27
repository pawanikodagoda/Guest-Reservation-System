import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { username, password });
      const userData = response.data;
      login(userData);

      if (userData.role === 'ROLE_ADMIN') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'ROLE_STAFF') {
        navigate('/staff-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card p-5" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-5">
          <h2 className="mb-2">Welcome Back</h2>
          <p className="text-muted">Sign in to manage your resort</p>
        </div>

        {error && <Alert variant="danger" className="bg-danger text-white border-0">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="text-muted small fw-bold text-uppercase">Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control-lg"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label className="text-muted small fw-bold text-uppercase">Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-3 btn-lg shadow-lg" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="small text-muted mb-2">Ocean View Resort Management System</p>
          <p className="small text-muted mb-0">
            Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-bold">Sign Up</Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
