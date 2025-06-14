const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // Allow access
    } else {
        return res.status(403).json({
            success: false,
            error: "Forbidden",
            message: "Access denied. Admins only.",
        });
    }
};

module.exports = { adminMiddleware };
