import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../sidebar.css";

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarActive && !event.target.closest('.sidebar') && !event.target.closest('.toggle-btn')) {
        setSidebarActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarActive]);

  const logouthandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate('/signup');
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || "user";
  const userName = user.fullName || user.name || "User";

  // Check if current path matches the link
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <button 
        className="toggle-btn" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={sidebarActive}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* User info and logout button in top-right corner of screen */}
      <div className="top-right-panel">
        <div className="user-info-corner">
          <div className="user-avatar-corner">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="user-details-corner">
            <span className="user-name-corner">{userName}</span>
            <span className="user-role-corner">{role}</span>
          </div>
        </div>
        <button 
          className="logout-btn-corner" 
          onClick={logouthandler}
          aria-label="Logout"
          title="Logout"
        >
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>

      {sidebarActive && <div className="sidebar-overlay" onClick={() => setSidebarActive(false)}></div>}

      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <h4>Employee Hub</h4>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-section">
              <span className="section-title">Dashboard</span>
            </li>
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
                onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
              >
                <span className="nav-icon">👥</span>
                <span className="nav-text">View Employees</span>
              </Link>
            </li>

            {role === "admin" && (
              <>
                <li className="nav-section">
                  <span className="section-title">Administration</span>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/add" 
                    className={`nav-link ${isActiveLink('/add') ? 'active' : ''}`}
                    onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
                  >
                    <span className="nav-icon">➕</span>
                    <span className="nav-text">Add Employee</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/employee" 
                    className={`nav-link ${isActiveLink('/employee') ? 'active' : ''}`}
                    onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
                  >
                    <span className="nav-icon">✏️</span>
                    <span className="nav-text">Edit Employee</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/manage" 
                    className={`nav-link ${isActiveLink('/manage') ? 'active' : ''}`}
                    onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
                  >
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-text">Manage Employees</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/manageleaves" 
                    className={`nav-link ${isActiveLink('/manageleaves') ? 'active' : ''}`}
                    onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
                  >
                    <span className="nav-icon">📊</span>
                    <span className="nav-text">Manage Leaves</span>
                  </Link>
                </li>
              </>
            )}

            <li className="nav-section">
              <span className="section-title">Leave Management</span>
            </li>
            <li className="nav-item">
              <Link 
                to="/leaverequest" 
                className={`nav-link ${isActiveLink('/leaverequest') ? 'active' : ''}`}
                onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
              >
                <span className="nav-icon">📝</span>
                <span className="nav-text">Leave Request</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/myleaves" 
                className={`nav-link ${isActiveLink('/myleaves') ? 'active' : ''}`}
                onClick={() => window.innerWidth <= 768 && setSidebarActive(false)}
              >
                <span className="nav-icon">📋</span>
                <span className="nav-text">My Leave Requests</span>
              </Link>
            </li>
          </ul>
        </nav>


      </div>
    </>
  );
}

export default Sidebar;
