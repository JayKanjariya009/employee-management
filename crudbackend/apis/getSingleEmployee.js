const { connectDb } = require('../db/connectDb');
const { ObjectId } = require('mongodb');

const getSingleEmployee = async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection("Employee");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const employee = await collection.findOne({ _id: new ObjectId(id) });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json(employee);

  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getSingleEmployee };
