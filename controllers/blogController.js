const Blog = require("../models/Blog");
const multer = require("multer");
const path = require("path");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: "Blog not found" });
  }
};

// Configure storage for uploaded files
// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.fields([
  { name: "imageUrlFile", maxCount: 1 },
  { name: "authorImageFile", maxCount: 1 },
]);

exports.createBlog = async (req, res) => {
  try {
    const { title, introText, content, author, tags = [], ...rest } = req.body;

    // Process uploaded files
    const imageUrl = req.files?.imageUrlFile?.[0]?.path;
    const authorImage = req.files?.authorImageFile?.[0]?.path;

    // Create blog data object
    const blogData = {
      title,
      introText,
      content,
      author,
      imageUrl,
      imageCredit: rest.imageCredit || "",
      tags: Array.isArray(tags) ? tags : [],
      authorTitle: rest.authorTitle || "",
      authorBio: rest.authorBio || "",
      authorImage: authorImage || "",
      socialLinks: {
        twitter: rest.socialLinks?.twitter || "",
        linkedin: rest.socialLinks?.linkedin || "",
        website: rest.socialLinks?.website || "",
      },
    };

    // Validate required fields
    if (
      !blogData.title ||
      !blogData.introText ||
      !blogData.content ||
      !blogData.author ||
      !blogData.imageUrl
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBlog = new Blog(blogData);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);

    // Handle duplicate key errors specifically
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: `Blog with this ${field} already exists`,
        field,
        error: err.message,
      });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add this to your exports
exports.upload = upload.fields([
  { name: "imageUrlFile", maxCount: 1 },
  { name: "authorImageFile", maxCount: 1 },
]);

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(404).json({ message: "Blog not found" });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(404).json({ message: "Blog not found" });
  }
};
