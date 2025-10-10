const Post = require('../../models/Post.model');
const Category = require('../../models/Category.model');
const slugify = require('../../utils/slugify');

// 🧩 List posts
exports.list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const skip = (page - 1) * limit;
    const q = {};

    if (req.query.category) {
      const cat = await Category.findOne({ slug: req.query.category });
      if (cat) q.category = cat._id;
    }

    q.isPublished = true;
    const total = await Post.countDocuments(q);
    const posts = await Post.find(q)
      .populate('category', 'name slug')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    res.json({
      data: posts,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// 🧩 Get post by slug
exports.getBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('category', 'name slug');

    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json({ data: post });
  } catch (err) {
    next(err);
  }
};

// 🧩 Create post (with image upload)
exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const slug = slugify(body.title);
    const exists = await Post.findOne({ slug });
    const uniqueSlug = exists ? `${slug}-${Date.now()}` : slug;

    // Ensure category exists
    const cat = await Category.findById(body.category);
    if (!cat) return res.status(400).json({ error: 'Category not found' });

    // Cloudinary image URL (if file uploaded)
    const imageUrl = req.file ? req.file.path : body.image; // works for both Editor and form uploads

    const post = await Post.create({
      ...body,
      slug: uniqueSlug,
      image: imageUrl,
      createdBy: req.admin.id,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// 🧩 Update post (with optional new image)
exports.update = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL for new image
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// 🧩 Delete post
exports.remove = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

// 🧩 Increment view count
exports.incrementView = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json({ views: post.views });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating views' });
  }
};
