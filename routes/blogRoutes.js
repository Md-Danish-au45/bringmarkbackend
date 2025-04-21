const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Create blog with file upload
router.post("/", blogController.uploadMiddleware, blogController.createBlog);

// Other routes
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
