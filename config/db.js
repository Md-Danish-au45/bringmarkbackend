const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI_DEV;

    console.log(`Connecting to MongoDB: ${uri}`);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });

    console.log("✅ MongoDB connected successfully...");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:");
    console.error(error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
