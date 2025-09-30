const Admin = require("../../models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
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
