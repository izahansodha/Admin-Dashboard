import Sidebar from "./components/sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Users from "./pages/users.jsx";
import Navbar from "./components/navbar.jsx";
import ProtectedRoute from "./routes/protectedroute.jsx";
import AdminRoute from "./routes/adminroute.jsx";
import NotAuthorized from "./pages/not.jsx";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex w-full h-full">
        <Sidebar />
        <div style={{ flex: 1 }}>
          <ProtectedRoute>
            <div className="flex w-full ">
               <Navbar  />
            </div>
           
          </ProtectedRoute>

          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/not" element={<NotAuthorized />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <AdminRoute>
                    <Users />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
