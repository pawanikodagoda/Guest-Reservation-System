import React, { useState, useEffect } from 'react';
import {
  Container, Table, Button, Form, Row, Col, Modal, Spinner, Alert
} from 'react-bootstrap';
import {
  Plus, Trash2, Users, ArrowLeft, Shield, User as UserIcon,
  Eye, EyeOff, Copy, Check, RefreshCw, KeyRound, UserCheck, UserX
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// ─── Role config ────────────────────────────────────────────────────────────
const ROLES = [
  { value: 'ROLE_STAFF', label: 'Staff Member', color: '#2DD4BF', bg: 'rgba(45,212,191,0.12)' },
  { value: 'ROLE_ADMIN', label: 'Administrator', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  { value: 'ROLE_USER', label: 'Customer Account', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' },
];

const roleStyle = (role) => {
  const r = ROLES.find(r => r.value === role) || ROLES[2];
  return { color: r.color, background: r.bg, border: `1px solid ${r.color}33` };
};

const roleLabel = (role) => (ROLES.find(r => r.value === role) || ROLES[2]).label;

// ─── Password generator ──────────────────────────────────────────────────────
const generatePassword = () => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXY';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const nums = '23456789';
  const syms = '@#$!';
  const all = upper + lower + nums + syms;
  let pw = upper[Math.floor(Math.random() * upper.length)]
    + lower[Math.floor(Math.random() * lower.length)]
    + nums[Math.floor(Math.random() * nums.length)]
    + syms[Math.floor(Math.random() * syms.length)];
  for (let i = 4; i < 12; i++) pw += all[Math.floor(Math.random() * all.length)];
  return pw.split('').sort(() => Math.random() - 0.5).join('');
};

// ─── Copy Button ─────────────────────────────────────────────────────────────
const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      title="Copy to clipboard"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? '#2DD4BF' : '#94A3B8', padding: '2px 6px',
        transition: 'color 0.2s'
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);   // { type, msg }
  const [filterRole, setFilterRole] = useState('ALL');
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', role: 'ROLE_STAFF' });
  const navigate = useNavigate();

  // Counts
  const staffCount = users.filter(u => u.role === 'ROLE_STAFF').length;
  const adminCount = users.filter(u => u.role === 'ROLE_ADMIN').length;
  const userCount = users.filter(u => u.role === 'ROLE_USER').length;

  useEffect(() => { fetchUsers(); }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      showToast('danger', 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenerate = () =>
    setFormData({ ...formData, password: generatePassword() });

  const openModal = () => {
    setFormData({ username: '', password: generatePassword(), role: 'ROLE_STAFF' });
    setShowPw(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPw(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      showToast('warning', 'Password must be at least 6 characters.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/users', formData);
      closeModal();
      await fetchUsers();
      showToast('success', `Account for "${formData.username}" created successfully!`);
    } catch (err) {
      showToast('danger', err.response?.data?.message || 'Failed to create user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Delete "${username}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/users/${id}`);
      await fetchUsers();
      showToast('success', `"${username}" has been removed.`);
    } catch (err) {
      showToast('danger', 'Failed to delete user.');
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      await fetchUsers();
      showToast('success', 'Role updated successfully.');
    } catch (err) {
      showToast('danger', 'Failed to update role.');
    }
  };

  // Filter logic
  const filtered = users.filter(u => {
    const matchRole = filterRole === 'ALL' || u.role === filterRole;
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <Container className="py-5 text-white">

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          minWidth: '320px', animation: 'slideIn 0.3s ease'
        }}>
          <Alert
            variant={toast.type}
            onClose={() => setToast(null)}
            dismissible
            className="mb-0 fw-semibold shadow-lg"
            style={{ borderRadius: '14px', border: 'none' }}
          >
            {toast.msg}
          </Alert>
        </div>
      )}

      {/* ── Header ── */}
      <div className="d-flex align-items-center gap-4 mb-5">
        <button
          onClick={() => navigate('/admin-dashboard')}
          className="btn btn-outline-light rounded-circle p-3 glass-card text-white"
          style={{ flexShrink: 0 }}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-grow-1">
          <h1 className="display-4 fw-bold mb-1">Staff Management</h1>
          <p className="text-muted lead mb-0">Create and manage staff credentials &amp; permissions</p>
        </div>
        <Button
          id="create-staff-btn"
          variant="primary"
          className="d-flex align-items-center gap-2 px-4 py-2"
          style={{ flexShrink: 0 }}
          onClick={openModal}
        >
          <Plus size={20} /> New Staff Account
        </Button>
      </div>

      {/* ── Stat Cards ── */}
      <Row className="g-3 mb-4">
        {[
          { label: 'Staff Members', count: staffCount, icon: <UserCheck size={22} />, color: '#2DD4BF', bg: 'rgba(45,212,191,0.1)' },
          { label: 'Administrators', count: adminCount, icon: <Shield size={22} />, color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
          { label: 'Customer Accounts', count: userCount, icon: <UserIcon size={22} />, color: '#60A5FA', bg: 'rgba(96,165,250,0.1)' },
          { label: 'Total Users', count: users.length, icon: <Users size={22} />, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
        ].map(({ label, count, icon, color, bg }) => (
          <Col xs={6} md={3} key={label}>
            <div className="glass-card p-4 text-center h-100" style={{ borderRadius: '16px' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: bg, color, margin: '0 auto 12px'
              }}>
                {icon}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color, lineHeight: 1 }}>{count}</div>
              <div className="text-muted small mt-1" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* ── Filters ── */}
      <div className="glass-card p-4 mb-4" style={{ borderRadius: '16px' }}>
        <Row className="g-3 align-items-center">
          <Col md={6}>
            <Form.Control
              id="user-search"
              placeholder="🔍  Search by username..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', borderRadius: '10px' }}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              id="role-filter"
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', borderRadius: '10px' }}
            >
              <option value="ALL">All Roles</option>
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </Form.Select>
          </Col>
          <Col md={2} className="text-end">
            <Button variant="link" className="text-muted p-2 d-flex align-items-center gap-2 ms-auto text-decoration-none" onClick={fetchUsers}>
              <RefreshCw size={16} /> Refresh
            </Button>
          </Col>
        </Row>
      </div>

      {/* ── Table ── */}
      <div className="glass-card p-4" style={{ borderRadius: '20px' }}>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: '#2DD4BF' }} />
            <p className="text-muted mt-3 small">Loading accounts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <UserX size={48} className="text-muted mb-3" style={{ opacity: 0.4 }} />
            <p className="text-muted">No users found matching your filters.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table className="mb-0 text-white" style={{ borderCollapse: 'separate', borderSpacing: '0 6px' }}>
              <thead>
                <tr>
                  <th style={{ color: '#64748B', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <UserIcon size={12} className="me-1" /> Username
                  </th>
                  <th style={{ color: '#64748B', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <Shield size={12} className="me-1" /> Role
                  </th>
                  <th style={{ color: '#64748B', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    Joined
                  </th>
                  <th className="text-end" style={{ color: '#64748B', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id} style={{ background: 'rgba(15,23,42,0.5)' }}>
                    <td style={{ borderRadius: '10px 0 0 10px', padding: '14px 20px', fontWeight: 600 }}>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: roleStyle(user.role).background,
                          color: roleStyle(user.role).color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.85rem', fontWeight: 700, flexShrink: 0
                        }}>
                          {user.username[0].toUpperCase()}
                        </div>
                        {user.username}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <Form.Select
                        size="sm"
                        value={user.role}
                        onChange={e => handleRoleUpdate(user.id, e.target.value)}
                        style={{
                          ...roleStyle(user.role),
                          border: `1px solid ${roleStyle(user.role).color}44`,
                          borderRadius: '8px', fontWeight: 600,
                          fontSize: '0.8rem', cursor: 'pointer',
                          width: 'auto', paddingRight: '2rem'
                        }}
                      >
                        {ROLES.map(r => (
                          <option key={r.value} value={r.value} style={{ background: '#0F172A', color: '#fff' }}>
                            {r.label}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#64748B', fontSize: '0.875rem' }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td style={{ borderRadius: '0 10px 10px 0', padding: '14px 20px', textAlign: 'right' }}>
                      <Button
                        id={`delete-user-${user.id}`}
                        variant="link"
                        className="p-2"
                        onClick={() => handleDelete(user.id, user.username)}
                        style={{
                          color: '#F43F5E', background: 'rgba(244,63,94,0.1)',
                          border: '1px solid rgba(244,63,94,0.2)', borderRadius: '8px',
                          transition: 'all 0.2s'
                        }}
                        title="Delete user"
                      >
                        <Trash2 size={15} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* ── Create Staff Modal ── */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        contentClassName="border-0 text-white"
        dialogClassName="modal-md"
      >
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 80px -12px rgba(0,0,0,0.8)'
        }}>
          {/* Modal Header */}
          <div style={{
            padding: '28px 32px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: '14px'
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(45,212,191,0.15)', color: '#2DD4BF',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <KeyRound size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem', color: '#F8FAFC' }}>
                Create Staff Account
              </h5>
              <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
                Issue login credentials for a new team member
              </p>
            </div>
            <button
              onClick={closeModal}
              style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: '#64748B', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1
              }}
            >×</button>
          </div>

          {/* Modal Body */}
          <Form onSubmit={handleSubmit}>
            <div style={{ padding: '28px 32px' }}>

              {/* Username */}
              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Username
                </Form.Label>
                <Form.Control
                  id="new-username"
                  name="username"
                  autoComplete="off"
                  placeholder="e.g. john_reception"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '12px', color: '#F8FAFC',
                    padding: '12px 16px', fontSize: '0.95rem'
                  }}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0" style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Password
                  </Form.Label>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    style={{
                      background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)',
                      color: '#2DD4BF', borderRadius: '8px', fontSize: '0.72rem',
                      padding: '3px 10px', cursor: 'pointer', fontWeight: 600, letterSpacing: '0.04em'
                    }}
                  >
                    ⚡ Auto-generate
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    id="new-password"
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: '12px', color: '#F8FAFC',
                      padding: '12px 48px 12px 16px', fontSize: '0.95rem',
                      fontFamily: showPw ? 'monospace' : 'inherit', letterSpacing: showPw ? '0.1em' : 'normal'
                    }}
                  />
                  <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
                    <CopyBtn text={formData.password} />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '2px 6px' }}
                      title={showPw ? 'Hide password' : 'Show password'}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <p className="mt-2 mb-0" style={{ color: '#64748B', fontSize: '0.75rem' }}>
                  💡 Share these credentials securely with the staff member.
                </p>
              </Form.Group>

              {/* Role */}
              <Form.Group>
                <Form.Label style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Role
                </Form.Label>
                <div className="d-flex gap-3 mt-2 flex-wrap">
                  {ROLES.map(r => (
                    <label
                      key={r.value}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                        padding: '10px 16px', borderRadius: '10px', flex: 1,
                        border: formData.role === r.value
                          ? `1.5px solid ${r.color}`
                          : '1.5px solid rgba(255,255,255,0.07)',
                        background: formData.role === r.value ? r.bg : 'rgba(255,255,255,0.02)',
                        transition: 'all 0.2s',
                        color: formData.role === r.value ? r.color : '#94A3B8',
                        fontWeight: 600, fontSize: '0.82rem'
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r.value}
                        checked={formData.role === r.value}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                      {formData.role === r.value
                        ? <Check size={14} />
                        : <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #334155' }} />
                      }
                      {r.label}
                    </label>
                  ))}
                </div>
              </Form.Group>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '20px 32px 28px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'flex-end', gap: '12px'
            }}>
              <Button
                variant="link"
                onClick={closeModal}
                className="text-decoration-none"
                style={{ color: '#64748B', fontWeight: 600 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                id="submit-create-staff"
                disabled={submitting}
                style={{
                  background: 'linear-gradient(135deg, #2DD4BF, #3B82F6)',
                  border: 'none', borderRadius: '12px',
                  padding: '10px 28px', fontWeight: 700,
                  boxShadow: '0 8px 20px -4px rgba(45,212,191,0.4)'
                }}
              >
                {submitting
                  ? <><Spinner size="sm" className="me-2" />Creating...</>
                  : <><UserCheck size={16} className="me-2" />Create Account</>
                }
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

    </Container>
  );
};

export default ManageUsers;
