import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rooms" element={<PublicRooms />} />
            <Route path="/" element={<Navigate to="/rooms" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/staff-dashboard" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><StaffDashboard /></ProtectedRoute>} />
            <Route path="/manage-rooms" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><ManageRooms /></ProtectedRoute>} />
            <Route path="/reservations" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><ReservationList /></ProtectedRoute>} />
            <Route path="/add-reservation" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><AddReservation /></ProtectedRoute>} />
            <Route path="/billing/:id" element={<ProtectedRoute allowedRoles={['ROLE_STAFF', 'ROLE_ADMIN']}><Billing /></ProtectedRoute>} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
