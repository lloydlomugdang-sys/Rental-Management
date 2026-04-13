import React, { useState } from 'react';

// Mock Data para sa Help & Reports
const initialReports = [
  {
    id: 1,
    title: 'Incorrect billing amount',
    category: 'Payment',
    date: 'May 15, 2026',
    status: 'Reviewed',
  },
  {
    id: 2,
    title: 'Water pressure issue',
    category: 'Maintenance',
    date: 'Apr 28, 2026',
    status: 'Resolved',
  },
  {
    id: 3,
    title: 'Noisy neighbor complaint',
    category: 'Other',
    date: 'Apr 10, 2026',
    status: 'Pending',
  }
];

export default function HelpReports() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function para sa kulay ng badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Reviewed':
        return 'bg-info bg-opacity-10 text-info border border-info border-opacity-25';
      case 'Resolved':
        return 'bg-success bg-opacity-25 text-success';
      case 'Pending':
        return 'bg-warning bg-opacity-25 text-warning';
      default:
        return 'bg-secondary bg-opacity-25 text-secondary';
    }
  };

  // Helper function para sa icons sa gilid
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Reviewed':
        return (
          <div className="bg-info bg-opacity-10 text-info p-2 rounded-circle d-flex align-items-center justify-content-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
        );
      case 'Resolved':
        return (
          <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle d-flex align-items-center justify-content-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
        );
      case 'Pending':
        return (
          <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle d-flex align-items-center justify-content-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid p-0 position-relative" style={{ maxWidth: '1000px' }}>
      
      {/* HEADER WITH BUTTON */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Help & Reports
        </h4>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn text-white px-4 py-2 rounded-pill shadow-sm fw-semibold d-flex align-items-center gap-2" 
          style={{ backgroundColor: '#0ea5e9', fontSize: '14px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Report a Problem
        </button>
      </div>

      {/* REPORTS LIST */}
      <div className="d-flex flex-column gap-3">
        {initialReports.map((report) => (
          <div key={report.id} className="card border p-4 rounded-4 shadow-sm bg-white hover-bg-light transition-all">
            <div className="d-flex justify-content-between align-items-center">
              
              <div className="d-flex align-items-center gap-3">
                {/* Icon */}
                {getStatusIcon(report.status)}
                
                {/* Text Details */}
                <div>
                  <h6 className="fw-bold text-dark m-0" style={{ fontSize: '15px' }}>{report.title}</h6>
                  <p className="text-muted m-0 mt-1" style={{ fontSize: '13px' }}>
                    {report.category} · {report.date}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`badge rounded-pill px-3 py-1 ${getStatusBadge(report.status)}`} style={{ fontSize: '12px', fontWeight: '600' }}>
                  {report.status}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ==================================================== */}
      {/* MODAL / POP-UP FOR NEW REPORT */}
      {/* ==================================================== */}
      {isModalOpen && (
        <div 
          className="d-flex align-items-center justify-content-center min-vh-100 bg-dark bg-opacity-50 m-0 p-0" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000 }}
        >
          <div 
            className="card bg-white border-0 shadow-lg p-4 p-md-5" 
            style={{ width: '100%', maxWidth: '500px', borderRadius: '16px' }}
          >
            {/* Modal Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h5 className="fw-bold text-dark m-0">Report a Problem</h5>
                <p className="text-muted m-0 mt-1" style={{ fontSize: '13px' }}>Describe the issue and select a category.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="btn btn-link text-muted p-0"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Form */}
            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>Title</label>
                <input 
                  type="text" 
                  className="form-control shadow-none py-2 border-primary" 
                  placeholder="e.g. Billing issue" 
                  style={{ fontSize: '14px', borderRadius: '8px' }}
                  autoFocus
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>Category</label>
                <select 
                  className="form-select shadow-none py-2" 
                  style={{ fontSize: '14px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <option defaultValue>Select category</option>
                  <option value="payment">Payment & Billing</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="noise">Noise Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>Description</label>
                <textarea 
                  className="form-control shadow-none py-2" 
                  placeholder="Describe the issue in detail..." 
                  rows="4"
                  style={{ fontSize: '14px', borderRadius: '8px', resize: 'none' }}
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn btn-light fw-semibold px-4 rounded-pill border" 
                  style={{ fontSize: '14px' }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn text-white fw-semibold px-4 rounded-pill shadow-sm" 
                  style={{ backgroundColor: '#0ea5e9', fontSize: '14px' }}
                >
                  Submit Report
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}