import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from '../config/api';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    position: "",
    department: "",
    doj: "",
    address: "",
    profile_pic: "",
  });



  useEffect(() => {
    const fetchEmployee = async () => {

      const token = localStorage.getItem("token");
      console.log("EDIT Component Token from localStorage:", token);

      if (!token) {
        console.log("token not found please log in again");
        return
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);

        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch employee", err);
      }
    };
    fetchEmployee();
  }, [id]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("MANAGE COMPONENT Token from localStorage:", token);

      const response = await axios.put(`${API_BASE_URL}/editemployee/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        alert("Data updated successfully");
        navigate("/");
      } else {
        alert("Failed to update employee data: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating employee data", error);
      alert("Error updating employee: " + error.message);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content">
        <div className="form-container">
          <h2>Edit Employee</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label><br />
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <label htmlFor="male"> Male </label>
              &nbsp;&nbsp;

              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <label htmlFor="female"> Female </label>
              &nbsp;&nbsp;

              <input
                type="radio"
                name="gender"
                value="Other"
                id="other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              <label htmlFor="other"> Other </label>
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                className="form-control"
                name="position"
                id="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                className="form-control"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="Development">Development</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="doj">Joining Date</label>
              <input
                type="date"
                className="form-control"
                name="doj"
                id="doj"
                value={formData.doj}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="profile_pic">Profile Picture URL</label>
              <input
                type="url"
                className="form-control"
                name="profile_pic"
                id="profile_pic"
                value={formData.profile_pic}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
