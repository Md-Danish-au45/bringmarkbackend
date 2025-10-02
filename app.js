
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

// Routes
const routes = require("./routes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: ["https://www.bringmark.com", "http://localhost:3000"], // allowed origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handle preflight requests

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Dummy user for login
const storedUser = {
  username: "admin",
  password: "123456",
};

// ✅ Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === storedUser.username && password === storedUser.password) {
    return res.status(200).json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// ✅ Contact API Route
app.post("/api/contact", (req, res) => {
  try {
    const { fullName, company, email, phoneNumber, message, budget, priority } =
      req.body;

    if (!fullName || !email || !phoneNumber || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Here you could save to DB, send email, etc.
    console.log("📩 New Contact Submission:", {
      fullName,
      company,
      email,
      phoneNumber,
      message,
      budget,
      priority,
    });

    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Other routes
app.use("/api", routes);
app.use("/api/blogs", blogRoutes);

// Error Handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
