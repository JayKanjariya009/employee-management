import React, { useState } from 'react';
import "../SignUP.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            const res = await axios.post('http://localhost:8000/signup', formData);
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
        <>
            <div className='navbar'>
                <div className='container'>
                    <h4 style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign Up</h4>
                    <h4 style={{ cursor: 'pointer' }} onClick={() => navigate('/signin')}>Login now</h4>


                </div>

            </div>
            <div className='signup-container'>
                <div className='signup-form-box'>
                    <h1 className='signup-title'>Sign Up Now</h1>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <label htmlFor='name'>Name:</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='email'>Email:</label>
                        <input
                            type="text"
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor='password'>Password:</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button type='submit' >Create Account</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUP;
