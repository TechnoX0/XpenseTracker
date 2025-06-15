import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL).then((res) => {
      const wallets = res.data.filter(data => data.type === "wallet")
      setWallets(wallets);
    });
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => {
          const wallet = wallets.find((wal) => wal._id === income.wallet)
          console.log(wallet)

          return wallet ? <TransactionInfoCard
            key={income._id}
            title={wallet.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          /> : <div>
            ERROR Loading Wallets
          </div>
        })}
      </div>
    </div>
  );
};

export default IncomeList;
