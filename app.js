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

// CORS
app.use(cors({ origin: ['https://www.bringmark.com','http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Login route
app.post("/login", (req, res) => {
  const storedUser = { username: "admin", password: "123456" };
  const { username, password } = req.body;
  if (username === storedUser.username && password === storedUser.password)
    return res.status(200).json({ message: "Login successful!" });
  return res.status(401).json({ message: "Invalid username or password" });
});

// API routes
app.use("/api", routes);
app.use("/api/blogs", blogRoutes);

// Error handler
app.use(errorHandler);

module.exports = app; // **no app.listen()**
