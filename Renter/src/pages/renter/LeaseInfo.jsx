import React from 'react';

export default function LeaseInfo() {
  return (
    <div className="container-fluid p-0" style={{ maxWidth: '1000px' }}>
      
      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark mb-1">Lease Details</h3>
        <p className="text-muted m-0" style={{ fontSize: '14px' }}>Review your current lease agreement and property guidelines.</p>
      </div>

      {/* 1. MAIN LEASE INFORMATION CARD (From Lovable Reference) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
        <h5 className="fw-bold text-dark d-flex align-items-center gap-2 mb-4" style={{ fontSize: '18px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Lease Information
        </h5>
        
        <div className="row g-4">
          <div className="col-md-6">
            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Assigned Unit</p>
            <p className="fw-bold text-dark mb-0" style={{ fontSize: '18px' }}>Unit 3B</p>
          </div>
          <div className="col-md-6">
            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Monthly Rent</p>
            <p className="fw-bold text-dark mb-0" style={{ fontSize: '20px' }}>₱8,000<span className="fw-normal text-muted" style={{ fontSize: '14px' }}>/month</span></p>
          </div>
          <div className="col-md-6">
            <p className="text-muted mb-1 d-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Lease Period
            </p>
            <p className="text-dark fw-medium mb-0" style={{ fontSize: '15px' }}>Jan 2025 — Dec 2026</p>
          </div>
          <div className="col-md-6">
            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Status</p>
            <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3 py-2" style={{ fontSize: '13px', fontWeight: '600' }}>Active</span>
          </div>
        </div>
      </div>

      {/* 2. THE THREE SMALL BOXES (From Wireframe) */}
      <div className="row g-3 mb-4">
        {/* Security Deposit */}
        <div className="col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm h-100 bg-white">
            <div className="d-flex align-items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              <h6 className="fw-bold text-dark m-0" style={{ fontSize: '14px' }}>Security Deposit</h6>
            </div>
            <h4 className="fw-bolder text-dark mb-1">₱8,000</h4>
            <p className="text-muted m-0" style={{ fontSize: '12px' }}>Fully paid upon move-in</p>
          </div>
        </div>
        
        {/* Landlord Contact */}
        <div className="col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm h-100 bg-white">
             <div className="d-flex align-items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <h6 className="fw-bold text-dark m-0" style={{ fontSize: '14px' }}>Property Manager</h6>
            </div>
            <h6 className="fw-bolder text-dark mb-1">Admin Office</h6>
            <p className="text-muted m-0" style={{ fontSize: '12px' }}>0912 345 6789</p>
          </div>
        </div>

        {/* Next Payment Target */}
        <div className="col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm h-100 bg-white">
             <div className="d-flex align-items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <h6 className="fw-bold text-dark m-0" style={{ fontSize: '14px' }}>Next Payment Due</h6>
            </div>
            <h6 className="fw-bolder text-dark mb-1">May 5, 2026</h6>
            <p className="text-muted m-0" style={{ fontSize: '12px' }}>Please pay on or before the date.</p>
          </div>
        </div>
      </div>

      {/* 3. THE LARGE BOTTOM BOX (From Wireframe) - Important Documents */}
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-4">
        <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '16px' }}>Lease Documents</h5>
        <p className="text-muted mb-4" style={{ fontSize: '13px' }}>Download or view your official lease agreement and property rules.</p>
        
        <div className="d-flex flex-column gap-3">
          {/* Document Item 1 */}
          <div className="d-flex justify-content-between align-items-center p-3 border rounded-3 bg-light">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white p-2 rounded shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <h6 className="fw-semibold text-dark m-0" style={{ fontSize: '14px' }}>Signed_Lease_Agreement_2025.pdf</h6>
                <span className="text-muted" style={{ fontSize: '12px' }}>PDF • 2.4 MB</span>
              </div>
            </div>
            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 fw-semibold" style={{ fontSize: '12px' }}>
              Download
            </button>
          </div>

          {/* Document Item 2 */}
          <div className="d-flex justify-content-between align-items-center p-3 border rounded-3 bg-light">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white p-2 rounded shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <h6 className="fw-semibold text-dark m-0" style={{ fontSize: '14px' }}>Property_Rules_and_Guidelines.pdf</h6>
                <span className="text-muted" style={{ fontSize: '12px' }}>PDF • 1.1 MB</span>
              </div>
            </div>
            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 fw-semibold" style={{ fontSize: '12px' }}>
              Download
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}