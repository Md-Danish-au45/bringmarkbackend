const Contact = require("../models/Contact");

exports.submitContactForm = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, message, company } = req.body;

    if (!fullName || !email || !phoneNumber || !message || !company) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = await Contact.create({
      fullName,
      email,
      phoneNumber,
      message,
      company,
    });

    res.status(201).json({
      message: "Contact form submitted successfully.",
      data: newContact,
    });
    console.log(newContact, "datas");
  } catch (error) {
    next(error);
  }
};
