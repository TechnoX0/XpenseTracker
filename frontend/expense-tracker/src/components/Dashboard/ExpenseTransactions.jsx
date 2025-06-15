import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ExpenseTransactions = ({transactions, onSeeMore}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch only expense categories
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL + "?type=expense").then((res) => {
      setCategories(res.data);
    });

  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {categories && transactions?.slice(0,5)?.map((expense) => {
          const cat = categories.find((category) => category._id === expense.category)
          
          return (<TransactionInfoCard
            key={expense._id}
            title={cat.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />)
        })}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
