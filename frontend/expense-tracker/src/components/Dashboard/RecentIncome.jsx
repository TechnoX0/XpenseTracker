import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const RecentIncome = ({transactions, onSeeMore}) => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL).then((res) => {
      const wallets = res.data.filter(data => data.type === "wallet")
      setWallets(wallets);
    });
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0,5)?.map((item) => {
          const wallet = wallets.find((wal) => wal._id === item.wallet)

          return (<TransactionInfoCard
            key={item._id}
            title={wallet.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />)
        })}
      </div>
    </div>
  );
};

export default RecentIncome;
