const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Example code for generating and sending JWT token upon successful login

      const jwt = require("jsonwebtoken");
      const bcrypt = require("bcrypt");
      const User = require("./models/user");

      // Function to handle user login
      async function login(req, res) {
        const { email, password } = req.body;

        try {
          // Find user by email
          const user = await User.findOne({ email });

          // If user not found
          if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
          }

          // Verify password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
          }

          // Generate JWT token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          // Send token in response
          res.status(200).json({ token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
      }

      module.exports = { login };

      return res.status(401).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginController;
