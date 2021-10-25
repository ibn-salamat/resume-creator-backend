const { Router } = require("express");
const router = Router();
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const resumeRoutes = require("./resumes");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/resumes", resumeRoutes);

module.exports = router;
