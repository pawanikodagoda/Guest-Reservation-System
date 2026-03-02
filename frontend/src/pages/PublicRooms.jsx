import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bed, Info, ArrowRight, Star } from 'lucide-react';

// 12 static Sri Lankan rooms with English names, prices Rs.10,000 – Rs.15,000
const SRI_LANKAN_ROOMS = [
  { id: 1, roomNumber: 'OV-101', name: 'Galle Beach Suite', type: 'Suite', price: 15000.00, status: 'Available', stars: 5 },
  { id: 2, roomNumber: 'OV-102', name: 'Mirissa Ocean Villa', type: 'Deluxe', price: 14500.00, status: 'Available', stars: 5 },
  { id: 3, roomNumber: 'OV-103', name: 'Unawatuna Garden Room', type: 'Double', price: 12500.00, status: 'Available', stars: 4 },
  { id: 4, roomNumber: 'OV-104', name: 'Hikkaduwa Beachfront', type: 'Deluxe', price: 13500.00, status: 'Available', stars: 4 },
  { id: 5, roomNumber: 'OV-105', name: 'Bentota Lagoon Suite', type: 'Suite', price: 15000.00, status: 'Available', stars: 5 },
  { id: 6, roomNumber: 'OV-106', name: 'Koggala Sunset Villa', type: 'Deluxe', price: 14000.00, status: 'Available', stars: 5 },
  { id: 7, roomNumber: 'OV-107', name: 'Tangalle Palmyrah Room', type: 'Double', price: 11500.00, status: 'Available', stars: 3 },
  { id: 8, roomNumber: 'OV-108', name: 'Weligama Bay Room', type: 'Single', price: 10000.00, status: 'Available', stars: 3 },
  { id: 9, roomNumber: 'OV-109', name: 'Ahangama Coral Suite', type: 'Suite', price: 14500.00, status: 'Available', stars: 5 },
  { id: 10, roomNumber: 'OV-110', name: 'Polhena Heritage Room', type: 'Single', price: 10500.00, status: 'Available', stars: 3 },
  { id: 11, roomNumber: 'OV-111', name: 'Kahandamodara Retreat', type: 'Double', price: 12000.00, status: 'Available', stars: 4 },
  { id: 12, roomNumber: 'OV-112', name: 'Dickwella Seabreeze', type: 'Double', price: 11000.00, status: 'Available', stars: 3 },
];

