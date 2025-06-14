import "../manage.css";
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
            <h2 className="mb-4">Manage Employees</h2>
            {employee.map((emp) => (

              <div className="card mb-3" key={emp._id}>
                <div className="card-body">
                  <h5 className="card-title">{emp.fullName}</h5>
                  <p className="card-text">
                    {emp.email}
                    <br />
                    {emp.position}
                  </p>
                </div>
                <div className="action-buttons p-3 ml-auto">
                  <Link to={`/edit/${emp._id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteEmployee(emp.email)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Manage;
