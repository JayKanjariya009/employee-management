import React, { useState } from 'react';
// CSS is imported globally in index.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_BASE_URL from '../config/api';
// import SignIn from "../pages/SignIn"


function SignUP() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const validateForm = () => {
        const { name, email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

        if (!nameRegex.test(name)) {
            toast.error("Name must be at least 3 character and conatin only alphabets")
            return false
        }
        if (!emailRegex.test(email)) {
            toast.error("❗ Invalid email format.");
            return false;
        }

        if (!passwordRegex.test(password)) {
            toast.error("❗ Password must be at least 6 characters and contain letters and numbers.");
            return false;
        }

        return true
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return
        }
        console.log('Form submitted:', formData);

        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, formData);
            toast.success(res.data.message); // success message
            setFormData({
                name: "",
                email: "",
                password: "",
            })
            setTimeout(() => {
                navigate('/signin')
            }, 2000)
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('❌ Email already exists. Please use a different one.');
            } else if (error.response && error.response.status === 400) {
                toast.error('⚠️ All fields are required.');
            } else {
                toast.error('🚫 An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <div className='auth-logo'>
                        ✨
                    </div>
                    <h1 className='auth-title'>Create Account</h1>
                    <p className='auth-subtitle'>Join us today and get started</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className='auth-form-group'>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className='auth-form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className='auth-form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                            required
                        />
                    </div>

                    <button type='submit' className='auth-btn'>
                        Create Account
                    </button>
                </form>

                <div className='auth-links'>
                    <p>Already have an account? <span className='auth-link' onClick={() => navigate('/signin')}>Sign in here</span></p>
                </div>
            </div>
        </div>
    );
}

export default SignUP;
