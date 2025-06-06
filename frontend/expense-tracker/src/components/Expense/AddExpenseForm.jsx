import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch only expense categories
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL + "?type=expense").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (key, value) => {
    if (key === "category") {
      const selected = categories.find((cat) => cat._id === value);
      setExpense({
        ...expense,
        category: value,
        icon: selected?.icon || "",
      });
    } else {
      setExpense({ ...expense, [key]: value });
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <label>
        Category
        <select
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          className="input"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
