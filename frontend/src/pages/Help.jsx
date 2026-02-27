import React from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';

const Help = () => {
  return (
    <Container className="py-4">
      <div className="mb-5 text-center">
        <h1 className="fw-bold mb-2">Help & Support Center</h1>
        <p className="text-muted">Documentation and assistance for resort staff</p>
      </div>

      <div className="glass-card p-5 mb-5 shadow-lg overflow-hidden position-relative">
        <div className="position-relative" style={{ zIndex: 1 }}>
          <h4 className="text-primary fw-bold mb-3">System Overview</h4>
          <p className="text-muted mb-0">
            Welcome to the <strong>Ocean View Resort Management System</strong>. This platform is designed to streamline
            guest reservations, room allocation, and billing operations. Use the navigation bar to access different modules.
          </p>
        </div>
      </div>

      <h4 className="mb-4 text-white fw-bold">Frequently Asked Questions</h4>
      <Accordion className="custom-help-accordion mb-5">
        <Accordion.Item eventKey="0" className="glass-card mb-3 border-0 overflow-hidden">
          <Accordion.Header className="bg-transparent text-white border-0">
            <span className="fw-bold">How to add a new reservation?</span>
          </Accordion.Header>
          <Accordion.Body className="text-muted bg-transparent border-0 pt-0">
            Navigate to the <strong className="text-white">"New Booking"</strong> tab in the navigation menu.
            Fill in the guest's contact information, select an available suite from the dropdown, and specify the
            check-in and check-out dates. Click "Confirm Reservation" to finalize the booking.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="glass-card mb-3 border-0 overflow-hidden">
          <Accordion.Header className="bg-transparent text-white border-0">
            <span className="fw-bold">How to generate a guest invoice?</span>
          </Accordion.Header>
          <Accordion.Body className="text-muted bg-transparent border-0 pt-0">
            In the <strong className="text-white">"Reservations"</strong> list, locate the relevant booking.
            Click the <strong className="text-info">"Invoice"</strong> button to view the detailed breakdown.
            From the invoice page, you can download a PDF or print a physical copy for the guest.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="glass-card mb-3 border-0 overflow-hidden">
          <Accordion.Header className="bg-transparent text-white border-0">
            <span className="fw-bold">Room availability management</span>
          </Accordion.Header>
          <Accordion.Body className="text-muted bg-transparent border-0 pt-0">
            The system handles room statuses automatically. When a reservation is confirmed, the selected room
            is moved to <strong className="text-white">"OCCUPIED"</strong>. If a reservation is cancelled,
            the room immediately becomes <strong className="text-success">"AVAILABLE"</strong> for new bookings.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="glass-card p-4 border-primary border-opacity-25 shadow-lg">
        <Row className="align-items-center g-4">
          <Col md={8}>
            <h5 className="text-white fw-bold mb-1">Still need help?</h5>
            <p className="text-muted small mb-0">Contact our 24/7 technical support department for immediate assistance.</p>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="text-white fw-bold small">support@oceanview.com</div>
            <div className="text-primary fw-bold">+1 (555) 123-4567</div>
          </Col>
        </Row>
      </div>

      <style>{`
        .custom-help-accordion .accordion-button {
          background-color: transparent !important;
          color: white !important;
          box-shadow: none !important;
          padding: 1.5rem;
        }
        .custom-help-accordion .accordion-button:not(.collapsed) {
          color: var(--primary) !important;
        }
        .custom-help-accordion .accordion-button::after {
          filter: invert(1);
        }
        .custom-help-accordion .accordion-item {
          background-color: transparent !important;
        }
      `}</style>
    </Container>
  );
};

export default Help;
