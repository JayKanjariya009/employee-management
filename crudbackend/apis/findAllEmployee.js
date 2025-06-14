const { connectDb } = require('../db/connectDb');

let FindAllEmployees = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("Employee");  // fixed typo

    const search = req.query.search || "";
    const filter = search
      ? {
        $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { position: { $regex: search, $options: 'i' } },
        ],
      }
      : {};

    let employees = await collection.find(filter).toArray();

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Data retrieved successfully.",
      data: employees,  // sending the array in 'data'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { FindAllEmployees };


