const { Router } = require("express");
const getUserById = require("./getUsers");

const router = Router();

router.get("/:id", getUserById);

module.exports = router;
