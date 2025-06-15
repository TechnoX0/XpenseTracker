import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL + "?type=expense").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expanses</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories && transactions?.map((expense) => {
          const cat = categories.find((category) => category._id === expense.category)

          return <TransactionInfoCard
            key={expense._id}
            title={cat.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        })}
      </div>
    </div>
  );
};

export default ExpenseList;
