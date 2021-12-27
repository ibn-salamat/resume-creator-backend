const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function wrongData(res) {
    res.status(400).json({ message: "Wrong email or password.", error: {} });
  }

async function signIn (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("password");
  
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          const userId = user._id;
          const jwtSecret = config.get("jwtSecret");
  
          const token = jwt.sign({ userId }, jwtSecret, {
            expiresIn: "14d",
          });
          res.json({ message: "Success", token, userId });
        } else wrongData(res);
      } else {
        wrongData(res);
      }
    } catch (error) {
      res.status(501).json({
        message: "Something has happened. Try again.",
        error: {
          message: error.stack,
        },
      });
    }
  }

module.exports = signIn;