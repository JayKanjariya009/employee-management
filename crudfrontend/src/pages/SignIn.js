import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
// CSS is imported globally in index.js

function SignIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("form data submitted", formData);

        try {
            const response = await axios.post('http://localhost:8000/signin', formData)

            toast.success(response.data.message || "Signed in successfully");

            localStorage.removeItem("token");
            localStorage.setItem("token", response.data.token);
            // localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setFormData({
                email: "",
                password: "",
            })

            setTimeout(() => {
                console.log("Navigating to /employee");  // Debug log
                navigate('/');
            }, 1500);



        } catch (error) {
            toast.error("Error occurred while submitting data."); // ✅ correct
            if (error.response && error.response.status === 409) {
                toast.error('Account Does not  exists. Please use a different one.');
            } else if (error.response && error.response.status === 400) {
                toast.error('⚠️ All fields are required.');
            } else {
                toast.error('🚫 An error occurred. Please try again later.');
            }
        }



    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <div className='auth-logo'>
                        👤
                    </div>
                    <h1 className='auth-title'>Welcome Back</h1>
                    <p className='auth-subtitle'>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className='remember-me'>
                        <input type="checkbox" id="remember" className='remember-checkbox' />
                        <label htmlFor="remember" className='remember-label'>Remember me</label>
                    </div>

                    <button type='submit' className='auth-btn'>
                        Sign In
                    </button>
                </form>

                <div className='auth-links'>
                    <p>Don't have an account? <span className='auth-link' onClick={() => navigate('/signup')}>Sign up here</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
