const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { connectDb } = require('../db/connectDb')

const signin = async (req, res) => {
    try {
        const db = await connectDb()
        const collection = db.collection("Users")

        const { email, password } = req.body


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Invalid request parameters.",
                message: "Please fill out all fields."
            });

        }
        const existing = await collection.findOne({ email })
        if (!existing) {
            return res.status(409).json({
                success: false,
                error: "Conflict error.",
                message: "Please create Account"
            });

        }
        const isMatch = await bcrypt.compare(password, existing.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: "Invalid request parameters.",
                message: "Incorrect Password try again."
            });
        }

        const token = jwt.sign({
            userId: existing._id,
            email: existing.email,
            role: existing.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
        )

        return res.status(200).json({
            success: true,
            message: "Signed In successfully.",
            token: token,
            user: {
                name: existing.name,
                email: existing.email,
                role: existing.role
            }

        });



    } catch (error) {
        console.error("Error during sign in", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}


module.exports = { signin }