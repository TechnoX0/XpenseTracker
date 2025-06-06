import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

// Map wallets to emoji image URLs
const walletIcons = {
  Allowance: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b8.png", // 💸
  Savings: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3e6.png", // 🏦
  Credit: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b3.png", // 💳
  Debit: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3e7.png", // 🏧
  Salary: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4bc.png", // 💼
};

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    wallet: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    if (key === "wallet") {
      setIncome({
        ...income,
        wallet: value,
        icon: walletIcons[value] || "",
      });
    } else {
      setIncome({ ...income, [key]: value });
    }
  };

  return (
    <div>

      <label>
        Wallet
        <select
          value={income.wallet}
          onChange={({ target }) => handleChange("wallet", target.value)}
          className="input"
        >
          <option value="">Select wallet</option>
          <option value="Allowance">Allowance 💸</option>
          <option value="Savings">Savings 🏦</option>
          <option value="Credit">Credit 💳</option>
          <option value="Debit">Debit 🏧</option>
          <option value="Salary">Salary 💼</option>
        </select>v
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
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
