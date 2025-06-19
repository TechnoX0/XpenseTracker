import moment from "moment"
import BudgetInfoCard from "./BudgetInfoCard"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

export const BudgetList = ({budgets, onDelete, onClick}) => {
    const [categories, setCategories] = useState();
    const [expenses, setExpenses] = useState();
    
    useEffect(() => {
        axiosInstance.get(API_PATHS.CATEGORY.GET_ALL + "?type=expense").then((res) => {
            setCategories(res.data);
        });
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE).then((res) => {
            setExpenses(res.data);
        });
    }, []);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">All Budget</h5>
                <button className="card-btn" onClick={onClick}>
                    Add
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {(budgets && categories && expenses) && budgets?.map((budget) => {
                    const category = categories.find((cat) => cat._id === budget.categoryId)
                    const categoryExpenses = expenses.filter((expense) => expense.category === category._id)
                    const totalExpense = categoryExpenses.reduce((acc, curr) => acc + curr.amount, 0)

                    console.log(category)

                    return <BudgetInfoCard
                        key={budget._id}
                        icon={category.icon}
                        title={category.name}
                        date={moment(budget.date).format("Do MMM YYYY")}
                        amount={budget.limit - totalExpense}
                        onDelete={() => onDelete(budget._id)}
                    />
                })}
            </div>
        </div>
    )
}
