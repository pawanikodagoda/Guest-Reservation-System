import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', { username, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (!err.response) {
        setError('Cannot connect to the server. Please ensure the backend is running.');
      } else {
        setError(err.response.data?.message || 'Failed to register. Username might be taken.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card p-5" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-5">
          <h2 className="mb-2">Create Account</h2>
          <p className="text-muted">Join the Ocean View staff portal</p>
        </div>

        {error && <Alert variant="danger" className="bg-danger text-white border-0">{error}</Alert>}
        {success && <Alert variant="success" className="bg-success text-white border-0">Account created successfully! Redirecting to login...</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="text-muted small fw-bold text-uppercase">Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control-lg"
              placeholder="Pick a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
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

          <Form.Group className="mb-5">
            <Form.Label className="text-muted small fw-bold text-uppercase">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control-lg"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 py-3 btn-lg shadow-lg" disabled={loading || success}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Sign In</Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
