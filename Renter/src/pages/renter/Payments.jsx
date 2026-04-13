import React, { useState } from 'react';

export default function Payments() {
  return (
    <div className="container-fluid p-0" style={{ maxWidth: '1000px' }}>
      
      <div className="mb-4">
        <h3 className="fw-bold text-dark mb-1">Payments</h3>
        <p className="text-muted m-0" style={{ fontSize: '14px' }}>View your payment history and submit new payment receipts.</p>
      </div>

      {/* 1. SUMMARY CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm h-100">
            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Total Paid</p>
            <h3 className="fw-bolder text-dark mb-0">₱25,000</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm h-100">
            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Remaining Balance</p>
            <h3 className="fw-bolder text-dark mb-0">₱35,000</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-center">
            <p className="text-muted mb-2" style={{ fontSize: '13px' }}>Payment Status</p>
            <div>
              <span className="badge bg-warning bg-opacity-25 text-warning rounded-pill px-3 py-2" style={{ fontSize: '13px', fontWeight: '600' }}>Partially Paid</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PAYMENT HISTORY TABLE */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
        <div className="p-4 border-bottom bg-white">
          <h6 className="fw-bold mb-0 text-dark">Payment History</h6>
        </div>
        <div className="table-responsive bg-white">
          <table className="table table-hover mb-0" style={{ fontSize: '14px' }}>
            <thead className="bg-light">
              <tr>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Date</th>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Amount</th>
                <th className="fw-medium px-4 py-3 border-0 text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-bottom-0 border-top">May 1, 2026</td>
                <td className="px-4 py-3 border-bottom-0 border-top fw-semibold">₱5,000</td>
                <td className="px-4 py-3 border-bottom-0 border-top">
                  <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Paid</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-bottom-0 border-top">Apr 1, 2026</td>
                <td className="px-4 py-3 border-bottom-0 border-top fw-semibold">₱5,000</td>
                <td className="px-4 py-3 border-bottom-0 border-top">
                  <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Paid</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-bottom-0 border-top">Mar 1, 2026</td>
                <td className="px-4 py-3 border-bottom-0 border-top fw-semibold">₱5,000</td>
                <td className="px-4 py-3 border-bottom-0 border-top">
                  <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. UPLOAD RECEIPT SECTION (From Wireframe) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <h5 className="fw-bold text-dark mb-2">Upload Receipt</h5>
        <p className="text-muted mb-4" style={{ fontSize: '13px' }}>Submit a screenshot or PDF of your payment receipt for verification.</p>
        
        <form className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>Amount Paid</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted fw-semibold px-3">₱</span>
              <input type="number" className="form-control border-start-0 bg-light shadow-none py-2" placeholder="0.00" />
            </div>
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>Reference Number</label>
            <input type="text" className="form-control bg-light shadow-none py-2" placeholder="e.g. GCash Ref No." />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold text-dark" style={{ fontSize: '13px' }}>Proof of Payment</label>
            
            {/* Modern Drag & Drop Style File Input */}
            <div className="border border-2 border-dashed rounded-3 p-5 text-center bg-light position-relative" style={{ borderColor: '#e2e8f0' }}>
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" className="mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
               <p className="m-0 fw-semibold text-dark" style={{ fontSize: '14px' }}>Click to upload or drag and drop</p>
               <p className="text-muted mt-1 mb-0" style={{ fontSize: '12px' }}>SVG, PNG, JPG or PDF (max. 5MB)</p>
               
               {/* Hidden actual file input that triggers when clicking the box */}
               <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className="col-12 text-end mt-4">
            <button type="submit" className="btn text-white px-5 py-2 rounded-pill fw-bold shadow-sm" style={{ backgroundColor: '#0ea5e9', fontSize: '14px' }}>
              Submit Payment
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}