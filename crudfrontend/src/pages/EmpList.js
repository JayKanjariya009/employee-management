import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

import "../css/Emplist.css"; 

function EmpList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("fullName");
  const [filterDepartment, setFilterDepartment] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const showEdit = location.pathname === "/employee";

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("EMpList token  Token from localStorage:", token);

      if (!token) {
        toast.error("Token expired. Please log in again.");
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/employees", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            search: search,
          },
        });
        console.log(response.data);
        setEmployees(response.data.data);
      } catch (error) {
        console.log("Error fetching employee data:", error);
        setEmployees([]);

        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please log in again.");
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [search, navigate]);

  // Filter and sort employees
  const filteredAndSortedEmployees = employees
    .filter(emp => 
      filterDepartment === "" || emp.department === filterDepartment
    )
    .sort((a, b) => {
      if (sortBy === "fullName") return a.fullName?.localeCompare(b.fullName);
      if (sortBy === "department") return a.department?.localeCompare(b.department);
      if (sortBy === "position") return a.position?.localeCompare(b.position);
      if (sortBy === "doj") return new Date(a.doj) - new Date(b.doj);
      return 0;
    });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateExperience = (doj) => {
    if (!doj) return "N/A";
    const joinDate = new Date(doj);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years}y ${months}m`;
    } else if (months > 0) {
      return `${months} months`;
    } else {
      return `${diffDays} days`;
    }
  };

  const getDepartments = () => {
    const departments = [...new Set(employees.map(emp => emp.department).filter(Boolean))];
    return departments;
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">
              <i className="fas fa-users"></i>
              Employee Directory
            </h1>
            <p className="page-subtitle">
              Manage and view all employee information
            </p>
          </div>
          <div className="employee-stats">
            <div className="stat-card">
              <div className="stat-number">{employees.length}</div>
              <div className="stat-label">Total Employees</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{getDepartments().length}</div>
              <div className="stat-label">Departments</div>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select
              className="filter-select"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {getDepartments().map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="fullName">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="position">Sort by Position</option>
              <option value="doj">Sort by Join Date</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : filteredAndSortedEmployees.length === 0 ? (
          <div className="no-results">
            <i className="fas fa-user-slash"></i>
            <h3>No employees found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="employees-grid">
            {filteredAndSortedEmployees.map((emp, index) => (
              <div className="employee-card" key={emp._id || index}>
                <div className="card-header">
                  <div className="profile-section">
                    <div className="profile-image">
                      {emp.profile_pic ? (
                        <img src={emp.profile_pic} alt={emp.fullName} />
                      ) : (
                        <div className="profile-placeholder">
                          {emp.fullName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}
                    </div>
                    <div className="profile-info">
                      <h3 className="employee-name">{emp.fullName || "N/A"}</h3>
                      <span className="employee-position">{emp.position || "No Position"}</span>
                      {emp.department && (
                        <span className={`department-badge dept-${emp.department?.toLowerCase()}`}>
                          {emp.department}
                        </span>
                      )}
                    </div>
                  </div>
                  {showEdit && (
                    <Link
                      to={`/edit/${emp._id}`}
                      className="edit-btn"
                      title="Edit Employee"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  )}
                </div>

                <div className="card-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <i className="fas fa-envelope"></i>
                      <div>
                        <span className="info-label">Email</span>
                        <span className="info-value">{emp.email || "N/A"}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-phone"></i>
                      <div>
                        <span className="info-label">Phone</span>
                        <span className="info-value">{emp.phone || "N/A"}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-calendar-alt"></i>
                      <div>
                        <span className="info-label">Join Date</span>
                        <span className="info-value">{formatDate(emp.doj)}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-clock"></i>
                      <div>
                        <span className="info-label">Experience</span>
                        <span className="info-value">{calculateExperience(emp.doj)}</span>
                      </div>
                    </div>

                    {emp.gender && (
                      <div className="info-item">
                        <i className="fas fa-user"></i>
                        <div>
                          <span className="info-label">Gender</span>
                          <span className="info-value">{emp.gender}</span>
                        </div>
                      </div>
                    )}

                    {emp.dob && (
                      <div className="info-item">
                        <i className="fas fa-birthday-cake"></i>
                        <div>
                          <span className="info-label">Date of Birth</span>
                          <span className="info-value">{formatDate(emp.dob)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {emp.address && (
                    <div className="address-section">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <span className="info-label">Address</span>
                        <span className="info-value address-text">{emp.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmpList;
