const { Router } = require("express");
const Resume = require("../models/resume");
const User = require("../models/user");

const router = Router();

// сreate / update
router.post("/save/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id == 0) {
      const resumeData = { ...req.body };
      const newResume = new Resume(resumeData);

      newResume.id = await newResume.validate().catch((error) => {
        console.log(error);
        throw new Error("validate");
      });

      const author = await User.findById(newResume.authorId).select("resumes");
      author.resumes.push(newResume);
      await User.findByIdAndUpdate(newResume.authorId, {
        resumes: author.resumes,
      });

      res.status(200).json({
        message: "Successful created",
      });
    } else {
      const users = await User.find().select("resumes");
      const resumes = [];
      users.map((user) => user.resumes.map((resume) => resumes.push(resume)));

      let resume = resumes.find((resume) => resume._id == id);
      if (!resume) throw new Error("Resume is not found!");
      resume = { ...req.body };
      delete resume.id;

      let updatedResumes = resumes
        .filter((_resume) => _resume.authorId == resume.authorId)
        .map((_resume) => {
          if (_resume._id == id) {
            _resume = { ..._resume, ...resume };
          }
          return _resume;
        });
      await User.findByIdAndUpdate(resume.authorId, {
        resumes: updatedResumes,
      });
      res.json({ message: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: error.message,
      error: {
        message: error.stack,
      },
    });
  }
});

// delete
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const current = await Resume.findByIdAndDelete(id);

    if (!current) throw new Error("Resume is not found!");

    res.status(200).json({
      message: "Successful deleted.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something has happened. Try again.",
      error: {
        message: error.stack,
      },
    });
  }
});

// get resume by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const users = await User.find().select("resumes").lean();
    const resumes = [];
    users.map((user) => user.resumes.map((resume) => resumes.push(resume)));
    const resume = resumes.find((resume) => resume._id == id);

    if (resume) {
      res.json({ message: "Success", data: resume });
    } else {
      throw new Error("Resume is not found.");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something has happened. Try again.",
      error: {
        message: error.stack,
      },
    });
  }
});

// get resumes
router.get("/list/:length", async (req, res) => {
  const { length } = req.params;

  try {
    if (length != "all") throw new Error("Invalid length of resumes");
    const users = await User.find()
      .select(
        "resumes"
      )
      .lean();
      
    const resumes = [];
    users.map((user) => user.resumes.map((resume) => resumes.push(resume)));

    res.json({ message: "Success", data: resumes });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something has happened. Try again.",
      error: error.stack,
    });
  }
});

module.exports = router;
