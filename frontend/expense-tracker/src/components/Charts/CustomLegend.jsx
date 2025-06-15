import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CustomLegend = ({ payload, isWallet=false }) => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    axiosInstance.get(API_PATHS.CATEGORY.GET_ALL).then((res) => {
      const wallets = res.data.filter(data => data.type === "wallet")
      setWallets(wallets);
    });
  }, []);
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => {
        const wallet = wallets.find((wal) => wal._id === entry.value)
        
        return isWallet && wallet ? 
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium">
            {wallet.name}
          </span>
        </div> : <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      })}
    </div>
  );
};

export default CustomLegend;
