import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container mt-auto">
      <div className="footer-glass py-5 border-0 border-top position-relative overflow-hidden" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {/* Decorative background elements */}
        <div className="position-absolute top-0 end-0 p-5 opacity-10">
          <Globe size={200} className="text-primary" />
        </div>

        <Container>
          <Row className="g-5 position-relative" style={{ zIndex: 1 }}>
            <Col lg={4}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="p-2 rounded-3 bg-primary bg-opacity-20 shadow-glow">
                  <ShieldCheck size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-white tracking-tight">OCEAN VIEW</h3>
                  <span className="text-primary small fw-bold text-uppercase tracking-widest">Resort & Spa</span>
                </div>
              </div>
              <p className="text-muted mb-4 pe-lg-4 lh-lg">
                The pinnacle of luxury and digital sophistication in Sri Lanka.
                Experience seamless hospitality management powered by our next-gen reservation engine.
              </p>
              <div className="d-flex gap-3">
                {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                  <a key={idx} href="#" className="btn btn-outline-light rounded-circle p-2 social-btn glass-card border-0">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </Col>

            <Col md={6} lg={2}>
              <h5 className="text-white fw-bold mb-4 d-flex align-items-center gap-2">
                Discovery <ChevronRight size={16} className="text-primary" />
              </h5>
              <ul className="list-unstyled d-flex flex-column gap-3">
                {[
                  { name: 'Room Gallery', path: '/rooms' },
                  { name: 'Staff Matrix', path: '/reservations' },
                  { name: 'System Support', path: '/help' },
                  { name: 'Live Dashboard', path: '/dashboard' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-muted text-decoration-none footer-link d-inline-flex align-items-center gap-2">
                      <div className="dot" /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            <Col md={6} lg={3}>
              <h5 className="text-white fw-bold mb-4 d-flex align-items-center gap-2">
                Operational <ChevronRight size={16} className="text-primary" />
              </h5>
              <ul className="list-unstyled d-flex flex-column gap-3 text-muted">
                <li className="d-flex align-items-start gap-3">
                  <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                  <span>No. 25, Galle Road,<br />Colombo 03, Sri Lanka</span>
                </li>
                <li className="d-flex align-items-center gap-3">
                  <Phone size={20} className="text-primary flex-shrink-0" />
                  <span>+94 11 234 5678</span>
                </li>
                <li className="d-flex align-items-center gap-3">
                  <Mail size={20} className="text-primary flex-shrink-0" />
                  <span>ops@oceanview.lk</span>
                </li>
              </ul>
            </Col>

            <Col lg={3}>
              <div className="glass-card p-4 bg-black bg-opacity-20 border-primary border-opacity-10 rounded-4">
                <h6 className="text-primary fw-bold text-uppercase small mb-3 tracking-widest d-flex align-items-center gap-2">
                  <ExternalLink size={14} /> System Status
                </h6>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="pulse-dot" />
                  <span className="text-white fw-bold small">NODE-01 ACTIVE</span>
                </div>
                <p className="text-muted extra-small mb-0">
                  Last sync: 2 minutes ago<br />
                  Version: 2.4.0 (Stable)
                </p>
              </div>
            </Col>
          </Row>

          <hr className="my-5 border-white border-opacity-10" />

          <Row className="align-items-center g-3">
            <Col md={6}>
              <p className="text-muted mb-0 small">
                © {currentYear} Ocean View Resort. Crafted for premium hospitality management.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex gap-4 justify-content-md-end small text-muted">
                <a href="#" className="text-decoration-none footer-link">Privacy Policy</a>
                <a href="#" className="text-decoration-none footer-link">Terms of Service</a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <style>{`
        .footer-container {
          position: relative;
          z-index: 10;
        }
        .footer-glass {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow: 0 -20px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .social-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .social-btn:hover {
          background: var(--primary) !important;
          color: white !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(45, 212, 191, 0.2);
        }
        .footer-link {
          transition: all 0.3s ease;
          position: relative;
        }
        .footer-link:hover {
          color: var(--primary) !important;
          padding-left: 5px;
        }
        .footer-link .dot {
          width: 4px;
          height: 4px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
        }
        .footer-link:hover .dot {
          opacity: 1;
        }
        .extra-small {
          font-size: 0.75rem;
        }
        .shadow-glow {
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
        }
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: footer-pulse 2s infinite;
        }
        @keyframes footer-pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
