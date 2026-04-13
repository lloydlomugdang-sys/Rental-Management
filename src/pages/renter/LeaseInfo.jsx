import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaFileAlt, FaHome, FaMoneyBill, FaCalendarAlt, 
  FaUserTie, FaRegClock, FaFilePdf, FaDownload 
} from 'react-icons/fa';

export default function LeaseInfo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/dashboard/tenant', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.dashboard);
      } catch (err) {
        console.error("Error fetching lease info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaseData();
  }, []);

  if (loading) return <div className="p-5 text-center text-muted">Loading lease details...</div>;

  const lease = data?.lease;
  const nextPayment = data?.payments?.recent?.find(p => p.status === 'pending' || p.status === 'overdue');

  return (
    <div className="p-4 bg-light min-vh-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Lease Details</h2>
        <p className="text-muted small">Review your current lease agreement and property guidelines.</p>
      </div>

      {/* MAIN LEASE INFORMATION CARD */}
      <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '12px' }}>
        <div className="d-flex align-items-center gap-2 mb-4 text-primary">
          <FaFileAlt />
          <h5 className="fw-bold mb-0">Lease Information</h5>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <small className="text-muted d-block mb-1">Assigned Unit</small>
            <h5 className="fw-bold mb-0">{lease?.unitId?.unitNumber || 'N/A'}</h5>
          </div>
          <div className="col-md-6">
            <small className="text-muted d-block mb-1">Monthly Rent</small>
            <h5 className="fw-bold mb-0">₱{lease?.unitId?.price?.toLocaleString() || '0'}<small className="text-muted fw-normal" style={{ fontSize: '14px' }}>/month</small></h5>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaCalendarAlt className="text-muted" size={14} />
              <small className="text-muted">Lease Period</small>
            </div>
            <h6 className="fw-semibold mb-0">
              {new Date(lease?.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {new Date(lease?.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </h6>
          </div>
          <div className="col-md-6">
            <small className="text-muted d-block mb-1">Status</small>
            <span className="badge rounded-pill px-3 py-2 bg-success-subtle text-success" style={{ fontSize: '12px' }}>
              {lease?.status ? lease.status.charAt(0).toUpperCase() + lease.status.slice(1) : 'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* THREE SUB-CARDS */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '12px' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-info">
              <FaMoneyBill />
              <small className="fw-bold text-dark">Security Deposit</small>
            </div>
            <h4 className="fw-bold mb-1">₱{lease?.securityDeposit?.toLocaleString() || '0'}</h4>
            <small className="text-muted" style={{ fontSize: '11px' }}>Fully paid upon move-in</small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '12px' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-primary">
              <FaUserTie />
              <small className="fw-bold text-dark">Property Manager</small>
            </div>
            <h6 className="fw-bold mb-1">Admin Office</h6>
            <small className="text-muted" style={{ fontSize: '12px' }}>0912 345 6789</small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '12px' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-info">
              <FaRegClock />
              <small className="fw-bold text-dark">Next Payment Due</small>
            </div>
            <h6 className="fw-bold mb-1">
              {nextPayment ? new Date(nextPayment.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'No pending dues'}
            </h6>
            <small className="text-muted" style={{ fontSize: '11px' }}>Please pay on or before the date.</small>
          </div>
        </div>
      </div>

      {/* LEASE DOCUMENTS */}
      <div className="mb-4">
        <h5 className="fw-bold mb-1">Lease Documents</h5>
        <p className="text-muted small">Download or view your official lease agreement and property rules.</p>
      </div>

      <div className="d-flex flex-column gap-2">
        {/* DOC 1 */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
          <div className="card-body d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-danger-subtle p-2 rounded">
                <FaFilePdf className="text-danger" size={20} />
              </div>
              <div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '14px' }}>Signed_Lease_Agreement_2025.pdf</h6>
                <small className="text-muted" style={{ fontSize: '12px' }}>PDF • 2.4 MB</small>
              </div>
            </div>
            <button className="btn btn-outline-secondary btn-sm rounded-pill px-4">
              Download <FaDownload size={12} className="ms-1" />
            </button>
          </div>
        </div>

        {/* DOC 2 */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
          <div className="card-body d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-danger-subtle p-2 rounded">
                <FaFilePdf className="text-danger" size={20} />
              </div>
              <div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '14px' }}>Property_Rules_and_Guidelines.pdf</h6>
                <small className="text-muted" style={{ fontSize: '12px' }}>PDF • 1.1 MB</small>
              </div>
            </div>
            <button className="btn btn-outline-secondary btn-sm rounded-pill px-4">
              Download <FaDownload size={12} className="ms-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}