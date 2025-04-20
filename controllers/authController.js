const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const twilio = require("twilio");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

// Initialize Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Step 1: Send OTP
exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    let user = await User.findOne({ phoneNumber });

    // Generate OTP and expiry time
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp.toString(), salt);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

    if (!user) {
      user = new User({ phoneNumber, otp: hashedOtp, otpExpiresAt });
    } else {
      user.otp = hashedOtp;
      user.otpExpiresAt = otpExpiresAt;
    }

    await user.save();

    // Send OTP using Twilio
    await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Step 2: Verify OTP
exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    const isOtpExpired = user.otpExpiresAt < Date.now();

    if (!isOtpValid || isOtpExpired) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    user.otpExpiresAt = undefined;

    await user.save();

    // You can issue a token (JWT) here if required for session handling
    res.status(200).json({ message: "Phone number verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
