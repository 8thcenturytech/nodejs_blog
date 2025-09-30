const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coverImage: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  readTime: { type: String },
  subtitles: [String],
  writer: {
    name: { type: String, required: true },
    profileImage: { type: String }
  },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  meta: { excerpt: String, tags: [String] }
}, { timestamps: true });
PostSchema.index({ title: 'text', content: 'text', 'meta.excerpt': 'text' });
module.exports = mongoose.model('Post', PostSchema);
