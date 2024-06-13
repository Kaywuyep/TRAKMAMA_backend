// connect to database
const mongoose = require("mongoose");

db = process.env.DB_URI

const connectDB = async () => {
    try {
      await mongoose.connect(db);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;