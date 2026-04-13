import React from 'react';

export default function TenantDashboard() {
  return (
    <div className="container-fluid p-0" style={{ maxWidth: '1200px' }}>
      
      {/* WELCOME BANNER (Bonus UI element para mas personalized) */}
      <div className="mb-4 d-flex justify-content-between align-items-end">
        <div>
           <h3 className="fw-bold text-dark mb-1">Welcome back, User!</h3>
           <p className="text-muted m-0" style={{ fontSize: '14px' }}>Here is the summary of your rental account.</p>
        </div>
       
        
      </div>

      {/* TOP 3 SUMMARY CARDS (Based on your initial code but upgraded) */}
      <div className="row g-4 mb-5">
        {/* Rent Status Card */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm border-0 rounded-4 h-100 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="text-muted fw-semibold m-0" style={{ fontSize: '13px' }}>Rent Status</h6>
              <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle d-flex align-items-center justify-content-center">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
            <h3 className="fw-bolder text-dark mb-0">Up to date</h3>
            <p className="text-success fw-medium mt-1 mb-0" style={{ fontSize: '12px' }}>Paid for current month</p>
          </div>
        </div>

        {/* My Unit Card */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm border-0 rounded-4 h-100 d-flex flex-column justify-content-center">
             <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="text-muted fw-semibold m-0" style={{ fontSize: '13px' }}>Assigned Unit</h6>
              <div className="bg-info bg-opacity-10 text-info p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ color: '#0ea5e9' }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              </div>
            </div>
            <h3 className="fw-bolder text-dark mb-0">Unit 3B</h3>
            <p className="text-muted fw-medium mt-1 mb-0" style={{ fontSize: '12px' }}>Lease ends Dec 2026</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm border-0 rounded-4 h-100 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="text-muted fw-semibold m-0" style={{ fontSize: '13px' }}>Outstanding Balance</h6>
              <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-circle d-flex align-items-center justify-content-center">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
            </div>
            <h3 className="fw-bolder text-dark mb-0">₱0.00</h3>
            <p className="text-muted fw-medium mt-1 mb-0" style={{ fontSize: '12px' }}>No pending payments</p>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY SECTION (To make dashboard look full) */}
      <h5 className="fw-bold text-dark mb-3">Recent Activity</h5>
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0" style={{ fontSize: '14px' }}>
            <thead className="bg-light">
              <tr>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Date</th>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Description</th>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Amount</th>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-bottom-0 border-top">April 5, 2026</td>
                <td className="px-4 py-3 border-bottom-0 border-top fw-semibold text-dark">Monthly Rent - April</td>
                <td className="px-4 py-3 border-bottom-0 border-top">₱8,000.00</td>
                <td className="px-4 py-3 border-bottom-0 border-top">
                  <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Paid</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-bottom-0 border-top">March 5, 2026</td>
                <td className="px-4 py-3 border-bottom-0 border-top fw-semibold text-dark">Monthly Rent - March</td>
                <td className="px-4 py-3 border-bottom-0 border-top">₱8,000.00</td>
                <td className="px-4 py-3 border-bottom-0 border-top">
                  <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}