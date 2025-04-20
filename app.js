const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes"); // ✅ Clean and centralized
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
// Manually set credentials
const storedUser = {
  username: "admin",
  password: "123456",
};

// Middlewares
app.use(express.json());
app.use(cors());
// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === storedUser.username && password === storedUser.password) {
    return res.status(200).json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});
// Routes
app.use("/api", routes); // All routes start with /api

// Error Handler
app.use(errorHandler);

module.exports = app;
