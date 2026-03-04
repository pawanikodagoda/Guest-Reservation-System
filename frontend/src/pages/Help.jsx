import React, { useState, useMemo } from 'react';
import { Accordion, Container, Row, Col, Form, InputGroup, Nav, Button, Card } from 'react-bootstrap';
import {
  UserPlus,
  Calendar,
  Shield,
  Search,
  Info,
  HelpCircle,
  BookOpen,
  Key,
  Settings,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Users,
  RefreshCw
} from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const faqData = [
    {
      id: 'onb-1',
      category: 'onboarding',
      question: 'New Staff: How to navigate the system?',
      answer: 'Start with the Dashboard to see an overview of resort occupancy. Use the "Matrix" tab to view all current and upcoming reservations in a timeline format. The "New Booking" tab (for Staff) is your primary tool for creating guest entries.',
      icon: <Sparkles className="text-warning" size={20} />
    },
    {
      id: 'onb-2',
      category: 'onboarding',
      question: 'The Reservation Lifecycle',
      answer: '1. Check-in: Verify guest details. 2. Allocation: Select an AVAILABLE suite. 3. Confirmation: Finalize the booking to move the room to OCCUPIED. 4. Billing: Review and print the invoice for the guest.',
      icon: <RefreshCw className="text-primary" size={20} />
    },
    {
      id: 'onb-3',
      category: 'onboarding',
      question: 'Managing Guest Profiles',
      answer: 'When a guest returns, use the "Guest Selection" dropdown in the New Booking form. This links their stay to an existing profile, preserving their history and preferences without re-entering contact details.',
      icon: <Users className="text-info" size={20} />
    },
    {
      id: 'res-1',
      category: 'reservations',
      question: 'How to add a new guest reservation?',
      answer: 'Navigate to the "New Booking" tab. Enter guest details (first name, last name, unique email, and a valid 10-digit Sri Lankan phone number). Select an available suite and specify stay dates. Click "Finalize Guest Booking" to generate the invoice.',
      icon: <UserPlus className="text-primary" size={20} />
    },
    {
      id: 'res-2',
      category: 'reservations',
      question: 'What happens when a booking is confirmed?',
      answer: 'The system automatically marks the selected room as "OCCUPIED" and redirects you to the Billing page. A unique reservation ID is generated, and the guest record is either created or linked for future visits.',
      icon: <Calendar className="text-primary" size={20} />
    },
    {
      id: 'sys-1',
      category: 'system',
      question: 'How to monitor database health?',
      answer: 'Access the Admin Dashboard. The Database Health section shows real-time pulse for system status, latency metrics, and active connections. Use the "Refresh Status" button to trigger a live diagnostic check.',
      icon: <Shield className="text-info" size={20} />
    },
    {
      id: 'sys-2',
      category: 'system',
      question: 'Room availability logic',
      answer: 'Room statuses update instantly. "AVAILABLE" rooms can be booked immediately. "OCCUPIED" rooms are locked for current stays. If a reservation is deleted, the room status resets to "AVAILABLE" automatically.',
      icon: <Settings className="text-info" size={20} />
    },
    {
      id: 'acc-1',
      category: 'account',
      question: 'How to manage system users?',
      answer: 'Admins can use the "User Directory" in the command center. You can view all staff, admins, and customers, check their join dates, and initialize new staff accounts through the secure entry modal.',
      icon: <Key className="text-warning" size={20} />
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleVote = (id) => {
    setHelpfulVotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5 mt-4">
        <div className="d-inline-flex align-items-center gap-2 mb-3 px-4 py-2 rounded-pill glass-card border-primary border-opacity-25">
          <BookOpen size={18} className="text-primary" />
          <span className="text-primary fw-bold small text-uppercase tracking-wider">Knowledge Base</span>
        </div>
        <h1 className="display-4 fw-bold mb-3">How can we assist?</h1>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
          Explore our interactive documentation and system guides designed to help you master Ocean View operations.
        </p>
      </div>

      <Row className="justify-content-center mb-5">
        <Col lg={8}>
          <div className="glass-card p-2 rounded-pill shadow-xl border-primary border-opacity-10 mb-4">
            <InputGroup className="border-0">
              <InputGroup.Text className="bg-transparent border-0 ps-4 text-muted">
                <Search size={22} />
              </InputGroup.Text>
              <Form.Control
                className="bg-transparent border-0 text-white py-3 shadow-none fs-5"
                placeholder="Search for guides, tools, or procedures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          <Nav className="justify-content-center gap-3 custom-help-tabs">
            {['all', 'onboarding', 'reservations', 'system', 'account'].map(cat => (
              <Nav.Link
                key={cat}
                className={`rounded-pill px-4 py-2 text-capitalize fw-bold ${activeCategory === cat ? 'active bg-primary text-white shadow-lg' : 'text-muted glass-card border-0'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Nav.Link>
            ))}
          </Nav>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={9}>
          <Accordion className="custom-help-accordion mb-5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <Accordion.Item key={faq.id} eventKey={faq.id} className="glass-card mb-4 border-0 overflow-hidden shadow-none hover-card">
                  <Accordion.Header className="bg-transparent border-0">
                    <div className="d-flex align-items-center gap-3 w-100 pe-3">
                      <div className="p-2 rounded-3 bg-dark bg-opacity-25">
                        {faq.icon}
                      </div>
                      <span className="fw-bold fs-5 text-white">{faq.question}</span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted bg-transparent border-0 pt-0 px-5 pb-4">
                    <div className="ps-4 border-start border-primary border-opacity-25 py-2 mb-4 fs-6 lh-lg">
                      {faq.answer}
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top border-white border-opacity-5">
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <Sparkles size={14} className="text-primary" />
                        Was this helpful?
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="link"
                          className={`p-0 text-decoration-none d-flex align-items-center gap-2 small ${helpfulVotes[faq.id] ? 'text-primary' : 'text-muted'}`}
                          onClick={() => handleVote(faq.id)}
                        >
                          <ThumbsUp size={16} /> {helpfulVotes[faq.id] ? 'Voted' : 'Yes'}
                        </Button>
                        <Button variant="link" className="p-0 text-muted text-decoration-none d-flex align-items-center gap-2 small">
                          <MessageSquare size={16} /> Feedback
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <div className="text-center py-5 glass-card border-dashed">
                <Info size={48} className="text-muted mb-3 opacity-25" />
                <h5 className="text-muted">No matching technical guides found</h5>
                <p className="text-muted small">Try adjusting your search or switching categories</p>
              </div>
            )}
          </Accordion>

          <Card className="glass-card p-4 border border-primary border-opacity-25 shadow-xl bg-black bg-opacity-40">
            <Row className="align-items-center g-4 ps-2">
              <Col md={7}>
                <h5 className="text-white fw-bold mb-1 d-flex align-items-center gap-2">
                  Still need help? <HelpCircle size={18} className="text-primary" />
                </h5>
                <p className="text-muted small mb-0 pe-4">Our dedicated technical support team is available 24/7 for resort-wide critical assistance.</p>
              </Col>
              <Col md={5} className="text-md-end text-white pe-4">
                <div className="fw-bold mb-2 fs-5">support@oceanview.com</div>
                <div className="d-flex flex-column gap-1">
                  <div className="text-primary fw-bold">+94 11 234 5678 (Local)</div>
                  <div className="text-muted small">+1 (555) 123-4567 (Intl)</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <style>{`
        .custom-help-accordion .accordion-button {
          background-color: transparent !important;
          color: white !important;
          box-shadow: none !important;
          padding: 2rem 1.5rem;
          transition: all 0.3s ease;
        }
        .custom-help-accordion .accordion-button span {
          color: white !important;
        }
        .custom-help-accordion .accordion-button:not(.collapsed) {
          background-color: rgba(45, 212, 191, 0.05) !important;
          color: var(--primary) !important;
        }
        .custom-help-accordion .accordion-button:not(.collapsed) span {
          color: var(--primary) !important;
        }
        .custom-help-accordion .accordion-button::after {
          filter: invert(1);
          transform: scale(0.8);
        }
        .custom-help-accordion .accordion-item {
          background-color: transparent !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .custom-help-tabs .nav-link {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-help-tabs .nav-link:hover:not(.active) {
          background: rgba(45, 212, 191, 0.1);
          color: var(--primary) !important;
        }
      `}</style>
    </Container>
  );
};

export default Help;
