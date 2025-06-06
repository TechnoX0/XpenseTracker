import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "expense",
    icon: "",
  });

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.CATEGORY.GET_ALL);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  return (
    <DashboardLayout activeMenu="Category">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            className="add-btn add-btn-fill"
            onClick={() => setOpenAddModal(true)}
          >
            + Add Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Icon</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="py-2 px-4">{cat.name}</td>
                  <td className="py-2 px-4 capitalize">{cat.type}</td>
                  <td className="py-2 px-4">
                    {cat.icon ? (
                      <img src={cat.icon} alt="icon" className="w-8 h-8 inline" />
                    ) : (
                      <span className="text-gray-400">No icon</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          title="Add Category"
        >
          <div className="flex flex-col gap-4">
            <input
              className="input"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <select
              className="input"
              value={newCategory.type}
              onChange={(e) =>
                setNewCategory({ ...newCategory, type: e.target.value })
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="wallet">Wallet</option>
            </select>
            <input
              className="input"
              placeholder="Icon URL (optional)"
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
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
