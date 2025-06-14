import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useTheme } from "../../ThemeContext";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  // const [ theme, setTheme ] = useState("dark")
  const { theme, updateTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    updateTheme(newTheme); // ← this is key!
  };

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
        <button onClick={() => toggleTheme()}>
          <img src={`/icons/moon_${theme === "dark" ? "light" : "dark"}.svg`} alt="Theme" />
        </button>
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
