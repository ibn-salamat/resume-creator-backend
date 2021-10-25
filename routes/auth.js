const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = Router();

// sign up
router.post("/signup", async (req, res) => {
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
});

// sign in
router.post("/signin", async (req, res) => {
  try {
    // function
    function wrongData() {
      res.status(400).json({ message: "Wrong email or password.", error: {} });
    }

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
      } else wrongData();
    } else {
      wrongData();
    }
  } catch (error) {
    res.status(501).json({
      message: "Something has happened. Try again.",
      error: {
        message: error.stack,
      },
    });
  }
});

module.exports = router;
