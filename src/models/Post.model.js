const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    // ✅ Main image stored on Cloudinary
    image: { type: String }, // replaces or aliases 'coverImage'

    // Optional alias for compatibility (if you still use 'coverImage' elsewhere)
    coverImage: { type: String },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    readTime: { type: String },
    subtitles: [String],

    writer: {
      name: { type: String, required: true },
      profileImage: { type: String },
    },

  // Store full Editor.js output (object with blocks, time, version)
  content: { type: mongoose.Schema.Types.Mixed, required: true },
    isPublished: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    meta: {
      excerpt: String,
      tags: [String],
    },

    // ✅ Track views (auto-increment on each read)
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ Text index for search functionality
PostSchema.index({ title: "text", content: "text", "meta.excerpt": "text" });

module.exports = mongoose.model("Post", PostSchema);
