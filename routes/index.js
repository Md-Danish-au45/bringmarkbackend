const express = require("express");
const router = express.Router();

const contactRoutes = require("./contactRoutes");

router.use("/contact", contactRoutes);

module.exports = router;
