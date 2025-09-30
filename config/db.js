const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in env');
  
  mongoose.set('strictQuery', false);
  
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};