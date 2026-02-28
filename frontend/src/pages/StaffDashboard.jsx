import React from 'react';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';

const StaffDashboard = () => {
  return (
    <div>
      <Container className="pt-5">
        <div className="mb-2">
          <h1 className="display-4 fw-bold mb-1">Staff Operations</h1>
          <p className="text-muted lead">Daily guest management and room control</p>
        </div>
      </Container>
      <Dashboard />
    </div>
  );
};

export default StaffDashboard;
