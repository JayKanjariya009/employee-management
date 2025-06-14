const { connectDb } = require('../db/connectDb');
const { ObjectId } = require('mongodb');

const editEmployee = async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("Employee");

        const { id } = req.params;
        const updateData = { ...req.body };

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        delete updateData._id; // Don't try to change _id

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "No update performed" });
        }

        res.status(200).json({ success: true, message: "Employee updated successfully" });

    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { editEmployee };
