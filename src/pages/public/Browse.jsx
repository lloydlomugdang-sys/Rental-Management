import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMapPin, FiMaximize, FiHome, FiSearch, FiFilter, FiX, FiCheckCircle } from 'react-icons/fi';

import rentixLogo from '../../assets/RentixLogo.jpg'; 
import rentixName from '../../assets/RentixName.jpg'; 

export default function Browse() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal & Application States
  const [selectedUnit, setSelectedUnit] = useState(null); 
  const [moveInDate, setMoveInDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/units');
        setUnits(res.data.units || []);
        setFilteredUnits(res.data.units || []);
      } catch (err) {
        setError('Failed to load rental units.');
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, []);

  useEffect(() => {
    let result = units;
    if (searchTerm) {
      result = result.filter(unit => unit.unitNumber?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (typeFilter !== 'All') {
      result = result.filter(unit => unit.type === typeFilter);
    }
    if (statusFilter !== 'All') {
      result = result.filter(unit => unit.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    setFilteredUnits(result);
  }, [searchTerm, typeFilter, statusFilter, units]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!moveInDate) return setApplyError("Please select a move-in date.");

    setSubmitLoading(true);
    setApplyError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/applications', 
        { unitId: selectedUnit._id, moveInDate, message },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      setApplySuccess(true);
    } catch (err) {
      setApplyError(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedUnit(null);
    setApplySuccess(false);
    setApplyError('');
    setMessage('');
    setMoveInDate('');
  };

  if (loading) return <div className="p-5 text-center min-vh-100 d-flex align-items-center justify-content-center">Loading units...</div>;

  return (
    <div className="bg-light min-vh-100 pb-5 position-relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom w-100 position-sticky top-0 z-3">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img src={rentixLogo} alt="Logo" style={{ width: '32px' }} />
          <img src={rentixName} alt="Name" style={{ height: '20px' }} />
        </Link>
        <div className="d-flex align-items-center gap-4" style={{ fontSize: '14px' }}>
          <Link to="/browse" className="text-decoration-none fw-bold" style={{ color: '#0ea5e9' }}>Browse</Link>
          <Link to="/contact" className="text-decoration-none text-dark fw-semibold d-none d-sm-block">Contact Us</Link>
          {!user && (
            <Link to="/login" className="btn btn-outline-secondary rounded-pill px-4" style={{ fontSize: '14px', fontWeight: '500' }}>Sign In</Link>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="bg-white border-bottom py-5 mb-4 text-center px-3">
        <h1 className="fw-bold mb-3" style={{ color: '#0f172a' }}>Discover Your Next Home</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Browse our collection of premium rental units.</p>
      </div>

      {/* MAIN GRID */}
      <div className="container">
        {/* FILTERS */}
        <div className="card border-0 shadow-sm mb-4 p-3" style={{ borderRadius: '12px' }}>
          <div className="row g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiSearch /></span>
                <input type="text" className="form-control border-start-0 ps-0 shadow-none py-2" placeholder="Search unit number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiFilter /></span>
                <select className="form-select border-start-0 shadow-none py-2" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="All">All Types</option>
                  <option value="Studio">Studio</option>
                  <option value="1-Bedroom">1-Bedroom</option>
                  <option value="2-Bedroom">2-Bedroom</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><FiFilter /></span>
                <select className="form-select border-start-0 shadow-none py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* UNIT CARDS */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit) => (
              <div key={unit._id} className="col">
                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center position-relative" style={{ height: '200px' }}>
                    {unit.imageUrl ? (
                      <img src={unit.imageUrl} alt={unit.unitNumber} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    ) : (
                      <FiHome size={40} className="text-muted opacity-50" />
                    )}
                    <span className={`position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 ${unit.status?.toLowerCase() === 'available' ? 'bg-success' : 'bg-danger'}`}>
                      {unit.status?.charAt(0).toUpperCase() + unit.status?.slice(1) || 'Available'}
                    </span>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0">Unit {unit.unitNumber}</h5>
                      <h5 className="fw-bold mb-0" style={{ color: '#0ea5e9' }}>₱{unit.price?.toLocaleString()}<small className="text-muted fw-normal">/mo</small></h5>
                    </div>
                    <div className="d-flex gap-3 text-muted small mb-4 mt-3">
                      <div className="d-flex align-items-center gap-1"><FiMaximize /> {unit.sqm || '0'} sqm</div>
                      <div className="d-flex align-items-center gap-1"><FiHome /> {unit.type || 'Studio'}</div>
                      <div className="d-flex align-items-center gap-1"><FiMapPin /> Flr {unit.floor || '1'}</div>
                    </div>
                    <button onClick={() => setSelectedUnit(unit)} className="btn w-100 fw-bold rounded-3 btn-outline-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5 text-muted"><h4>No units match your search.</h4></div>
          )}
        </div>
      </div>

      {/* --- POP-UP MODAL (FIXED UX) --- */}
      {selectedUnit && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="bg-white rounded-4 shadow-lg overflow-hidden position-relative" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <button onClick={closeModal} className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm" style={{ zIndex: 10 }}>
              <FiX size={20} />
            </button>

            {/* Image Placeholder */}
            <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
              <FiHome size={60} className="text-muted opacity-50" />
            </div>

            {/* Details Area */}
            <div className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2 className="fw-bold mb-1">Unit {selectedUnit.unitNumber}</h2>
                  <h4 className="fw-bold mb-0" style={{ color: '#0ea5e9' }}>₱{selectedUnit.price?.toLocaleString()}<small className="text-muted fw-normal" style={{ fontSize: '16px' }}>/month</small></h4>
                </div>
                <span className={`badge rounded-pill px-4 py-2 ${selectedUnit.status?.toLowerCase() === 'available' ? 'bg-success' : 'bg-danger'}`}>
                  {selectedUnit.status?.charAt(0).toUpperCase() + selectedUnit.status?.slice(1) || 'Available'}
                </span>
              </div>

              {/* Stats Boxes */}
              <div className="row g-3 mb-4">
                <div className="col-4"><div className="bg-light p-3 rounded-3 text-center border"><FiMaximize className="text-muted mb-1" size={20}/><br/><strong className="small">{selectedUnit.sqm || '0'} sqm</strong></div></div>
                <div className="col-4"><div className="bg-light p-3 rounded-3 text-center border"><FiHome className="text-muted mb-1" size={20}/><br/><strong className="small">{selectedUnit.type || 'Studio'}</strong></div></div>
                <div className="col-4"><div className="bg-light p-3 rounded-3 text-center border"><FiMapPin className="text-muted mb-1" size={20}/><br/><strong className="small">Floor {selectedUnit.floor || '1'}</strong></div></div>
              </div>

              <div className="border-top pt-4 mt-2">
                {/* LOGIC: Kung HINDI nakalogin */}
                {!user ? (
                  <div className="d-flex justify-content-end">
                    <button 
                      onClick={() => navigate('/login')} 
                      className={`btn fw-bold px-5 py-2 rounded-3 text-white ${selectedUnit.status?.toLowerCase() !== 'available' ? 'disabled bg-secondary' : ''}`}
                      style={{ backgroundColor: selectedUnit.status?.toLowerCase() === 'available' ? '#0ea5e9' : '' }}
                    >
                      Apply
                    </button>
                  </div>
                ) : 
                
                /* LOGIC: Kung NAKALOGIN na */
                applySuccess ? (
                  <div className="alert alert-success text-center py-3 rounded-3 mb-0">
                    <FiCheckCircle size={30} className="mb-2"/><br/>
                    <strong>Application Submitted!</strong> View status in your dashboard.
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="bg-light p-4 rounded-4 border">
                    <h6 className="fw-bold mb-3">Complete your Application</h6>
                    {applyError && <div className="alert alert-danger py-2" style={{fontSize: '13px'}}>{applyError}</div>}
                    
                    <div className="mb-3">
                      <label className="fw-bold small mb-2">Target Move-in Date <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} min={new Date().toISOString().split("T")[0]} required />
                    </div>
                    
                    <div className="mb-3">
                      <label className="fw-bold small mb-2 text-muted">Message to Landlord (Optional)</label>
                      <textarea className="form-control" rows="2" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>

                    <div className="d-flex justify-content-end mt-2">
                      <button 
                        type="submit" 
                        className={`btn fw-bold px-5 py-2 rounded-3 text-white ${selectedUnit.status?.toLowerCase() !== 'available' ? 'disabled bg-secondary' : ''}`}
                        style={{ backgroundColor: selectedUnit.status?.toLowerCase() === 'available' ? '#0ea5e9' : '' }}
                        disabled={submitLoading || selectedUnit.status?.toLowerCase() !== 'available'}
                      >
                        {submitLoading ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}