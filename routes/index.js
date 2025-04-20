const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const contactRoutes = require("./contactRoutes");

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
