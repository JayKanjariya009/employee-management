// CSS is imported globally in index.js
import Sidebar from "../Common/Sidebar";
import { Link } from "react-router-dom";
// import "../connectDb"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Manage() {
  

  const [employee, setEmployee] = useState([])
  

  const fetchemployees = async (e) => {

    const token = localStorage.getItem("token");
    console.log("MANAGE COMPONENT Token from localStorage:", token);

    try {
      const response = await axios.get('http://localhost:8000/employees', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
      setEmployee(response.data.data)
    } catch (error) {
      toast.error("Error occured while fetching Employees")
    }
  }

  useEffect(() => {
    fetchemployees()
  }, []);
  const user = JSON.parse(localStorage.getItem("user"))
  const role = user?.role

  if (role !== "admin") {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <h2>🚫 Access Denied</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );

  }

  const deleteEmployee = async (email) => {

    const token = localStorage.getItem("token");
    console.log("MANAGE COMPONENT Token from localStorage:", token);

    try {
      const res = await axios.delete(`http://localhost:8000/deleteemployee/${email}`,{
         headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data);
      
      toast.success("Employee deleted successfully")
      fetchemployees()

    } catch (error) {
      toast.error("Error Occured while deleting Employee")

    }

  }


  return (
    <>
      <div>
        <div className="wrapper">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="content">
            <div className="form-container">
              <h2>Manage Employees</h2>
              <div className="employees-grid">
                {employee.map((emp) => (
                  <div className="employee-card card" key={emp._id}>
                    <div className="card-body">
                      <div className="employee-header">
                        <div className="employee-avatar">
                          {emp.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="employee-info">
                          <h3>{emp.fullName}</h3>
                          <p>{emp.position}</p>
                        </div>
                      </div>
                      
                      <div className="employee-details">
                        <div className="detail-item">
                          <span className="detail-label">Email</span>
                          <span className="detail-value">{emp.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Department</span>
                          <span className="detail-value">{emp.department || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone</span>
                          <span className="detail-value">{emp.phone || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Join Date</span>
                          <span className="detail-value">{emp.doj ? new Date(emp.doj).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="employee-actions">
                        <Link to={`/edit/${emp._id}`} className="action-btn edit" title="Edit Employee">
                          ✏️
                        </Link>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteEmployee(emp.email)}
                          title="Delete Employee"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manage;
