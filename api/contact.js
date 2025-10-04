const serverless = require("serverless-http");
const app = require("../app");
const connectDB = require("../config/db");

// Connect to MongoDB once
connectDB();

module.exports = serverless(app);
