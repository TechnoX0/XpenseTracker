import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [ budgets, setBudgets ] = useState()
  const [ expenses, setExpenses ] = useState()
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "expense", // default to expense
    icon: "",
  });

  // Fetch categories
  const fetchData = async () => {
    try {
      const categories = await axiosInstance.get(API_PATHS.CATEGORY.GET_ALL);
      const budgets = await axiosInstance.get(API_PATHS.BUDGET.GET_ALL);
      const expenses = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setCategories(categories.data);
      setBudgets(budgets.data);
      setExpenses(expenses.data);
    } catch (error) {
      toast.error("Failed to fetch categories: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add category handler
  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.CATEGORY.ADD, newCategory);
      toast.success("Category added!");
      setOpenAddModal(false);
      setNewCategory({ name: "", type: "expense", icon: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to add category: ", error);
    }
  };

  // Delete category handler
  const handleDeleteCategory = async (id) => {
    try {
      fetchData()

      for (const budget of budgets) {
        if (budget.categoryId === id) await axiosInstance.delete(API_PATHS.BUDGET.DELETE(budget._id));
      }

      for (const expense of expenses) {
        if (expense.category === id) await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expense._id));
      }
      
      await axiosInstance.delete(API_PATHS.CATEGORY.DELETE(id));
      toast.success("Category deleted!");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete category: ", error);
    }
  };

  // Filter categories
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const walletCategories = categories.filter((cat) => cat.type === "wallet");

  return (
    <DashboardLayout activeMenu="Categories">
      <div className="flex flex-col gap-12 my-5 mx-auto max-w-4xl text-text">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            className="add-btn add-btn-fill"
            onClick={() => setOpenAddModal(true)}
          >
            + Add Category/Wallet
          </button>
        </div>

        {/* Expense Categories Table */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold pl-4">Expense Categories</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white rounded shadow border border-gray-200 text-opposite-text">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 border-r text-center">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 border-r text-center">
                    Icon
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenseCategories.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-4 text-gray-400"
                    >
                      No expense categories
                    </td>
                  </tr>
                )}
                {expenseCategories.map((cat) => (
                  <tr key={cat._id} className="border-b border-gray-100">
                    <td className="py-2 px-4 border-r border-gray-200 text-center">
                      {cat.name}
                    </td>
                    <td className="py-2 px-4 border-r border-gray-200 text-center">
                      {cat.icon ? (
                        <img
                          src={cat.icon}
                          alt="icon"
                          className="w-8 h-8 inline"
                        />
                      ) : (
                        <span className="text-gray-400">No icon</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wallets Table */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold pl-4">Wallets</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow border border-gray-200 text-opposite-text">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 border-r text-center">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 border-r text-center">
                    Icon
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {walletCategories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-400">
                      No wallets
                    </td>
                  </tr>
                )}
                {walletCategories.map((cat) => (
                  <tr key={cat._id} className="border-b border-gray-100">
                    <td className="py-2 px-4 border-r border-gray-200 text-center">
                      {cat.name}
                    </td>
                    <td className="py-2 px-4 border-r border-gray-200 text-center">
                      {cat.icon ? (
                        <img
                          src={cat.icon}
                          alt="icon"
                          className="w-8 h-8 inline"
                        />
                      ) : (
                        <span className="text-gray-400">No icon</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Category/Wallet Modal */}
        <Modal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          title="Add Category or Wallet"
        >
          <div className="flex flex-col gap-4">
            <input
              className="input"
              placeholder="Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <select
              className="inpu"
              value={newCategory.type}
              onChange={(e) =>
                setNewCategory({ ...newCategory, type: e.target.value })
              }
            >
              <option value="expense" className="text-opposite-text">Expense Category</option>
              <option value="wallet" className="text-opposite-text">Wallet</option>
            </select>
            {newCategory.icon && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Selected Emoji:</span>
                <img
                  src={newCategory.icon}
                  alt="Selected emoji"
                  className="w-8 h-8"
                />
              </div>
            )}
            <EmojiPicker
              onEmojiClick={(emojiData) =>
                setNewCategory({ ...newCategory, icon: emojiData.imageUrl })
              }
            />
            <button
              className="add-btn add-btn-fill"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Category;
