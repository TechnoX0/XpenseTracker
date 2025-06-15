const Budget = require("../models/Budget");

// Add Category
exports.addBudget = async (req, res) => {
    try {
        const { limit, categoryId } = req.body;
        if (!limit || !categoryId) {
            return res
                .status(400)
                .json({ message: "All fields must be present!" });
        }
        const budget = new Budget({
            limit,
            categoryId,
        });
        await budget.save();
        res.status(201).json(await Budget.find({}));
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Categories (optionally filter by type)
exports.getBudgets = async (req, res) => {
    try {
        const budget = await Budget.find({});
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get All Categories (optionally filter by type)
exports.getBudgetById = async (req, res) => {
    try {
        const budgetId = req.id;
        const budget = await Budget.find({ budgetId });
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Update Category
// exports.updateCategory = async (req, res) => {
//     try {
//         const { name, type, icon } = req.body;
//         const updated = await Category.findOneAndUpdate(
//             { _id: req.params.id, userId: req.user.id },
//             { name, type, icon },
//             { new: true }
//         );
//         if (!updated)
//             return res.status(404).json({ message: "Category not found" });
//         res.json(updated);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// Delete Category
exports.deleteBudget = async (req, res) => {
    try {
        const deleted = await Budget.findOneAndDelete({
            _id: req.params.id,
        });
        if (!deleted)
            return res.status(404).json({ message: "Budget not found" });
        res.json({ message: "Budget deleted", budgets: await Budget.find({}) });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
