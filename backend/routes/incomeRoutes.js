const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
  getWalletTotals
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);
router.get("/wallet-totals", protect, getWalletTotals);

module.exports = router;
