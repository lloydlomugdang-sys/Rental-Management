import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import rentixLogo from '../../assets/RentixLogo.jpg'; // I-check kung tama ang path mo
import rentixName from '../../assets/RentixName.jpg'; // I-check kung tama ang path mo

export default function Signup() {
  // Mga States para sa form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Mga States para sa UI loading at errors
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Harangin kung hindi parehas ang password
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      // Ipapasa ang lahat sa AuthContext
      await registerUser(name, email, contactNumber, password); 
      
      // Pag successful, lipat agad sa dashboard
      navigate('/tenant/dashboard');
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER NAVBAR */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom w-100">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img src={rentixLogo} alt="Logo" style={{ width: '32px' }} />
          <img src={rentixName} alt="Name" style={{ height: '20px' }} />
        </Link>
        
        <div className="d-flex align-items-center gap-4" style={{ fontSize: '14px' }}>
          <Link to="/browse" className="text-decoration-none text-dark fw-semibold d-none d-sm-block">Browse</Link>
          <Link to="/contact" className="text-decoration-none text-muted d-none d-sm-block">Contact Us</Link>
          <Link 
            to="/login" 
            className="btn btn-outline-secondary rounded-pill px-4"
            style={{ fontSize: '14px', fontWeight: '500' }}
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* MAIN REGISTRATION FORM */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center w-100 py-5">
        <div className="card bg-white border-0 p-4 p-md-5 shadow-sm" style={{ width: '100%', maxWidth: '450px', borderRadius: '12px' }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-2">Create Account</h3>
            <p className="text-muted small">Join Rentix to simplify your rental experience</p>
          </div>

          {error && <div className="alert alert-danger py-2 text-center" style={{ fontSize: '13px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-bold d-block mb-1" style={{ fontSize: '12px' }}>Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiUser /></span>
                <input 
                  type="text" className="form-control border-start-0 ps-0 shadow-none py-2" 
                  placeholder="e.g. John Doe" style={{ fontSize: '14px' }}
                  value={name} onChange={(e) => setName(e.target.value)} required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="fw-bold d-block mb-1" style={{ fontSize: '12px' }}>Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiMail /></span>
                <input 
                  type="email" className="form-control border-start-0 ps-0 shadow-none py-2" 
                  placeholder="name@gmail.com" style={{ fontSize: '14px' }}
                  value={email} onChange={(e) => setEmail(e.target.value)} required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="fw-bold d-block mb-1" style={{ fontSize: '12px' }}>Contact Number</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiPhone /></span>
                <input 
                  type="tel" className="form-control border-start-0 ps-0 shadow-none py-2" 
                  placeholder="09123456789" style={{ fontSize: '14px' }}
                  value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="fw-bold d-block mb-1" style={{ fontSize: '12px' }}>Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiLock /></span>
                <input 
                  type="password" className="form-control border-start-0 ps-0 shadow-none py-2" 
                  placeholder="••••••••" style={{ fontSize: '14px' }}
                  value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="fw-bold d-block mb-1" style={{ fontSize: '12px' }}>Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiLock /></span>
                <input 
                  type="password" className="form-control border-start-0 ps-0 shadow-none py-2" 
                  placeholder="••••••••" style={{ fontSize: '14px' }}
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength="6"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn w-100 py-2 text-white fw-bold border-0" 
              style={{ backgroundColor: '#0ea5e9', borderRadius: '6px' }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-4" style={{ fontSize: '13px' }}>
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#0ea5e9' }}>Log In</Link>
          </div>
        </div>
      </main>
    </div>
  );
}