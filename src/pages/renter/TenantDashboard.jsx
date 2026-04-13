import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function TenantDashboard() {
  const { user } = useAuth(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/dashboard/tenant', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setData(res.data.dashboard);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-5 text-center">Loading your rental info...</div>;

  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="mb-4">
        <h2 className="fw-bold">Welcome back, {user?.name || 'Tenant'}!</h2>
        <p className="text-muted">Here is the summary of your rental account.</p>
      </div>

      <div className="row g-3">
        {/* 1. RENT STATUS CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <small className="text-muted d-block mb-1">Rent Status</small>
            <h4 className={`fw-bold ${data?.payments?.overdue > 0 ? 'text-danger' : 'text-success'}`}>
              {data?.payments?.overdue > 0 ? 'Overdue' : 'Up to date'}
            </h4>
            <small className={data?.payments?.overdue > 0 ? 'text-danger' : 'text-success'}>
              {data?.payments?.overdue > 0 ? `You have ${data.payments.overdue} overdue payment(s)` : 'Paid for current month'}
            </small>
          </div>
        </div>

        {/* 2. ASSIGNED UNIT CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <small className="text-muted d-block mb-1">Assigned Unit</small>
            <h4 className="fw-bold">
              {data?.lease?.unitId?.unitNumber || 'No Active Lease'}
            </h4>
            <small className="text-muted">
              {data?.lease?.unitId?.type || 'N/A'} - Floor {data?.lease?.unitId?.floor || '0'}
            </small>
          </div>
        </div>

        {/* 3. TOTAL PAID CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <small className="text-muted d-block mb-1">Total Amount Paid</small>
            <h4 className="fw-bold text-primary">
              ₱{data?.payments?.totalPaid?.toLocaleString() || '0.00'}
            </h4>
            <small className="text-muted">Total verified payments</small>
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY TABLE */}
      <div className="mt-5 card border-0 shadow-sm p-4">
        <h5 className="fw-bold mb-4">Recent Payment Activity</h5>
        <div className="table-responsive">
          <table className="table table-hover border-top">
            <thead className="text-muted" style={{ fontSize: '13px' }}>
              <tr>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.payments?.recent?.length > 0 ? (
                data.payments.recent.map((payment) => (
                  <tr key={payment._id}>
                    <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                    <td>₱{payment.amount.toLocaleString()}</td>
                    <td>
                      <span className={`badge rounded-pill ${
                        payment.status === 'verified' ? 'bg-success-subtle text-success' : 
                        payment.status === 'overdue' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'
                      }`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted">No payment history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}