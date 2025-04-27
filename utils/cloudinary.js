require("dotenv").config(); // Add this at the top
const cloudinary = require("cloudinary").v2;

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌ Cloudinary configuration missing!");
  console.log("Please check your .env file has these variables:");
  console.log("CLOUDINARY_CLOUD_NAME");
  console.log("CLOUDINARY_API_KEY");
  console.log("CLOUDINARY_API_SECRET");
  throw new Error("Cloudinary configuration missing");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("✔️ Cloudinary configured successfully");

module.exports = cloudinary;
