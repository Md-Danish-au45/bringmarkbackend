const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // 465 ke liye true, 587 ke liye false
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL, // jis email pe notification chahiye
    subject: options.subject,
    text: options.message,
    html: options.html, // agar HTML email bhejna ho
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
