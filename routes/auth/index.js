const { Router } = require("express");
const signUp = require("./sign-up");
const signIn = require("./sign-in");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
