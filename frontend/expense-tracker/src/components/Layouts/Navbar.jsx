import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useTheme } from "../../ThemeContext";
import { IoIosNotifications } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IoIosWarning } from "react-icons/io";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [noficationOpened, setNoficationOpened ] = useState(false)
  const { theme, updateTheme } = useTheme();
  const [ notifications, setNotifications ] = useState([])

  const [categories, setCategories] = useState();
  const [budgets, setBudgets] = useState();
  const [expenses, setExpenses] = useState();

  async function getData() {
    await axiosInstance.get(API_PATHS.CATEGORY.GET_ALL + "?type=expense").then((res) => {
        setCategories(res.data);
    });
    await axiosInstance.get(API_PATHS.BUDGET.GET_ALL).then((res) => {
        setBudgets(res.data);
    });
    await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE).then((res) => {
        setExpenses(res.data);
    });
  }

  function checkBudget() {
    if (!categories || !budgets || !expenses) return;

    const newNotifications = [];

    for (const budget of budgets) {
      const category = categories.find((cat) => cat._id === budget.categoryId);
      const categoryExpenses = expenses.filter((expense) => expense.category === category._id);
      const totalExpense = categoryExpenses.reduce((acc, curr) => acc + curr.amount, 0);
      const amountLeft = budget.limit - totalExpense;

      if (amountLeft < 0) {
        newNotifications.push(`${category.name} has exceeded its limit!`);
      }
    }

    setNotifications(newNotifications);
  }

  useEffect(() => {
      checkBudget()
  }, [categories, budgets, expenses]);

  useEffect(() => {
      getData()
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    updateTheme(newTheme); // ← this is key!
  };

  const toggleNotification = () => {
    setNoficationOpened(!noficationOpened); // ← this is key!
  }

  return (
    <div className="flex gap-5 bg-background backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex justify-between w-full">
        <div>
          <button
            className="block lg:hidden text-text"
            onClick={() => {
              setOpenSideMenu(!openSideMenu);
            }}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          <h2 className="text-lg font-medium text-text">Expense Tracker</h2>
        </div>
        <div className="relative flex gap-2">
          <button onClick={toggleNotification}>
            <IoIosNotifications className="text-text text-2xl"/>
          </button>
          <button onClick={toggleTheme}>
            <img src={`/icons/moon_${theme === "dark" ? "light" : "dark"}.svg`} alt="Theme" />
          </button>
          <div className={`${!noficationOpened ? "hidden" : ""} absolute flex flex-col gap-1 w-72 px-3 py-1 top-14 right-1 rounded-sm shadow-2xl bg-white`}>
            {notifications.map((notification, index) => {
              console.log(notification)
              return <div key={index} className="flex gap-1 items-center"><IoIosWarning className="text-red-700" /> {notification}</div>
            })}
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-background">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
