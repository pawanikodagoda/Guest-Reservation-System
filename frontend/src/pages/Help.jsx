import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const Help = () => {
  return (
    <div>
      <h1 className="mb-4">Help & Support</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Ocean View Resort Management System</Card.Title>
          <Card.Text>
            Welcome to the online reservation system. If you need assistance, please refer to the common questions below or contact the IT department.
          </Card.Text>
        </Card.Body>
      </Card>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to add a new reservation?</Accordion.Header>
          <Accordion.Body>
            Navigate to the "Add Reservation" tab, enter the guest details, select an available room, and click "Confirm Booking".
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to generate a bill?</Accordion.Header>
          <Accordion.Body>
            Go to the "Reservations" list and click the "Bill" button next to any reservation to view and print the invoice.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Room status management</Accordion.Header>
          <Accordion.Body>
            Rooms are automatically marked as "OCCUPIED" when a reservation is confirmed and "AVAILABLE" if a reservation is cancelled.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="mt-5">
        <h4>Contact Support</h4>
        <p>Email: support@oceanview.com<br />
          Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default Help;
