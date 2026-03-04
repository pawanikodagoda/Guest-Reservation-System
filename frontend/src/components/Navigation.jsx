import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, ClipboardList, PlusCircle, HelpCircle, Waves, Bed, Shield, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" sticky="top" className="navbar mb-4 py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <div className="stat-icon mb-0 p-2 rounded-3" style={{ width: '40px', height: '40px', background: 'var(--primary-glow)' }}>
            <Waves size={24} className="text-primary" />
          </div>
          <span className="fw-bold fs-3 text-white" style={{ letterSpacing: '-0.05em' }}>
            <span style={{ color: 'var(--primary)' }}>OCEAN</span>VIEW
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 p-0">
          <div className="p-2 glass-card rounded-3">
            <div className="bg-white rounded-pill mb-1" style={{ width: '20px', height: '2px' }}></div>
            <div className="bg-white rounded-pill mb-1" style={{ width: '15px', height: '2px' }}></div>
            <div className="bg-white rounded-pill" style={{ width: '20px', height: '2px' }}></div>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto bg-white bg-opacity-5 p-2 rounded-pill d-none d-lg-flex">
            {(!user || user.role === 'ROLE_USER') && (
              <Nav.Link as={Link} to="/rooms" className={`px-4 rounded-pill d-flex align-items-center gap-2 ${isActive('/rooms') ? 'active glass-card bg-primary text-white' : ''}`}>
                <Bed size={18} /> Our Rooms
              </Nav.Link>
            )}

            {user && (
              <>
                <Nav.Link as={Link} to="/dashboard" className={`px-4 rounded-pill d-flex align-items-center gap-2 ${isActive('/dashboard') ? 'active glass-card bg-primary text-white' : ''}`}>
                  <LayoutDashboard size={18} /> Dashboard
                </Nav.Link>

                {user.role === 'ROLE_ADMIN' && (
                  <Nav.Link as={Link} to="/admin-dashboard" className={`px-4 rounded-pill d-flex align-items-center gap-2 ${isActive('/admin-dashboard') ? 'active glass-card bg-primary text-white' : ''}`}>
                    <Shield size={18} /> Admin
                  </Nav.Link>
                )}

                {(user.role === 'ROLE_STAFF' || user.role === 'ROLE_ADMIN') && (
                  <>
                    <Nav.Link as={Link} to="/reservations" className={`px-4 rounded-pill d-flex align-items-center gap-2 ${isActive('/reservations') ? 'active glass-card bg-primary text-white' : ''}`}>
                      <ClipboardList size={18} /> Matrix
                    </Nav.Link>
                    {user.role === 'ROLE_STAFF' && (
                      <Nav.Link as={Link} to="/add-reservation" className={`px-4 rounded-pill d-flex align-items-center gap-2 ${isActive('/add-reservation') ? 'active glass-card bg-primary text-white' : ''}`}>
                        <PlusCircle size={18} /> New Booking
                      </Nav.Link>
                    )}
                  </>
                )}
              </>
            )}
            <Nav.Link as={Link} to="/help" className={`px-4 rounded-pill d-flex align-items-center gap-2 ${isActive('/help') ? 'active glass-card bg-primary text-white' : ''}`}>
              <HelpCircle size={18} /> Help and Support
            </Nav.Link>
          </Nav>

          {/* Mobile Nav Links */}
          <Nav className="d-lg-none py-3">
            {(!user || user.role === 'ROLE_USER') && (
              <Nav.Link as={Link} to="/rooms" className={isActive('/rooms') ? 'text-primary' : ''}>Our Rooms</Nav.Link>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/dashboard" className={isActive('/dashboard') ? 'text-primary' : ''}>Dashboard</Nav.Link>
                {user.role === 'ROLE_ADMIN' && <Nav.Link as={Link} to="/admin-dashboard" className={isActive('/admin-dashboard') ? 'text-primary' : ''}>Admin</Nav.Link>}
                {(user.role === 'ROLE_STAFF' || user.role === 'ROLE_ADMIN') && (
                  <>
                    <Nav.Link as={Link} to="/reservations" className={isActive('/reservations') ? 'text-primary' : ''}>Matrix</Nav.Link>
                    {user.role === 'ROLE_STAFF' && (
                      <Nav.Link as={Link} to="/add-reservation" className={isActive('/add-reservation') ? 'text-primary' : ''}>New Booking</Nav.Link>
                    )}
                  </>
                )}
              </>
            )}
            <Nav.Link as={Link} to="/help" className={isActive('/help') ? 'text-primary' : ''}>Help and Support</Nav.Link>
          </Nav>

          <Nav className="ms-lg-4">
            {user ? (
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex flex-column text-end d-none d-xl-block">
                  <span className="text-white small fw-bold">{user.username}</span>
                  <span className="text-muted extra-small">{user.role.replace('ROLE_', '')}</span>
                </div>
                <Button
                  variant="link"
                  className="glass-card p-2 text-decoration-none text-accent d-flex align-items-center justify-content-center"
                  onClick={handleLogout}
                  style={{ color: 'var(--accent)', background: 'rgba(244, 63, 94, 0.05)' }}
                >
                  <LogOut size={22} />
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <Nav.Link as={Link} to="/login" className="text-white small fw-bold text-decoration-none">Sign In</Nav.Link>
                <Button as={Link} to="/register" className="btn-primary py-2 px-4 shadow-sm">Authorize</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style>{`
        .extra-small { font-size: 0.65rem; letter-spacing: 0.05em; }
        .nav-link.active.glass-card { 
          background: rgba(45, 212, 191, 0.1) !important; 
          opacity: 1 !important; 
          border: 1px solid rgba(45, 212, 191, 0.2) !important;
        }
      `}</style>
    </Navbar>
  );
};

export default Navigation;
