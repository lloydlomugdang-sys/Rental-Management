import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiTool, FiCheckCircle } from 'react-icons/fi';

export default function Maintenance() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States 
  const [unitId, setUnitId] = useState(''); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low'); 
  
  // States for feedback
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Fetch Tenant's Maintenance Requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      // Match the endpoint in maintenanceRoutes.js
      const res = await axios.get('http://localhost:8000/api/maintenance/my/requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Computations for Summary Cards 
  const openCount = requests.filter(r => r.status === 'open').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const resolvedCount = requests.filter(r => r.status === 'resolved').length;

  // 2. Handle Submit Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      
      
      if (!unitId) {
          setErrorMsg("Please enter your Unit ID.");
          setSubmitLoading(false);
          return;
      }

      await axios.post('http://localhost:8000/api/maintenance', 
        { unitId, title, description, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMsg("Maintenance request submitted successfully.");
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('low');
      
      // Refresh the table
      fetchRequests();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to submit request.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved': return <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1">RESOLVED</span>;
      case 'in-progress': return <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1">IN PROGRESS</span>;
      default: return <span className="badge bg-warning-subtle text-warning rounded-pill px-3 py-1">OPEN</span>;
    }
  };

  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="text-danger fw-bold small">High</span>;
      case 'medium': return <span className="text-warning fw-bold small">Medium</span>;
      default: return <span className="text-success fw-bold small">Low</span>;
    }
  };

  return (
    <div className="p-4 bg-light min-vh-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Maintenance Requests</h2>
        <p className="text-muted small">Report issues in your unit and track repair progress.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <small className="text-muted d-block mb-2">Open Requests</small>
            <h3 className="fw-bold mb-0 text-warning">{openCount}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <small className="text-muted d-block mb-2">In Progress</small>
            <h3 className="fw-bold mb-0 text-primary">{inProgressCount}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <small className="text-muted d-block mb-2">Resolved Issues</small>
            <h3 className="fw-bold mb-0 text-success">{resolvedCount}</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* SUBMIT NEW REQUEST FORM */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2"><FiTool className="text-primary"/> New Request</h5>
              
              {successMsg && <div className="alert alert-success py-2 text-center small"><FiCheckCircle className="me-2"/>{successMsg}</div>}
              {errorMsg && <div className="alert alert-danger py-2 text-center small">{errorMsg}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="small fw-semibold mb-2">Unit ID (Temporary) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Paste your Unit Object ID here" value={unitId} onChange={(e) => setUnitId(e.target.value)} required />
                  <small className="text-muted" style={{fontSize: '11px'}}>We need this to match the backend requirement.</small>
                </div>
                
                <div className="mb-3">
                  <label className="small fw-semibold mb-2">Issue Title <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="e.g. Leaking Faucet" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="small fw-semibold mb-2">Priority <span className="text-danger">*</span></label>
                  <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="low">Low (Minor repairs)</option>
                    <option value="medium">Medium (Annoyance but livable)</option>
                    <option value="high">High (Emergency / Safety Hazard)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="small fw-semibold mb-2">Description <span className="text-danger">*</span></label>
                  <textarea className="form-control" rows="4" placeholder="Describe the issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 fw-bold py-2" style={{ backgroundColor: '#0ea5e9', border: 'none' }} disabled={submitLoading}>
                  {submitLoading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* REQUEST HISTORY TABLE */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Request History</h5>
              
              {loading ? (
                <div className="text-center text-muted py-5">Loading requests...</div>
              ) : requests.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="text-muted small">
                      <tr>
                        <th className="border-0">DATE</th>
                        <th className="border-0">TITLE</th>
                        <th className="border-0">PRIORITY</th>
                        <th className="border-0 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req) => (
                        <tr key={req._id}>
                          <td className="py-3 text-muted small">{new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td className="py-3 fw-bold">{req.title}</td>
                          <td className="py-3">{getPriorityBadge(req.priority)}</td>
                          <td className="py-3 text-center">{getStatusBadge(req.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 bg-light rounded-3">
                  <p className="text-muted mb-0">You haven't submitted any maintenance requests yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}