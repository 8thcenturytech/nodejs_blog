require('dotenv').config();
const connectDB = require('../../config/db');
const Admin = require('../models/Admin.model');
const bcrypt = require('bcryptjs');

(async function(){
  try {
    await connectDB();
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
    const pwd = process.env.SEED_ADMIN_PASSWORD || 'password';
    const exists = await Admin.findOne({ email });
    if(exists) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }
    const hashed = await bcrypt.hash(pwd, 10);
    const admin = new Admin({ email, password: hashed, name: 'Administrator' });
    await admin.save();
    console.log('Admin created:', email);
    process.exit(0);
  } catch(err){
    console.error(err);
    process.exit(1);
  }
})();
