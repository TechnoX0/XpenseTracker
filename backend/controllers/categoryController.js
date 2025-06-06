const Category = require("../models/Category");

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name, type, icon } = req.body;
    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }
    const category = new Category({
      name,
      type,
      icon,
      userId: req.user.id, // Optional: for user-specific categories
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Categories (optionally filter by type)
exports.getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { userId: req.user.id };
    if (type) filter.type = type;
    const categories = await Category.find(filter).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name, type, icon } = req.body;
    const updated = await Category.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, type, icon },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};