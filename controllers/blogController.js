const Blog = require("../models/Blog");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

// Memory storage (no local disk save)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

exports.uploadMiddleware = upload.fields([
  { name: "imageUrlFile", maxCount: 1 },
  { name: "authorImageFile", maxCount: 1 },
]);

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

exports.createBlog = async (req, res) => {
  try {
    const { title, introText, content, author, tags = [], ...rest } = req.body;

    // Validate required fields first
    if (!title || !introText || !content || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = "";
    let authorImage = "";

    // Upload images to Cloudinary if they exist
    try {
      if (req.files?.imageUrlFile?.[0]) {
        const result = await uploadToCloudinary(
          req.files.imageUrlFile[0].buffer,
          "blogs"
        );
        imageUrl = result.secure_url;
      }

      if (req.files?.authorImageFile?.[0]) {
        const result = await uploadToCloudinary(
          req.files.authorImageFile[0].buffer,
          "blogs/authors"
        );
        authorImage = result.secure_url;
      }
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({
        message: "Error uploading images",
        error: uploadError.message,
      });
    }

    // Validate that imageUrl is present if required
    if (!imageUrl) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    // Create blog data object
    const blogData = {
      title,
      introText,
      content,
      author,
      imageUrl,
      imageCredit: rest.imageCredit || "",
      tags: Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim()),
      authorTitle: rest.authorTitle || "",
      authorBio: rest.authorBio || "",
      authorImage: authorImage || "",
      socialLinks: {
        twitter: rest.socialLinks?.twitter || "",
        linkedin: rest.socialLinks?.linkedin || "",
        website: rest.socialLinks?.website || "",
      },
    };

    const newBlog = new Blog(blogData);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error creating blog:", err);

    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: `Blog with this ${field} already exists`,
        field,
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: "Blog not found" });
  }
};

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

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(404).json({ message: "Blog not found" });
  }
};
