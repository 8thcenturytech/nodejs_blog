const Admin = require("../../models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- LOGIN CONTROLLER ---
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );
    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        profileImage: admin.profileImage,
      },
    });
  } catch (err) {
    next(err);
  }
};

// --- GET ADMIN PROFILE CONTROLLER ---
// src/api/auth/auth.controller.js
exports.getAdminProfile = async (req, res) => {
  try {
    // ✅ get ID directly from token
    const admin = await Admin.findById(req.admin.id).select('name email profileImage');

    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    res.json({ admin });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// exports.getAdminById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const admin = await Admin.findById(id).select("name email");
//     if (!admin) return res.status(404).json({ error: "Admin not found" });
//     res.json({ admin });
//   } catch (err) {
//     next(err);
//   }
// };

