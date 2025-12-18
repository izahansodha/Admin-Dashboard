import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function UserChart({ stats }) {
  // ✅ Guard: don’t render chart until data exists
  if (!stats) return null;

  const data = {
    labels: ["Users", "Admins", "Inactive"],
    datasets: [
      {
        label: "User Count",
        data: [
          stats.totalUsers,
          stats.adminUsers,
          stats.activeUsers, // ✅ fixed
        ],
        backgroundColor: ["#2563eb", "#16a34a", "#dc2626"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="w-100 h-[220px] bg-white p-4 rounded-xl shadow">
      <h3 className="text-base font-semibold mb-2">
        User Statistics
      </h3>

      <div className="h-[160px]">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default UserChart;
