const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://gharatraj7219:raj2424@cluster0.htlr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/TechTinder"
      );
      
};

module.exports = connectDB;