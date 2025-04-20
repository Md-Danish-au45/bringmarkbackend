const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    imageUrl: { type: String, required: true },
    imageCredit: { type: String },

    introText: { type: String, required: true },
    content: { type: String, required: true }, // Full HTML/text content

    tags: [{ type: String }],

    likes: { type: Number, default: 0 },

    // Author Information
    author: { type: String, required: true },
    authorTitle: { type: String },
    authorImage: { type: String },
    authorBio: { type: String },

    // Social Links (optional URLs)
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
