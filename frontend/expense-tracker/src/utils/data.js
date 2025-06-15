import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuLayoutList,
} from "react-icons/lu";
import { GrAnalytics } from "react-icons/gr";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },
    {
        id: "04",
        label: "Analysis",
        icon: GrAnalytics,
        path: "/analysis",
    },
    {
        id: "05",
        label: "Categories",
        icon: LuLayoutList,
        path: "/categories",
    },

    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];
