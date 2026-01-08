const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Create blog with file upload
router.post("/", blogController.uploadMiddleware, blogController.createBlog);

// Get all blogs
router.get("/", blogController.getAllBlogs);

// ✅ Slug route FIRST (no /slug prefix)
router.get("/:slug", blogController.getBlogBySlug);

// ID routes (move them to another path)
router.get("/id/:id", blogController.getBlogById);
router.put("/id/:id", blogController.updateBlog);
router.delete("/id/:id", blogController.deleteBlog);


module.exports = router;