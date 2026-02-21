const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "👉🏻YOUR CONNECTION URL👈🏻"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
