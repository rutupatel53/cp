const User = require("../../models/user");

const getUserController = async (req, res) => {
  try {
    // Ensure req.userId is valid
    const userId = req.userId;

    // Retrieve user from the database using the userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getUserController;
