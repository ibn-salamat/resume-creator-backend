const { Router } = require("express");
const User = require("../models/user");
const { Mongoose } = require("mongoose");

const router = Router();

// get user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select(
      "name email gender lastname birthday resumes._id resumes.title"
    );
    res.json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: "User is not found", error: error.stack });
  }
});

// get users list
router.get("/list/:length", async (req, res) => {
  const { length } = req.params;

  try {
    if (length != "all") throw new Error("Invalid length of users");
    let users = await User.find().select("name lastname resumes").lean();

    res.status(200).json({
      message: "Success",
      data: users,
      length: users.length,
    });
  } catch (error) {
    res
      .status(400)
      .json({
        message: error.message || "Something has happened. Try again.",
        error: error.stack,
      });
  }
});

module.exports = router;
