// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const bcrypt = require('bcryptjs')

const { connectDb } = require('../db/connectDb')

const signup = async (req, res) => {
    try {
        const db = await connectDb()
        const collection = db.collection("Users")

        const { name, email, password, role = "user" } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Invalid request parameters.",
                message: "All fields are requires"
            });
        }
        const existing = await collection.findOne({ email });
        if (existing) {
            return res.status(409).json({
                success: false,
                error: "Conflict error.",
                message: "Email already exists."
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await collection.insertOne({ name, email, password: hashedPassword })
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully.",

        });


    } catch (error) {
        console.log("Error Occured While Signing UP", error);

    }
}
module.exports = { signup }