import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    wallet: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    // Fetch only wallet categories
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL + "?type=wallet").then((res) => {
      setWallets(res.data);
    });
  }, []);

  const handleChange = (key, value) => {
    if (key === "wallet") {
      const selected = wallets.find((cat) => cat._id === value);
      setIncome({
        ...income,
        wallet: value,
        icon: selected?.icon || "",
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
        Wallet
        <select
          value={income.wallet}
          onChange={({ target }) => handleChange("wallet", target.value)}
          className="input"
        >
          <option value="">Select wallet</option>
          {wallets.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
