const Category = require('../../models/Category.model');
const slugify = require('../../utils/slugify');

exports.list = async (req, res, next) => {
  const cats = await Category.find().sort('-createdAt');
  res.json({ categories: cats });
};

exports.create = async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);
  const exists = await Category.findOne({ slug });
  if(exists) return res.status(400).json({ error: 'Category exists' });
  const cat = await Category.create({ name, slug });
  res.status(201).json(cat);
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ ok:true });
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const update = {};
  if (name) {
    update.name = name;
    update.slug = slugify(name);
  }
  if (description !== undefined) {
    update.description = description;
  }
  try {
    const updated = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ category });
  } catch (err) {
    next(err);
  }
};