import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Sidebar from '../Common/Sidebar'
// CSS is imported globally in index.js

function LeaveRequest() {
    const [form, setForm] = useState({ reason: '', leaveType: 'paid' })

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.post(`http://localhost:8000/leave`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success('Leave submitted')
            setForm({ reason: '', leaveType: 'paid' })
        } catch (error) {
            console.log(error)
            toast.error('Failed to submit Leave')
        }
    }

    return (
        <>
            <div className='wrapper'>
                <Sidebar />
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <h3>Request For Leave</h3>

                        <label>Reason:</label>
                        <input
                            type="text"
                            placeholder="Enter reason for leave"
                            name="reason"
                            value={form.reason}
                            onChange={handlechange}
                            required
                        />
                        <br></br>
                        <label>Leave Type:</label>

                        <select
                            name="leaveType"
                            value={form.leaveType}
                            onChange={handlechange}
                            required
                        >
                            <option value="paid">paid</option>
                            <option value="sick">sick</option>
                        </select>

                        <button type="submit">Submit</button>
                    </form>

                </div>

            </div>
        </>
    )
}

export default LeaveRequest
