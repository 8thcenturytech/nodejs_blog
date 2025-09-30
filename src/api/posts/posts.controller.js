const Post = require('../../models/Post.model');
const Category = require('../../models/Category.model');
const slugify = require('../../utils/slugify');

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page||1);
  const limit = parseInt(req.query.limit||10);
  const skip = (page-1)*limit;
  const q = {};
  if(req.query.category) {
    const cat = await Category.findOne({ slug: req.query.category });
    if(cat) q.category = cat._id;
  }
  q.isPublished = true;
  const total = await Post.countDocuments(q);
  const posts = await Post.find(q).populate('category','name slug').sort('-createdAt').skip(skip).limit(limit);
  res.json({ data: posts, meta:{ page, limit, total, pages: Math.ceil(total/limit) }});
};

exports.getBySlug = async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('category','name slug');
  if(!post) return res.status(404).json({ error:'Not found' });
  res.json(post);
};

exports.create = async (req, res, next) => {
  const body = req.body;
  const slug = slugify(body.title);
  const exists = await Post.findOne({ slug });
  const uniqueSlug = exists ? `${slug}-${Date.now()}` : slug;
  // ensure category exists
  const cat = await Category.findById(body.category);
  if(!cat) return res.status(400).json({ error: 'Category not found' });
  const post = await Post.create({
    ...body,
    slug: uniqueSlug,
    createdBy: req.admin.id
  });
  res.status(201).json(post);
};

exports.update = async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(post);
};

exports.remove = async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ ok:true });
};
