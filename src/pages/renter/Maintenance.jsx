import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaWrench, FaPlus, FaCheckCircle, 
  FaRegClock, FaExclamationCircle 
} from 'react-icons/fa';

export default function Maintenance() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/dashboard/tenant', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data.dashboard.maintenance.recent || []);
      } catch (err) {
        console.error("Error fetching maintenance:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenance();
  }, []);

  // SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dito ilalagay ang POST request sa backend mamaya
    alert(`Submitting Request:\nTitle: ${issueTitle}\nDesc: ${description}`);
    setShowModal(false); // Isara ang modal pagkatapos
    setIssueTitle('');
    setDescription('');
  };

  const getStatusStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'resolved':
      case 'completed':
        return { badge: 'bg-success-subtle text-success', icon: <FaCheckCircle className="text-success" size={20} />, text: 'Completed' };
      case 'in-progress':
      case 'ongoing':
        return { badge: 'bg-info-subtle text-info', icon: <FaRegClock className="text-info" size={20} />, text: 'Ongoing' };
      default:
        return { badge: 'bg-warning-subtle text-warning', icon: <FaExclamationCircle className="text-warning" size={20} />, text: 'Pending' };
    }
  };

  if (loading) return <div className="p-5 text-center text-muted">Loading requests...</div>;

  return (
    <div className="p-4 bg-light min-vh-100 position-relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <FaWrench className="text-info" size={22} />
          <h3 className="fw-bold mb-0">Maintenance Requests</h3>
        </div>
        {/* ADDED onClick HERE */}
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-info text-white rounded-pill px-4 fw-semibold d-flex align-items-center gap-2" 
          style={{ backgroundColor: '#0ea5e9', border: 'none' }}
        >
          <FaPlus /> New Request
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {requests.length > 0 ? (
          requests.map((req) => {
            const style = getStatusStyle(req.status);
            return (
              <div key={req._id} className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-body p-3 p-md-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-start gap-3">
                    <div className="mt-1">{style.icon}</div>
                    <div>
                      <h6 className="fw-bold mb-1">{req.title || req.issue || 'Maintenance Request'}</h6>
                      <p className="text-muted small mb-0">{req.description || 'No description provided.'}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`badge rounded-pill px-3 py-2 ${style.badge}`} style={{ fontSize: '12px' }}>
                      {style.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-5 text-muted bg-white rounded-3 shadow-sm">
            You don't have any maintenance requests.
          </div>
        )}
      </div>

      {/* POPUP MODAL BACKGROUND OVERLAY */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
             style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1050 }}>
          
          {/* MODAL BOX */}
          <div className="bg-white p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px' }}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="fw-bold mb-0">Submit Maintenance Request</h5>
              <button onClick={() => setShowModal(false)} className="btn-close" aria-label="Close"></button>
            </div>
            <p className="text-muted small mb-4">Describe the issue and we'll get it resolved.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="fw-semibold small mb-1">Issue Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Broken sink pipe" 
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="fw-semibold small mb-1">Description</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="d-flex justify-content-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-light rounded-pill px-4 fw-semibold border">
                  Cancel
                </button>
                <button type="submit" className="btn text-white rounded-pill px-4 fw-semibold" style={{ backgroundColor: '#0ea5e9' }}>
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}