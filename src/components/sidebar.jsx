import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-700 text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`${styles.Sidebar} ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 transition-transform duration-300 z-40`}
      >
        <h3 className={styles.heading}>AdminPro</h3>

        <Link to="/dashboard" className={styles.buttons} onClick={() => setOpen(false)}>
          Dashboard
        </Link>

        <Link to="/users" className={styles.buttons} onClick={() => setOpen(false)}>
          Users
        </Link>

        <Link to="/login" className={styles.buttons} onClick={() => setOpen(false)}>
          Login
        </Link>
      </div>
    </>
  );
}

const styles = {
  Sidebar:
    "w-64 h-screen bg-gray-700 flex flex-col gap-6 text-white p-5 items-center",
  heading: "text-2xl font-bold mb-6",
  buttons:
    "w-full text-center bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition",
};

export default Sidebar;
