import React, { useEffect, useState } from 'react';
import axios from 'axios';
// CSS is imported globally in index.js
import Sidebar from '../Common/Sidebar';
import API_BASE_URL from '../config/api';

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/leave/myleaves`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data && Array.isArray(res.data.leaves)) {
          setLeaves(res.data.leaves);
        } else {
          setLeaves([]);
        }
      } catch (err) {
        console.error('Error fetching leaves:', err);
        setError('Failed to fetch leave requests.');
      }
    };

    fetchLeaves();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarActive((prev) => !prev);
  };

  // Helper to get status class
  const getStatusClass = (status) => {
    if (!status) return '';
    return status.toLowerCase();
  };

  return (
    <div className={`wrapper${sidebarActive ? " sidebar-open" : ""}`}>
      <button className="toggle-btn" onClick={handleSidebarToggle}>
        ☰
      </button>
      <Sidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} />
      <div className="content">
        <div className="leave-container">
          <h3 className="leave-title">My Leaves</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul className="leave-list">
            {leaves.map((leave) => (
              <li key={leave._id} className="leave-item">
                <span className="leave-type">{leave.leaveType?.toUpperCase()}</span>
                <span className="leave-reason">{leave.reason}</span>
                <span className={`leave-status ${getStatusClass(leave.status)}`}>
                  {leave.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Leave;
