import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.Sidebar}>
      <h3 className={styles.heading}>AdminPro</h3>
      <Link to="/dashboard" className={styles.buttons}>Dashboard</Link>
      <Link to="/users" className={styles.buttons}>Users</Link>
      <Link to="/login" className={styles.buttons}>Login</Link>
    </div>
  );
}
const styles = {
  Sidebar: "w-64 h-screen bg-gray-700 flex flex-col gap-6 text-white p-5 items-center",
  heading: "text-2xl font-bold mb-6",
  buttons:"w-full text-center bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition",
};
export default Sidebar;
