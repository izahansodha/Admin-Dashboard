import { useState, useMemo, useEffect } from "react";
import UserForm from "../components/userform";
import UserTable from "../components/usertable";
import userService from "../services/userService";

function Users() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setusers] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("user");
  const [isactive, setisactive] = useState(true);

  const [editid, seteditid] = useState(null);
  const [search, setsearch] = useState("");
  const [filterrole, setfilterrole] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [showForm, setShowForm] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getUsers();
        setusers(data);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleadduser = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      showToast("error", "Name and Email are required");
      return;
    }

    try {
      setLoading(true);

      if (editid) {
        await userService.updateUser({
          id: editid,
          name,
          email,
          role,
          isactive,
        });
        showToast("success", "User updated successfully");
        seteditid(null);
      } else {
        await userService.addUser({
          id: Date.now(),
          name,
          email,
          role,
          isactive,
        });
        showToast("success", "User added successfully");
      }
      const updated = await userService.getUsers();
      setusers(updated);

      setname("");
      setemail("");
      setrole("user");
      setisactive(true);
    } catch (err) {
      setError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handledeleteuser = async (userid) => {
    showToast("warning", "User deleted");
    try {
      setLoading(true);
      await userService.deleteUser(userid);
      const updated = await userService.getUsers();
      setusers(updated);
    } catch {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleediteuser = (user) => {
    setShowForm(!showForm);
    setname(user.name);
    setemail(user.email);
    setrole(user.role);
    seteditid(user.id);
    setisactive(user.isactive);
  };
  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };
  function Toast({ show, type, message, onClose }) {
    if (!show) return null;
    const styles = {
      success: "bg-green-600",
      error: "bg-red-600",
      warning: "bg-yellow-500 text-black",
    };

    return (
      <div className="fixed top-5 right-5 z-50">
        <div
          className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-4 ${styles[type]}`}
        >
          <span className="font-medium">{message}</span>
          <button onClick={onClose} className="font-bold text-lg leading-none">
            ×
          </button>
        </div>
      </div>
    );
  }

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
      .filter((user) =>
        filterrole === "All" ? true : user.role === filterrole
      );
  }, [users, search, filterrole]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterrole]);
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!users.length) {
    return <p>No users available. Add a user.</p>;
  }
  return (
    <>
      <div className="w-full h-full p-4 flex flex-col">
        <div className="w-full h-full flex gap-3 mb-4">
          <input
            className="w-50 sm:w-full p-2 border rounded mb-4"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <select
            className=" p-2 border rounded mb-4"
            value={filterrole}
            onChange={(e) => setfilterrole(e.target.value)}
          >
            <option value="All">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        {showForm && (
          <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
            {/* Modal Box */}
            <div className="bg-white rounded-lg w-[400px] p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {/* Form */}
              <UserForm
                name={name}
                email={email}
                role={role}
                editid={editid}
                setname={setname}
                setemail={setemail}
                setrole={setrole}
                handleadduser={handleadduser}
                isactive={isactive}
                setisactive={setisactive}
              />
            </div>
          </div>
        )}

        <Toast
          show={toast.show}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
        <div className="w-full h-full flex">
           <UserTable
          paginatedUsers={paginatedUsers}
          styles={styles}
          editid={editid}
          handledeleteuser={handledeleteuser}
          handleediteuser={handleediteuser}
        />
        </div>
       
        <div className="w-full flex flex-col sm:flex-row gap-4 mt-4 justify-center items-center">
          <button
            className="w-50 text-center bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition"
            disabled={currentPage * usersPerPage >= filteredUsers.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
          <button
            className="w-50 text-center bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition"
            disabled={currentPage == 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Back
          </button>
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-50 text-center bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition"
            >
              {showForm ? "Close Form" : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
const styles = {
  th: {
    border: "2px solid #950c0cff",
    textAlign: "left",
    padding: "10px",
  },
  table: {
    tableLayout: "auto",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  td: {
    border: "1px solid #eee",
    padding: "10px",
  },
};

export default Users;
