import React from 'react';
import { Link } from 'react-router-dom';
import rentixLogo from '../../assets/RentixLogo.jpg';
import rentixName from '../../assets/RentixName.jpg';

export default function Login() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white m-0 p-0" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER (Same format as Signup) */}
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
          {/* Link points to Signup page instead */}
          <Link to="/signup" className="btn btn-outline-secondary px-3 py-1 rounded-pill" style={{ fontSize: '13px' }}>
            Sign Up
          </Link>
        </div>
      </header>

      {/* MAIN FORM AREA */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center bg-light w-100 py-5">
        <div 
          className="card bg-white border-0 p-4 p-md-5" 
          style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
        >
          <h2 className="text-center fw-bold text-dark mb-1" style={{ fontSize: '24px' }}>Welcome Back</h2>
          <p className="text-center text-muted mb-4" style={{ fontSize: '13px' }}>
            Sign in to manage your properties
          </p>

          <form>
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

            {/* Password */}
            <div className="mb-2">
              <label className="text-start d-block fw-semibold text-dark mb-1" style={{ fontSize: '12px' }}>Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input type="password" className="form-control border-start-0 shadow-none py-2 px-0" placeholder="••••••••" style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-end mb-4">
              <a href="#" className="text-decoration-none" style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: '500' }}>
                Forgot password?
              </a>
            </div>
            
            {/* Login Button */}
            <button 
              type="submit" 
              className="btn w-100 py-2 text-white fw-bold border-0 shadow-sm"
              style={{ backgroundColor: '#0ea5e9', borderRadius: '8px', fontSize: '14px' }}
            >
              Log In
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4" style={{ fontSize: '13px' }}>
            <span className="text-muted">Don't have an account? </span>
            <Link to="/signup" className="text-decoration-none fw-bold" style={{ color: '#0ea5e9' }}>
              Sign Up
            </Link>
          </div>
          
        </div>
      </main>
    </div>
  );
}