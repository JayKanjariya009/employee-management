const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authmiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

// Example admin-only route
router.get("/", authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to the admin dashboard.",
        user: req.user
    });
});

module.exports = router;
