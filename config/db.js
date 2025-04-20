const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const environment = process.env.NODE_ENV || "development";
    const uri =
      environment === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;

    console.log(`NODE_ENV: ${environment}`);
    console.log(`Connecting to MongoDB (${environment}): ${uri}`);

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully...");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
