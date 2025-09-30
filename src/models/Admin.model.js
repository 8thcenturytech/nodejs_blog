const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Administrator' },
  profileImage: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Admin', AdminSchema);
