const { Router } = require("express");
const getUser = require("./getUser");
const getUsers = require("./getUsers");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
