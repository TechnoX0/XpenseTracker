const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["income", "expense", "wallet"], 
    required: true 
  },
  icon: { type: String }, // URL or emoji for the category
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional: for user-specific categories
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);