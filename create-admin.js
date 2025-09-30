const bcrypt = require("bcrypt");
const Admin = require("./src/models/Admin.model");  // adjust path if needed
const connectDB = require("./config/db"); // import your db connect
require('dotenv').config();

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("Password1#", 10);

    const admin = new Admin({
      email: "worgubelieve@gmail.com",
      password: hashedPassword,
      name: "Believe", // optional, will default to "Administrator"
      profileImage: "https://example.com/avatar.png" // optional
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
