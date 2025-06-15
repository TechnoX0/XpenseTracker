import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { BudgetList } from "../../components/Budget/BudgetList";
import Modal from "../../components/Modal";
import AddBudgetForm from "../../components/Budget/AddBudgetForm";
import toast from "react-hot-toast";

function Budget() {
    const [budgets, setBudgets] = useState();
    const [ formOpen, setFormOpen ] = useState(false)   

    async function addBudget(budget) {
        if (!budget.categoryId) {
            toast.error("Please select a Category")
            return
        }

        if (!budget || isNaN(budget.limit) || Number(budget.limit) <= 0) {
            toast.error("Limit should be a valid number greater than 0.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.BUDGET.ADD, {
                limit: budget.limit,
                categoryId: budget.categoryId,
            }).then((res => {
                setBudgets(res.data)
                console.log(res)
            }));

            setFormOpen(false);
            toast.success("Expense added successfully");
        } catch (error) {
            console.error(
                "Error adding expense:",
                error.response?.data?.message || error.message
            );
        }
    }

    async function deleteItem(budgetId) {
        await axiosInstance.delete(API_PATHS.BUDGET.DELETE(budgetId)).then((res) => {
            toast.success(res.data.message)
            setBudgets(res.data.budgets)
        });
    }

    useEffect(() => {
        console.log(budgets)
    }, [budgets])

    useEffect(() => {
        axiosInstance.get(API_PATHS.BUDGET.GET_ALL).then((res) => {
            setBudgets(res.data);
        });
    }, []);

  return (
    <DashboardLayout activeMenu="Budget">
        <div className="py-8">
            <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={"Add Budget"}>
                <AddBudgetForm onAddBudget={(budget) => addBudget(budget)} />
            </Modal>
            <BudgetList budgets={budgets} onDelete={deleteItem} onClick={() => setFormOpen(true)} />
        </div>
    </DashboardLayout>
  )
}

export default Budget