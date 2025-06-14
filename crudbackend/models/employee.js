const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    position: {
        type: String,
    },
    password: {
        type: String
    },
    phone: {
        type: Number,

    },
    dob: {
        type: Date
    },
    gender: {
        type: String, enum: ['Male', 'Female', 'Other']
    },
    position: {
        type: String
    },
    department: {
        type: String
    },
    joiningDate: {
        type: Date
    },
    address: {
        type: String
    },
    profilePic: {
        type: String
    }, // URL

}, {
    timestamps: true
})

module.exports =  mongoose.model('Employee', employeeSchema)