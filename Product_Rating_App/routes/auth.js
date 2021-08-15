const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");

router.post("/login", authController.login);
router.use("/", authController.authorize);

module.exports = router;
