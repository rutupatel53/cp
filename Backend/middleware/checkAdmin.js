// Example code for checking admin role based on decoded JWT token

const User = require("../models/user");

const checkAdmin = async (req, res, next) => {
  try {
    // Get user by ID from decoded token
    const user = await User.findById(req.userId);

    // Check if user exists and has admin role
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next(); // User is admin, proceed to next middleware
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkAdmin;
