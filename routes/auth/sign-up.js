const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function signUp (req, res) {
    try {
      const { email, password, name, lastname, gender } = req.body;
      const newUser = { email, password, name, lastname, gender };
  
      const candidate = await User.findOne({ email });
  
      if (candidate) {
        res.status(400).json({
          message: "User has been created with this email.",
          error: {},
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ ...newUser, password: hashedPassword });
  
        await user.save();
        res.status(200).json({ message: "User has been created successfully." });
      }
    } catch (error) {
      res.status(400).json({
        message: "Something has happened. Try again.",
        error: {
          message: error.stack,
        },
      });
    }
  }


  module.exports = signUp;