const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Create blog with file upload
router.post("/", blogController.uploadMiddleware, blogController.createBlog);

// Get all blogs
router.get("/", blogController.getAllBlogs);

// ⭐ Slug-based route (ye ID route se PEHLE hona chahiye)
router.get("/slug/:slug", blogController.getBlogBySlug);

// ID-based routes
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;