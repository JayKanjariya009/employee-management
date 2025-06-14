require('dotenv').config()
// const { cloneElement } = require('react')
const { connectDb } = require('../db/connectDb')

const express = require('express')
// const { Collection } = require('mongoose')   
const app = express()

const addEmployee = async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection("Employee");

        const Employee = req.body;

        if (!Employee.fullName || !Employee.email || !Employee.password || !Employee.position) {
            return res.status(400).json({
                success: false,
                error: "Invalid request parameters.",
                message: "Bad request. Please check the request data and try again."
            });
        }

        const result = await collection.insertOne(Employee); // FIXED

        if (!result.acknowledged) {
            return res.status(400).json({
                success: false,
                error: "Adding unsuccessful",
                message: "Error adding employee"
            });
        }

        res.status(201).json({
            success: true,
            message: "Data inserted successfully.",
            data: Employee
        });
    } catch (error) {
        console.log("Error Occurred at Adding Employee", error);

        res.status(500).json({
            success: false,
            error: "An unexpected error occurred on the server.",
            message: "Internal Server Error. Please try again later."
        });
    }
};

module.exports = { addEmployee };
