const express = require("express");
const { createFAQ, deleteFAQ, getFAQs, updateFAQ } = require("../controllers/faqsController");


const router = express.Router();

router.post("/", createFAQ);
router.get("/", getFAQs);
router.put("/:id", updateFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router