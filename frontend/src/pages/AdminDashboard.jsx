import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Button, Badge } from 'react-bootstrap';
import { Users, Database, Bed, Activity, Wifi, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [latency, setLatency] = useState(4);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate health check
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 5) + 2);
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <div className="mb-5">
        <h1 className="display-4 fw-bold mb-1">Admin Command Center</h1>
        <p className="text-muted lead">Global system controls and user management</p>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Link to="/manage-rooms" className="text-decoration-none">
            <div className="glass-card p-4 text-center h-100 hover-card">
              <div className="stat-icon mx-auto mb-3" style={{ background: 'rgba(165, 180, 252, 0.1)', color: '#6366F1' }}>
                <Bed size={24} />
              </div>
              <h5 className="text-white">Suite Inventory</h5>
              <p className="small text-muted">Manage rooms, pricing, and availability</p>
            </div>
          </Link>
        </Col>
        <Col md={6}>
          <Link to="/manage-users" className="text-decoration-none">
            <div className="glass-card p-4 text-center h-100 hover-card">
              <div className="stat-icon mx-auto mb-3" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                <Users size={24} />
              </div>
              <h5 className="text-white">User Directory</h5>
              <p className="small text-muted">Manage staff accounts and permissions</p>
            </div>
          </Link>
        </Col>
      </Row>

      <div className="glass-card p-5 mt-5 position-relative overflow-hidden">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h4 mb-0">Database Health</h3>
          <Button
            variant="link"
            className="text-primary p-0 d-flex align-items-center gap-2 text-decoration-none"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw size={18} className={isRefreshing ? 'spin' : ''} />
            <span className="small fw-bold">{isRefreshing ? 'Checking...' : 'Refresh Status'}</span>
          </Button>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <div className="p-4 rounded-4 bg-black bg-opacity-20 border border-white border-opacity-10 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="pulse-container">
                  <div className="pulse-dot"></div>
                </div>
                <div className="fw-bold text-white small text-uppercase tracking-wider">System Status</div>
              </div>
              <div className="h2 mb-1 fw-bold text-primary">Operational</div>
              <div className="small text-muted">Core services stable</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded-4 bg-black bg-opacity-20 border border-white border-opacity-10 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Wifi size={24} className="text-info" />
                <div className="fw-bold text-white small text-uppercase tracking-wider">Latency</div>
              </div>
              <div className="h2 mb-1 fw-bold text-info">{latency}ms</div>
              <div className="small text-muted">Ultra-fast connection</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded-4 bg-black bg-opacity-20 border border-white border-opacity-10 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <Activity size={24} className="text-danger" style={{ opacity: 1 }} />
                <div className="fw-bold text-white small text-uppercase tracking-wider">Uptime</div>
              </div>
              <div className="h2 mb-1 fw-bold text-danger">99.98%</div>
              <div className="small text-muted">Verified last 30d</div>
            </div>
          </Col>
        </Row>

        <div className="mt-4 p-3 rounded-3 bg-black bg-opacity-20 border border-white border-opacity-10 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Database size={18} className="text-primary" />
            <span className="small text-muted fw-bold text-uppercase tracking-wider">Primary Cluster: <span className="text-white ms-2">ocean_view_db_v1</span></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="small text-muted fw-bold text-uppercase tracking-wider">Active Connections:</div>
            <Badge bg="primary" className="px-3 py-2" style={{ background: 'rgba(59, 130, 246, 0.3)', color: '#FFF', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '8px' }}>12/100</Badge>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;
