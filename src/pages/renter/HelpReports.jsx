import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaExclamationTriangle, FaPlus, FaEye, 
  FaCheckCircle, FaRegClock 
} from 'react-icons/fa';

export default function HelpReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data.reports || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setReports([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting Report:\nTitle: ${title}\nCat: ${category}\nDesc: ${description}`);
    setShowModal(false);
    setTitle('');
    setCategory('');
    setDescription('');
  };

  const getReportStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'reviewed': return { badge: 'bg-info-subtle text-info', icon: <FaEye className="text-info" size={20} />, text: 'Reviewed' };
      case 'resolved': return { badge: 'bg-success-subtle text-success', icon: <FaCheckCircle className="text-success" size={20} />, text: 'Resolved' };
      default: return { badge: 'bg-warning-subtle text-warning', icon: <FaRegClock className="text-warning" size={20} />, text: 'Pending' };
    }
  };

  if (loading) return <div className="p-5 text-center text-muted">Loading reports...</div>;

  return (
    <div className="p-4 bg-light min-vh-100 position-relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <FaExclamationTriangle className="text-info" size={22} />
          <h3 className="fw-bold mb-0">Help & Reports</h3>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-info text-white rounded-pill px-4 fw-semibold d-flex align-items-center gap-2" 
          style={{ backgroundColor: '#0ea5e9', border: 'none' }}
        >
          <FaPlus /> Report a Problem
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {reports.length > 0 ? (
          reports.map((report) => {
            const style = getReportStyle(report.status);
            return (
              <div key={report._id} className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                <div className="card-body p-3 p-md-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-start gap-3">
                    <div className="mt-1">{style.icon}</div>
                    <div>
                      <h6 className="fw-bold mb-1">{report.title || 'Report Issue'}</h6>
                      <p className="text-muted small mb-0">{report.category || 'General'} • {new Date(report.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`badge rounded-pill px-3 py-2 ${style.badge}`} style={{ fontSize: '12px' }}>{style.text}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-5 text-muted bg-white rounded-3 shadow-sm">
            <p className="mb-0">No reports filed yet.</p>
          </div>
        )}
      </div>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
             style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1050 }}>
          
          <div className="bg-white p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px' }}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="fw-bold mb-0">Report a Problem</h5>
              <button onClick={() => setShowModal(false)} className="btn-close"></button>
            </div>
            <p className="text-muted small mb-4">Describe the issue and select a category.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="fw-semibold small mb-1">Title</label>
                <input type="text" className="form-control" placeholder="e.g. Billing issue" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              
              <div className="mb-3">
                <label className="fw-semibold small mb-1">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="" disabled>Select category</option>
                  <option value="Payment">Payment</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="fw-semibold small mb-1">Description</label>
                <textarea className="form-control" rows="3" placeholder="Describe the issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              
              <div className="d-flex justify-content-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-light rounded-pill px-4 fw-semibold border">Cancel</button>
                <button type="submit" className="btn text-white rounded-pill px-4 fw-semibold" style={{ backgroundColor: '#0ea5e9' }}>Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}