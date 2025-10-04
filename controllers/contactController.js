const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

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

    // ✅ Email send karna
    await sendEmail({
      subject: "New Contact Form Submission",
      message: `
        Name: ${fullName}
        Company: ${company}
        Email: ${email}
        Phone: ${phoneNumber}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({
      message: "Contact form submitted successfully & email sent.",
      data: newContact,
    });

  } catch (error) {
    next(error);
  }
};
