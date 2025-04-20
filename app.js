const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes"); // ✅ Clean and centralized
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes); // All routes start with /api

// Error Handler
app.use(errorHandler);

module.exports = app;
