import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Payments() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form States para sa Upload
  const [amountPaid, setAmountPaid] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/dashboard/tenant', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.dashboard);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic para sa pag-send sa backend (ihahanda natin sa susunod)
    alert(`Submitting Payment: ₱${amountPaid} | Ref: ${refNumber}`);
  };

  if (loading) return <div className="p-5 text-center text-muted">Loading payment details...</div>;

  return (
    <div className="p-4 bg-light min-vh-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Payments</h2>
        <p className="text-muted small">View your payment history and submit new payment receipts.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 text-center text-md-start">
            <small className="text-muted d-block mb-2">Total Paid</small>
            <h3 className="fw-bold mb-0">₱{data?.payments?.totalPaid?.toLocaleString() || '0'}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 text-center text-md-start">
            <small className="text-muted d-block mb-2">Remaining Balance</small>
            <h3 className="fw-bold mb-0">₱{(data?.lease?.unitId?.price * 12 - data?.payments?.totalPaid)?.toLocaleString() || '0'}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 text-center text-md-start">
            <small className="text-muted d-block mb-2">Payment Status</small>
            <span className={`badge rounded-pill px-3 py-2 ${data?.payments?.overdue > 0 ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`} style={{ width: 'fit-content' }}>
              {data?.payments?.overdue > 0 ? 'Overdue' : 'Partially Paid'}
            </span>
          </div>
        </div>
      </div>

      {/* PAYMENT HISTORY */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">Payment History</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="text-muted small">
                <tr>
                  <th className="border-0">DATE</th>
                  <th className="border-0">AMOUNT</th>
                  <th className="border-0">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {data?.payments?.recent?.length > 0 ? (
                  data.payments.recent.map((payment) => (
                    <tr key={payment._id}>
                      <td className="py-3 fw-medium">{new Date(payment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="py-3 fw-bold">₱{payment.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-1 ${payment.status === 'verified' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                          {payment.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="text-center py-4 text-muted small">No payment records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UPLOAD RECEIPT FORM */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-1">Upload Receipt</h5>
          <p className="text-muted small mb-4">Submit a screenshot or PDF of your payment receipt for verification.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="small fw-semibold mb-2">Amount Paid</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">₱</span>
                  <input 
                    type="number" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="0.00"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="small fw-semibold mb-2">Reference Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. GCash Ref No."
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="small fw-semibold mb-2">Proof of Payment</label>
              <div 
                className="border rounded-3 p-5 text-center bg-light" 
                style={{ borderStyle: 'dashed !important', cursor: 'pointer' }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input 
                  type="file" 
                  id="fileInput" 
                  className="d-none" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0ea5e9" className="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                </div>
                <p className="fw-semibold mb-1 small">Click to upload or drag and drop</p>
                <p className="text-muted extra-small" style={{ fontSize: '11px' }}>
                  {file ? `Selected: ${file.name}` : 'SVG, PNG, JPG or PDF (max. 5MB)'}
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" style={{ backgroundColor: '#0ea5e9', border: 'none', borderRadius: '8px' }}>
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}