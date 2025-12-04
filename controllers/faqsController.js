const FAQ = require("../models/faqsModel");

// Create FAQ
exports.createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All FAQs with filters
exports.getFAQs = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const faqs = await FAQ.find(filter);

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      message: "FAQ updated",
      data: faq,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "FAQ deleted",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
