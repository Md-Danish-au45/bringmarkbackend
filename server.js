const serverless = require("serverless-http");
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB (Vercel automatically runs async functions on first request)
connectDB();

module.exports.handler = serverless(app);
