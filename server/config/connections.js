const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI ||"mongodb+srv://benbrechter3:W2O308Q15ALz6NOY@benbeejammin.7e5q1.mongodb.net/test"

const connectDB = async () => {
  // Only connect if not already connected
  if (mongoose.connection.readyState === 0) {
    try {
      const conn = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'test', // Your database name
        // Add these for better connection management in serverless
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4 // Use IPv4, can help with some network issues
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      throw error; // Rethrow to let Lambda handle the error
    }
  }
  return mongoose.connection;
};

module.exports = connectDB;