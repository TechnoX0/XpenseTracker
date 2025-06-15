import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../Inputs/Input";

const AddBudgetForm = ({ onAddBudget }) => {
  const [expense, setExpense] = useState({
    limit: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
    <div className="flex flex-col gap-4">
      <label className="flex gap-2 bg-slate-100 px-[16px] py-[12px] rounded-[0.25rem]">
        Category
        <select
          value={expense.categoryId}
          onChange={({ target }) => {
            handleChange("categoryId", target.value)
          }}
          className="input"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("limit", target.value)}
        label="Limit"
        type="number"
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddBudget(expense)}
        >
          Add Budget
        </button>
      </div>
    </div>
  );
};

export default AddBudgetForm;
