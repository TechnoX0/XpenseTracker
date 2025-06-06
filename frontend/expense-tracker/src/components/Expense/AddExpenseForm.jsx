import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { FaHome, FaShoppingCart, FaLightbulb, FaCar, FaFilm, FaQuestion } from "react-icons/fa";

// Map categories to icons
const categoryIcons = {
  Rent: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3e0.png", // 🏠
  Groceries: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f6d2.png", // 🛒
  Utilities: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4a1.png", // 💡
  Transport: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f697.png", // 🚗
  Entertainment: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3ac.png", // 🎬
  Other: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2753.png", // ❓
};

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    if (key === "category") {
      setIncome({
        ...income,
        category: value,
        icon: categoryIcons[value] || "",
      });
    } else {
      setIncome({ ...income, [key]: value });
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <label>
        Category
        <select
          value={income.category}
          onChange={({ target }) => handleChange("category", target.value)}
          className="input"
        >
          <option value="">Select category</option>
          <option value="Rent">Rent 🏠</option>
          <option value="Groceries">Groceries 🛒</option>
          <option value="Utilities">Utilities 💡</option>
          <option value="Transport">Transport 🚗</option>
          <option value="Entertainment">Entertainment 🎬</option>
          <option value="Other">Other ❓</option>
        </select>
      </label>

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(income)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
