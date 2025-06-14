import { useEffect, useState } from "react";
import FinanceOverview from "../../components/Dashboard/FinanceOverview"
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses"
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart"
import DashboardLayout from "../../components/layouts/DashboardLayout"

function Analysis() {

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {   
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();

        return () => {};
    }, []);

  return (
    <DashboardLayout activeMenu="Analysis">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
            cols={2}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Analysis