import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, Download, Building2, User, CreditCard, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../services/api';

const Billing = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const invoiceRef = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/reservations/${id}`)
      .then(res => setReservation(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  if (!reservation) return (
    <Container className="text-center py-5">
      <h2 className="text-white mb-4">Dossier Not Found</h2>
      <Button onClick={() => navigate('/reservations')} className="btn-primary">Return to Matrix</Button>
    </Container>
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!invoiceRef.current) return;

    setExporting(true);
    try {
      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a0a0b' // Match theme background
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_RES_${reservation.id}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Failed to generate PDF. Please try printing to PDF instead.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Container className="py-5 invoice-container">
      <div className="d-flex justify-content-between align-items-center mb-5 no-print">
        <button onClick={() => navigate(-1)} className="btn btn-outline-light rounded-circle p-3 glass-card">
          <ArrowLeft size={20} />
        </button>
        <div className="d-flex gap-3">
          <Button variant="outline-light" onClick={handlePrint} className="glass-card d-flex align-items-center gap-2 px-4">
            <Printer size={18} /> Print
          </Button>
          <Button
            className="btn-primary d-flex align-items-center gap-2 px-4"
            onClick={handleExportPDF}
            disabled={exporting}
          >
            {exporting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <Download size={18} />
            )}
            {exporting ? 'Generating...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      <div ref={invoiceRef} className="glass-card p-5 overflow-hidden">
        <div className="d-flex justify-content-between align-items-start mb-5 pb-4 border-bottom border-light border-opacity-10">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Badge className="badge-primary">FINANCIAL RECORD</Badge>
              <span className="text-muted small">#{reservation.id.toString().padStart(6, '0')}</span>
            </div>
            <h1 className="display-4 fw-bold mb-0">Invoice</h1>
            <p className="text-muted mt-2">Date of Issue: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center gap-2 justify-content-end mb-2">
              <Building2 size={24} className="text-primary" />
              <h3 className="h4 mb-0" style={{ letterSpacing: '0.1em' }}>OCEAN VIEW</h3>
            </div>
            <p className="text-muted small">Intelligence Resort Management<br />Suite 101, Paradise Bay</p>
          </div>
        </div>

        <Row className="mb-5 g-4">
          <Col md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <User size={16} className="text-primary" />
              <span className="text-muted small fw-bold text-uppercase">Recipient Dossier</span>
            </div>
            <h4 className="text-white mb-1">{reservation.guest.firstName} {reservation.guest.lastName}</h4>
            <p className="text-muted mb-1">{reservation.guest.email}</p>
            <p className="text-muted mb-0">{reservation.guest.phone}</p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex align-items-center gap-2 justify-content-end mb-3">
              <CreditCard size={16} className="text-primary" />
              <span className="text-muted small fw-bold text-uppercase">Financial Status</span>
            </div>
            <h4 className="text-white mb-1">Due Upon Checkout</h4>
            <div className="badge-warning badge mt-2">PENDING SETTLEMENT</div>
          </Col>
        </Row>

        <div className="table-responsive table-container mb-5">
          <Table className="mb-0">
            <thead>
              <tr>
                <th>Description</th>
                <th className="text-center">Timeline</th>
                <th className="text-end">Unit Rate</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="fw-bold text-white">Suite {reservation.room.roomNumber} — {reservation.room.roomType.charAt(0) + reservation.room.roomType.slice(1).toLowerCase()}</div>
                  <div className="small text-muted">Premium ocean-front inventory access</div>
                </td>
                <td className="text-center">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <Calendar size={14} className="text-muted" />
                    <span className="text-white">{new Date(reservation.checkInDate).toLocaleDateString()} — {new Date(reservation.checkOutDate).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="text-end text-white">${reservation.room.pricePerNight} / night</td>
                <td className="text-end text-white fw-bold">${reservation.totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-end">
          <div className="glass-card p-4" style={{ minWidth: '320px', background: 'rgba(255,255,255,0.02)' }}>
            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Gross Subtotal</span>
              <span className="text-white">${reservation.totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-4 text-muted">
              <span>Operational Surcharge (0%)</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="d-flex justify-content-between pt-4 border-top border-light border-opacity-10">
              <span className="h4 mb-0 text-white">Total Commitment</span>
              <span className="h4 mb-0 text-primary">${reservation.totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 text-center border-top border-light border-opacity-10">
          <p className="text-muted mb-0">System Generated Transcript Reference #RES-{reservation.id}</p>
          <p className="small text-muted opacity-50">Verified by Ocean View Intelligence Protocol</p>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: #1a1a1a !important; }
          .glass-card { 
            background: white !important; 
            box-shadow: none !important; 
            border: 1px solid #dee2e6 !important;
            backdrop-filter: none !important;
            color: #1a1a1a !important;
          }
          .display-4, h1, h2, h3, h4, .text-white, .text-primary { 
            background: none !important;
            -webkit-text-fill-color: initial !important;
            color: black !important;
          }
          .table { color: black !important; }
          .badge { border: 1px solid #1a1a1a !important; color: black !important; }
        }
      `}</style>
    </Container>
  );
};

export default Billing;
