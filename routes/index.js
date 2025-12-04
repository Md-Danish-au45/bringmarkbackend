const express = require("express");
const router = express.Router();

const contactRoutes = require("./contactRoutes");
const Faqs = require("./contactRoutes");

router.use("/contact", contactRoutes);
router.use("/", Faqs);

module.exports = router;
