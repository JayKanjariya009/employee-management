const express = require('express');
const router = express.Router();
const { connectDb } = require('../db/connectDb');
const LeaveRequest = require('../models/LeaveRequest');
const { authMiddleware } = require('../middleware/authmiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');
const { ObjectId } = require('mongodb');

const isValidObjectId = (id) => {
    return typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)
};

// 🔵 Create Leave Request (User)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("leaverequests");

        const { reason, leaveType } = req.body;

        if (!reason || !leaveType) {
            return res.status(400).json({ success: false, message: 'Reason and leave type are required.' });
        }

        const newLeave = new LeaveRequest({
            userId: req.user.userId, // Set by authMiddleware
            reason,
            leaveType,
        });

        const result = await collection.insertOne(newLeave);
        res.status(201).json({ success: true, message: 'Leave request submitted successfully.', leave: newLeave });
    } catch (err) {
        console.error('Error submitting leave:', err);
        res.status(500).json({ success: false, message: 'Server error while submitting leave.' });
    }
});

//  Get User's Own Leave Requests
router.get('/myleaves', authMiddleware, async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("leaverequests");
        const leaves = await collection.find({ userId: new ObjectId(req.user.userId) }).toArray();
        res.status(200).json({ success: true, leaves });
    } catch (err) {
        console.error('Error fetching user leaves:', err);
        res.status(500).json({ success: false, message: 'Could not fetch leaves.' });
    }
});

//  Admin: Get all leave requests
router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("leaverequests");
        const allLeaves = await collection.find().toArray();
        res.status(200).json({ success: true, leaves: allLeaves });
    } catch (err) {
        console.error('🔥 Error fetching all leaves:', err);
        res.status(500).json({ success: false, message: 'Could not fetch all leave requests.' });
    }
});

//  PLACE THIS BEFORE `/:id` route
//  Admin: Bulk Update Leave Status
router.patch('/bulk-update', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("leaverequests");
        const { ids, status } = req.body;
        const validStatuses = ['pending', 'approved', 'rejected'];

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: 'No leave IDs provided.' });
        }
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        const objectIds = ids.filter(isValidObjectId).map(id => new ObjectId(id));
        if (objectIds.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid leave IDs provided.' });
        }

        const result = await collection.updateMany(
            { _id: { $in: objectIds } },
            { $set: { status } }
        );

        res.status(200).json({ success: true, message: `Updated ${result.modifiedCount} leave(s) to ${status}.` });
    } catch (err) {
        console.error('Error bulk updating leave status:', err);
        res.status(500).json({ success: false, message: 'Could not bulk update leave status.' });
    }
});

//  Admin: Update Leave Status (Single)
router.patch('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("leaverequests");
        const { status } = req.body;
        const validStatuses = ['pending', 'approved', 'rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid leave ID.' });
        }

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { status } },
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return res.status(404).json({ success: false, message: 'Leave request not found.' });
        }

        res.status(200).json({ success: true, message: `Leave status updated to ${status}.`, leave: result.value });
    } catch (err) {
        console.error('Error updating leave status:', err);
        res.status(500).json({ success: false, message: 'Could not update leave status.' });
    }
});

module.exports = router;
