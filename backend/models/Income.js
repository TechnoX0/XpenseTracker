const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  icon: { type: String }, 
  wallet: { type: String, required: true }, // Add this line
  // source: { type: String }, // Make optional or remove if not needed
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Income", IncomeSchema);
