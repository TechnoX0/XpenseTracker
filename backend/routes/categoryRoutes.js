const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/add", protect, addCategory);
router.get("/get", protect, getCategories);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;