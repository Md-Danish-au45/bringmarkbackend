const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("../routes");
const errorHandler = require("../middleware/errorHandler");
const bodyParser = require("body-parser");
const blogRoutes = require("../routes/blogRoutes");
const path = require("path");

dotenv.config();

const app = express();

// ✅ CORS config (Vercel me kaam karega)
const corsOptions = {
  origin: ["https://www.bringmark.com", "http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Dummy login API
const storedUser = {
  username: "admin",
  password: "123456",
};
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === storedUser.username && password === storedUser.password) {
    return res.status(200).json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Routes
app.use("/api", routes);
app.use("/api/blogs", blogRoutes);

// Error handler
app.use(errorHandler);

// ✅ Vercel requires an exported handler
module.exports = app;
