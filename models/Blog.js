const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    imageUrl: { type: String,
       },
    imageCredit: { type: String },
    introText: { type: String },
    content: { type: String,  },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    author: { type: String },
    authorTitle: { type: String },
    authorImage: { type: String },
    authorBio: { type: String },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);

// Add pre-save hook to generate slug
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
