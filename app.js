const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['https://www.bringmark.com','http://localhost:3000'], // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Enable credentials if necessary (cookies, authorization headers)
};

app.use(cors(corsOptions)); // Use the configured CORS options

// Manually set credentials
const storedUser = {
  username: "admin",
  password: "123456",
};

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("/api/blogs", blogRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
