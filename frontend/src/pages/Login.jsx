import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { username, password });
      const userData = response.data;
      login(userData);

      const from = location.state?.from;
      if (from) {
        navigate(from);
      } else if (userData.role === 'ROLE_ADMIN') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'ROLE_STAFF') {
        navigate('/staff-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: 'Inter', sans-serif;
          background: #f0f2f5;
          overflow: hidden;
        }
        /* Left panel: hidden by default on mobile, shown on md+ */
        .login-left-panel {
          display: none;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .login-left-panel {
            display: block;
            flex: 0 0 57%;
          }
        }
        .login-left-panel img.login-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .login-left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(0, 30, 70, 0.72) 0%,
            rgba(0, 80, 130, 0.50) 55%,
            rgba(0, 10, 30, 0.35) 100%
          );
        }
        .login-left-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 56px 52px 72px 52px;
        }
        .login-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
        }
        .login-logo-icon { font-size: 2.2rem; }
        .login-logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: #fff;
          letter-spacing: -0.05em;
        }
        .login-headline {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 2.8rem;
          color: #fff !important;
          background: none !important;
          -webkit-text-fill-color: #fff !important;
          line-height: 1.18;
          margin-bottom: 16px;
          text-shadow: 0 4px 16px rgba(0,0,0,0.5);
          letter-spacing: -0.02em;
        }
        .login-subtext {
          color: rgba(255,255,255,0.85);
          font-size: 1.05rem;
          margin-bottom: 28px;
          letter-spacing: 0.02em;
        }
        .login-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 9px 20px;
          border-radius: 100px;
          font-size: 0.86rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.28);
          width: fit-content;
        }

        /* ── Right panel ── */
        .login-right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: #f0f2f5;
        }
        .login-form-box {
          width: 100%;
          max-width: 400px;
        }
        .login-mobile-title {
          text-align: center;
          margin-bottom: 20px;
          display: block;
        }
        @media (min-width: 768px) {
          .login-mobile-title { display: none; }
        }
        .login-mobile-title h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.9rem;
          color: #050505 !important;
          background: none !important;
          -webkit-text-fill-color: #050505 !important;
        }
        .login-error {
          background: #fff3f3;
          border: 1px solid #f5c6cb;
          color: #721c24;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 14px;
          margin-bottom: 14px;
          border-radius: 8px;
        }
        .login-input {
          width: 100%;
          padding: 14px 16px;
          font-size: 16px;
          border: 1px solid #ccd0d5;
          border-radius: 6px;
          outline: none;
          background: #fff;
          color: #1c1e21;
          margin-bottom: 12px;
          transition: border-color 0.18s, box-shadow 0.18s;
          display: block;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #1877f2;
          box-shadow: 0 0 0 2px rgba(24,119,242,0.18);
        }
        .login-btn {
          width: 100%;
          padding: 14px;
          background: #1877f2;
          border: none;
          border-radius: 6px;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s;
          margin-bottom: 12px;
        }
        .login-btn:hover:not(:disabled) {
          background: #166fe5;
          transform: translateY(-1px);
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-forgot-row {
          text-align: center;
          margin-bottom: 18px;
        }
        .login-forgot-link {
          color: #1877f2;
          font-size: 14px;
          text-decoration: none;
          font-weight: 500;
        }
        .login-forgot-link:hover { text-decoration: underline; }
        .login-divider {
          border: none;
          border-top: 1px solid #dadde1;
          margin: 18px 0;
        }
        .login-create-btn {
          display: block;
          text-align: center;
          padding: 13px 24px;
          background: #42b72a;
          color: #fff;
          border-radius: 6px;
          font-size: 17px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.18s, transform 0.1s;
          margin-bottom: 0;
        }
        .login-create-btn:hover {
          background: #36a420;
          color: #fff;
          transform: translateY(-1px);
        }
        .login-rooms-card {
          text-align: center;
          margin-top: 18px;
          padding: 14px 18px;
          background: #fff;
          border-radius: 8px;
          border: 1px solid #dddfe2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .login-rooms-link {
          color: #1877f2;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          display: block;
          margin-bottom: 4px;
          transition: color 0.15s;
        }
        .login-rooms-link:hover { color: #166fe5; text-decoration: underline; }
        .login-rooms-note {
          color: #65676b;
          font-size: 12px;
          margin: 0;
        }
      `}</style>

      <div className="login-page-wrapper">

        {/* ── LEFT: Beach Hotel Image ── */}
        <div className="login-left-panel">
          <img className="login-bg" src="/beach-hotel.png" alt="Ocean View Resort Sri Lanka" />
          <div className="login-left-overlay" />
          <div className="login-left-content">
            <div className="login-logo-row">
              <span className="login-logo-icon">🌊</span>
              <span className="login-logo-text">
                <span style={{ color: '#38bdf8' }}>OCEAN</span>VIEW
              </span>
            </div>
            <h1 className="login-headline">
              Your Luxury Escape<br />Awaits in Sri Lanka
            </h1>
            <p className="login-subtext">
              Pristine beaches &bull; Tropical gardens &bull; World-class service
            </p>
            <div className="login-badge">
              🏆 &nbsp;Rated #1 Beach Resort in Sri Lanka
            </div>
          </div>
        </div>

        {/* ── RIGHT: Login Form ── */}
        <div className="login-right-panel">
          <div className="login-form-box">

            <div className="login-mobile-title">
              <h2>
                <span style={{ color: '#1877f2' }}>Ocean</span>View Resort
              </h2>
            </div>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="login-input"
                placeholder="Username or email address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button type="submit" className="login-btn" disabled={loading}>
                {loading
                  ? <><span className="spinner-border spinner-border-sm me-2" role="status" /> Logging in…</>
                  : 'Log In'}
              </button>
            </form>

            <div className="login-forgot-row">
              <a href="#" className="login-forgot-link">Forgotten password?</a>
            </div>

            <hr className="login-divider" />

            <Link to="/register" className="login-create-btn">
              Create New Account
            </Link>

            <div className="login-rooms-card">
              <Link to="/rooms" className="login-rooms-link">
                🏨 &nbsp;View Available Rooms &amp; Prices →
              </Link>
              <p className="login-rooms-note">No login required to browse rooms</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
