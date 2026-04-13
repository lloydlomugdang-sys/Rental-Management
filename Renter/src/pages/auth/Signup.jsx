import React from 'react';
import { Link } from 'react-router-dom';
import rentixLogo from '../../assets/RentixLogo.jpg';
import rentixName from '../../assets/RentixName.jpg';

export default function Signup() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white m-0 p-0" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom w-100">
        
        {/* 2. DITO NATIN ILALAGAY YUNG LOGO MISMO */}
        <div className="d-flex align-items-center gap-2">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <img
              src={rentixLogo}
              alt="Rentix Logo"
              style={{ width: '30px', height: '30px', objectFit: 'contain' }}
            />
            <img
              src={rentixName}
              alt="Rentix Name"
              style={{ height: '18px', objectFit: 'contain' }}
            />
          </Link>
        </div>
        
        <div className="d-flex align-items-center gap-4 text-muted" style={{ fontSize: '14px' }}>
         <Link to="/browse" className="text-decoration-none text-muted fw-semibold hover-primary">Browse</Link>
          <span style={{ cursor: 'pointer' }}>Contact Us</span>
          <Link to="/login" className="btn btn-outline-secondary px-3 py-1 rounded-pill" style={{ fontSize: '13px' }}>
            Sign In
          </Link>
        </div>
      </header>

      {/* MAIN FORM AREA */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center bg-light w-100 py-5">
        <div 
          className="card bg-white border-0 p-4 p-md-5" 
          style={{ width: '100%', maxWidth: '450px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
        >
          <h2 className="text-center fw-bold text-dark mb-1" style={{ fontSize: '24px' }}>Create Account</h2>
          <p className="text-center text-muted mb-4" style={{ fontSize: '13px' }}>
            Join Rentix to simplify your rental experience
          </p>

          <form>
            {/* Full Name */}
            <div className="mb-3">
              <label className="text-start d-block fw-semibold text-dark mb-1" style={{ fontSize: '12px' }}>Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                <input type="text" className="form-control border-start-0 shadow-none py-2 px-0" placeholder="Name" style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-3">
              <label className="text-start d-block fw-semibold text-dark mb-1" style={{ fontSize: '12px' }}>Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <input type="email" className="form-control border-start-0 shadow-none py-2 px-0" placeholder="name@gmail.com" style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
              </div>
            </div>

            {/* Contact Number */}
            <div className="mb-3">
              <label className="text-start d-block fw-semibold text-dark mb-1" style={{ fontSize: '12px' }}>Contact Number</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <input type="tel" className="form-control border-start-0 shadow-none py-2 px-0" placeholder="09123456789" style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="text-start d-block fw-semibold text-dark mb-1" style={{ fontSize: '12px' }}>Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input type="password" className="form-control border-start-0 shadow-none py-2 px-0" placeholder="••••••••" style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="text-start d-block fw-semibold text-dark mb-1" style={{ fontSize: '12px' }}>Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input type="password" className="form-control border-start-0 shadow-none py-2 px-0" placeholder="••••••••" style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
              </div>
            </div>
            
            {/* Create Account Button */}
            <button 
              type="submit" 
              className="btn w-100 py-2 text-white fw-bold border-0 shadow-sm"
              style={{ backgroundColor: '#0ea5e9', borderRadius: '8px', fontSize: '14px' }}
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4" style={{ fontSize: '13px' }}>
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#0ea5e9' }}>
              Login
            </Link>
          </div>
          
        </div>
      </main>
    </div>
  );
}