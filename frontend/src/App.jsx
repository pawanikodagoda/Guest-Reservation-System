import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReservationList from './pages/ReservationList';
import AddReservation from './pages/AddReservation';
import Billing from './pages/Billing';
import Help from './pages/Help';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import PublicRooms from './pages/PublicRooms';
import ManageRooms from './pages/ManageRooms';

// Wrapper to hide nav on landing/login/register pages
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavOn = ['/', '/login', '/register'];
  const showNav = !hideNavOn.includes(location.pathname);
  return (
    <>
      {showNav && <Navigation />}
      <div className={showNav ? 'container mt-4' : ''}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Landing page = Login (split-screen) */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public room browsing - no login needed */}
            <Route path="/rooms" element={<PublicRooms />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/staff-dashboard" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><StaffDashboard /></ProtectedRoute>} />
            <Route path="/manage-rooms" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><ManageRooms /></ProtectedRoute>} />
            <Route path="/reservations" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><ReservationList /></ProtectedRoute>} />
            <Route path="/add-reservation" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN', 'ROLE_USER']}><AddReservation /></ProtectedRoute>} />
            <Route path="/billing/:id" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><Billing /></ProtectedRoute>} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
