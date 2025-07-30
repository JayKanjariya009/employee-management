import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../Common/Sidebar';
import API_BASE_URL from '../config/api';
// CSS is imported globally in index.js

function ManageLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeaves, setSelectedLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/leave/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaves(res.data.leaves || []);
    } catch (err) {
      toast.error("Failed to fetch leave data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaves();
    // eslint-disable-next-line
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedLeaves(prev =>
      prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
    );
  };

  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/leave/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Leave ${status}`);
      await fetchLeaves();
    } catch (error) {
      toast.error("Failed to update status");
    }
    setLoading(false);
  };

  const bulkUpdateStatus = async (status) => {
    if (selectedLeaves.length === 0) return;
    setLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/leave/bulk-update`, {
        ids: selectedLeaves,
        status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Bulk ${status} successful`);
      setSelectedLeaves([]);
      await fetchLeaves(); // Ensure fresh data after bulk update
    } catch (error) {
      toast.error("Bulk update failed");
    }
    setLoading(false);
  };

  return (
    <div className='wrapper'>
      <Sidebar />
      <div className="manage-leaves-container">
        <h3 className="manage-leaves-title">Manage Leaves</h3>
        <div className="bulk-btns">
          <button
            onClick={() => bulkUpdateStatus('approved')}
            disabled={selectedLeaves.length === 0 || loading}
          >
            Approve Selected
          </button>
          <button
            onClick={() => bulkUpdateStatus('rejected')}
            disabled={selectedLeaves.length === 0 || loading}
          >
            Reject Selected
          </button>
        </div>
        <div className="leaves-table-wrapper">
          <table className="leaves-table">
            <thead>
              <tr>
                <th></th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Leave ID</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", color: "#888" }}>
                    {loading ? "Loading..." : "No leave requests found."}
                  </td>
                </tr>
              )}
              {leaves.map((leave) => {
                const id = leave._id;
                return (
                  <tr key={id} className="leave-row">
                    <td>
                      <input
                        type="checkbox"
                        className="leave-checkbox"
                        checked={selectedLeaves.includes(id)}
                        onChange={() => handleCheckboxChange(id)}
                        disabled={loading}
                      />
                    </td>
                    <td>{leave.userId?.name || "Unknown"}</td>
                    <td>{leave.userId?.email || "-"}</td>
                    <td>{leave.leaveType?.toUpperCase() || "-"}</td>
                    <td>{leave.reason || "-"}</td>
                    <td>
                      <span className={`leave-status ${leave.status}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      {String(leave.status).toLowerCase() === "pending" && (
                        <span className="leave-actions">
                          <button
                            className="approve-btn"
                            onClick={() => updateStatus(id, 'approved')}
                            disabled={loading}
                          >
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => updateStatus(id, 'rejected')}
                            disabled={loading}
                          >
                            Reject
                          </button>
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: "0.85em", color: "#aaa" }}>{id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageLeaves;
