import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ShieldAlert, Users, Settings, Database } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <Container className="py-5">
      <div className="mb-5">
        <h1 className="display-4 fw-bold mb-1">Admin Command Center</h1>
        <p className="text-muted lead">Global system controls and user management</p>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <div className="glass-card p-4 text-center">
            <div className="stat-icon mx-auto mb-3" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
              <ShieldAlert size={24} />
            </div>
            <h5>Security Logs</h5>
            <p className="small text-muted">Monitor system access events</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="glass-card p-4 text-center">
            <div className="stat-icon mx-auto mb-3" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
              <Users size={24} />
            </div>
            <h5>User Directory</h5>
            <p className="small text-muted">Manage staff accounts and permissions</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="glass-card p-4 text-center">
            <div className="stat-icon mx-auto mb-3" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
              <Settings size={24} />
            </div>
            <h5>System Config</h5>
            <p className="small text-muted">Adjust global resort parameters</p>
          </div>
        </Col>
      </Row>

      <div className="glass-card p-5 mt-5">
        <h3 className="h4 mb-4">Database Health</h3>
        <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-white bg-opacity-5">
          <Database className="text-primary" />
          <div>
            <div className="fw-bold">ocean_view_db</div>
            <div className="small text-muted">Status: Operational | Latency: 4ms</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;
