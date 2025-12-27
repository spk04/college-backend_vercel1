const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://preveenspk_db_user:1MyW6ABFu1IrMwVg@collegecluster.3uayeia.mongodb.net/?appName=CollegeCluster"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
