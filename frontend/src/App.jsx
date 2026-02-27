import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/reservations" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
            <Route path="/add-reservation" element={<ProtectedRoute><AddReservation /></ProtectedRoute>} />
            <Route path="/billing/:id" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
