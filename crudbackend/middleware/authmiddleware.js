const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized access.",
      message: "Access denied. Please provide valid credentials.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "undefined") {
    return res.status(401).json({
      success: false,
      error: "Unauthorized access.",
      message: "Access denied. Invalid token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // ✅ store decoded token (with id, email, role) in req.user
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error: "Unauthorized access.",
      message: "Access denied. Please provide valid credentials.",
    });
  }
};

module.exports = { authMiddleware };
