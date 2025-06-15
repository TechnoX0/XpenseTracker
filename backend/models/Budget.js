const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        limit: { type: Number, required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Budget", BudgetSchema);
