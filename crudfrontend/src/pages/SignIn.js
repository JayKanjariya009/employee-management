import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import "../SignIn.css"

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
        <>
            <div className='navbar'>
                <div className='container'>
                    <h4 style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign Up</h4>
                    <h4 style={{ cursor: 'pointer' }} onClick={() => navigate('/signin')}>Login now</h4>
                </div>
            </div>

            <div className='signin-container'>
                <div className='signin-form-box'>
                    <h1 className='signin-title'>Log In</h1>
                    <form onSubmit={handleSubmit} className="signin-form">
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

                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn
