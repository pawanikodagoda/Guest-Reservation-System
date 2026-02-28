import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Waves, ArrowRight, Bed } from 'lucide-react';
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
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-dark)', overflow: 'hidden', margin: '-24px -12px 0' }}>

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px 56px',
          overflow: 'hidden',
          minHeight: '100vh',
        }}
      >
        {/* Hero background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/resort_hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.4) 50%, rgba(2,6,23,0.1) 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Logo */}
          <div className="d-flex align-items-center gap-2 mb-auto" style={{ position: 'absolute', top: '-400px', left: 0 }}>
            <div style={{ width: '44px', height: '44px', background: 'var(--primary-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Waves size={26} style={{ color: 'var(--primary)' }} />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.04em', color: '#fff' }}>
              <span style={{ color: 'var(--primary)' }}>OCEAN</span>VIEW
            </span>
          </div>

          {/* Headline */}
          <div className="mb-5">
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #2DD4BF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
            }}>
              Escape to<br />Pure Luxury
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', maxWidth: '380px', lineHeight: 1.6 }}>
              Discover our handpicked ocean-front suites. Premium comfort at the heart of paradise.
            </p>
          </div>

          {/* View Rooms CTA */}
          <Link to="/rooms" style={{ textDecoration: 'none' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                border: 'none',
                borderRadius: '14px',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 10px 30px -5px rgba(45, 212, 191, 0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Bed size={20} />
              View Available Rooms
              <ArrowRight size={18} />
            </button>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '12px' }}>
            No account required to browse
          </p>
        </div>
      </div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div
        style={{
          width: '460px',
          minWidth: '380px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 48px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="mb-5">
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.9rem', color: '#fff', marginBottom: '8px' }}>
            Welcome Back
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            Sign in to manage reservations and guest services
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="border-0" style={{ background: 'rgba(244,63,94,0.1)', color: '#F43F5E', borderRadius: '12px' }}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                padding: '14px 16px',
                fontSize: '1rem',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                padding: '14px 16px',
                fontSize: '1rem',
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-100 btn-primary"
            style={{ padding: '15px', fontSize: '1rem', borderRadius: '12px' }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" />
            ) : null}
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '36px', paddingTop: '28px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Don't have an account?
          </p>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                padding: '13px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Create New Account
            </button>
          </Link>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', textAlign: 'center', marginTop: '32px' }}>
          Ocean View Resort © 2026 · Sri Lanka
        </p>
      </div>
    </div>
  );
};

export default Login;
