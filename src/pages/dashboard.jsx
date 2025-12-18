import { useEffect, useState } from "react";
import StatCard from "../components/Statecard.jsx";
import userService from "../services/userService.js";
import UserChart from "../components/charts.jsx";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const users = await userService.getUsers();

      const totalUsers = users.length;
      const adminUsers = users.filter((u) => u.role === "admin").length;
      const activeUsers = users.filter((u) => u.isactive).length;

      setStats({
        totalUsers,
        adminUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
      });
    };

    fetchStats();
  }, []);

  // ✅ Guard: wait until data loads
  if (!stats) {
    return <p className="p-4">Loading dashboard...</p>;
  }

  return (
    <div>
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-center mb-6">
          <UserChart stats={stats} />
        </div>

        <div style={styles.cardContainer}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle="All registered users"
          />

          <StatCard
            title="Admin Users"
            value={stats.adminUsers}
            subtitle="Users with admin role"
          />

          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            subtitle="Active this week"
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
};

export default Dashboard;