const typeColors = {
  Suite: { bg: '#ede9fe', color: '#5b21b6', border: '#c4b5fd' },
  Deluxe: { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' },
  Double: { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' },
  Single: { bg: '#dcfce7', color: '#14532d', border: '#86efac' },
};

const PublicRooms = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleReserve = (room) => {
    if (user) {
      navigate('/add-reservation', { state: { roomId: room.id } });
    } else {
      navigate('/login', { state: { from: '/rooms' } });
    }
  };

  const types = ['All', 'Suite', 'Deluxe', 'Double', 'Single'];
  const displayed = filter === 'All'
    ? SRI_LANKAN_ROOMS
    : SRI_LANKAN_ROOMS.filter(r => r.type === filter);

  return (
    <>
      <style>{`
        .public-rooms-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8faff 0%, #eef3fb 100%);
          padding: 48px 20px 60px;
          font-family: 'Inter', sans-serif;
        }
        .pr-hero {
          text-align: center;
          margin-bottom: 40px;
        }
        .pr-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e0f2fe;
          color: #0369a1;
          border: 1px solid #bae6fd;
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 18px;
          letter-spacing: 0.04em;
        }
        .pr-hero h1 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3rem);
          color: #0f172a !important;
          background: none !important;
          -webkit-text-fill-color: #0f172a !important;
          margin-bottom: 12px;
          letter-spacing: -0.03em;
        }
        .pr-hero p {
          color: #64748b;
          font-size: 1.05rem;
          max-width: 620px;
          margin: 0 auto 28px;
          line-height: 1.7;
        }
        .pr-login-banner {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #1877f2, #0ea5e9);
          color: #fff;
          border-radius: 10px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 0.93rem;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(24,119,242,0.3);
          transition: transform 0.18s, box-shadow 0.18s;
          margin-bottom: 4px;
        }
        .pr-login-banner:hover {
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(24,119,242,0.38);
        }
        .pr-filter-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .pr-filter-btn {
          padding: 7px 20px;
          border-radius: 100px;
          border: 1px solid #d1d5db;
          background: #fff;
          color: #374151;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.16s;
        }
        .pr-filter-btn:hover { border-color: #1877f2; color: #1877f2; }
        .pr-filter-btn.active {
          background: #1877f2;
          color: #fff;
          border-color: #1877f2;
          box-shadow: 0 4px 14px rgba(24,119,242,0.28);
        }

        /* TABLE CARD */
        .pr-table-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
          max-width: 1100px;
          margin: 0 auto;
          border: 1px solid #e9edf5;
        }
        .pr-table-card table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.93rem;
        }
        .pr-table-card thead {
          background: linear-gradient(135deg, #1e3a5f 0%, #1877f2 100%);
        }
        .pr-table-card thead th {
          color: #fff !important;
          font-weight: 700 !important;
          font-size: 0.78rem !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          padding: 16px 20px !important;
          border: none !important;
          white-space: nowrap;
        }
        .pr-table-card tbody tr {
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.15s;
        }
        .pr-table-card tbody tr:nth-child(even) {
          background: #f8fafc;
        }
        .pr-table-card tbody tr:nth-child(odd) {
          background: #ffffff;
        }
        .pr-table-card tbody tr:hover {
          background: #eff6ff !important;
        }
        .pr-table-card tbody tr:last-child {
          border-bottom: none;
        }
        .pr-table-card td {
          padding: 15px 20px !important;
          color: #1e293b !important;
          vertical-align: middle !important;
          border: none !important;
        }
        .pr-room-number {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #1e293b;
        }
        .pr-room-icon {
          background: #dbeafe;
          color: #1d4ed8;
          border-radius: 8px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pr-room-name {
          font-weight: 600;
          color: #0f172a;
        }
        .pr-stars {
          display: flex;
          gap: 1px;
          margin-top: 2px;
        }
        .pr-type-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid;
          white-space: nowrap;
        }
        .pr-price {
          font-weight: 800;
          color: #059669;
          font-size: 1rem;
          white-space: nowrap;
        }
        .pr-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #86efac;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 700;
        }
        .pr-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
          flex-shrink: 0;
        }
        .pr-reserve-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: #fff;
          color: #1877f2;
          border: 2px solid #1877f2;
          border-radius: 8px;
          font-size: 0.83rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .pr-reserve-btn:hover {
          background: #1877f2;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(24,119,242,0.3);
        }
        .pr-summary-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px;
          background: #f8fafc;
          border-top: 1px solid #e9edf5;
          font-size: 0.85rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pr-summary-stat {
          font-weight: 600;
          color: #1e293b;
        }

        @media (max-width: 640px) {
          .pr-table-card { border-radius: 12px; }
          .pr-table-card thead th, .pr-table-card td { padding: 12px 12px !important; }
          .pr-hide-sm { display: none; }
        }
      `}</style>

      <div className="public-rooms-page">
        {/* Hero */}
        <div className="pr-hero">
          <div className="pr-hero-badge">🌴 Ocean View Resort · Southern Sri Lanka</div>
          <h1>Our Available Rooms</h1>
          <p>
            Choose from 12 beautifully appointed rooms nestled along Sri Lanka's
            pristine southern coast. Prices start from Rs.&nbsp;10,000.00 per night.
          </p>
          <Link to="/login" className="pr-login-banner">
            Sign up or log in to make a reservation &nbsp;→
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="pr-filter-bar">
          {types.map(t => (
            <button
              key={t}
              className={`pr-filter-btn ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t === 'All' ? '🏨 All Rooms' : t}
            </button>
          ))}
        </div>

        {/* Table card */}
        <div className="pr-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Room No.</th>
                  <th>Room Name</th>
                  <th className="pr-hide-sm">Type</th>
                  <th>Price Per Night</th>
                  <th className="pr-hide-sm">Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((room) => {
                  const tc = typeColors[room.type] || { bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' };
                  return (
                    <tr key={room.id}>
                      {/* Room Number */}
                      <td>
                        <div className="pr-room-number">
                          <div className="pr-room-icon">
                            <Bed size={16} />
                          </div>
                          {room.roomNumber}
                        </div>
                      </td>

                      {/* Room Name */}
                      <td>
                        <div className="pr-room-name">{room.name}</div>
                        <div className="pr-stars">
                          {Array.from({ length: room.stars }).map((_, i) => (
                            <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="pr-hide-sm">
                        <span
                          className="pr-type-badge"
                          style={{ background: tc.bg, color: tc.color, borderColor: tc.border }}
                        >
                          {room.type}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <span className="pr-price">
                          Rs. {room.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                        </span>
                        <div style={{ fontSize: '0.73rem', color: '#94a3b8', marginTop: '2px' }}>per night</div>
                      </td>

                      {/* Status */}
                      <td className="pr-hide-sm">
                        <span className="pr-status-badge">
                          <span className="pr-status-dot" />
                          Available
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: 'center' }}>
                        <button onClick={() => handleReserve(room)} className="pr-reserve-btn">
                          Reserve Now <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary bar */}
          <div className="pr-summary-bar">
            <span>
              Showing <span className="pr-summary-stat">{displayed.length}</span> of&nbsp;
              <span className="pr-summary-stat">12</span> rooms
            </span>
            <span>
              Price range:&nbsp;
              <span className="pr-summary-stat">Rs. 10,000.00 – Rs. 15,000.00</span>
              &nbsp;per night
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicRooms;
