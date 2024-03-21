// // Example code for authentication middleware to verify JWT token

// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   // Get token from header
//   const token = req.header("Authorization");

//   // Check if token exists
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

//     // Set user ID in request object
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// module.exports = auth;
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Set user ID in request object
    req.userId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
