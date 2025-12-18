import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontent.jsx";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  
  if (user.role !== "admin") {
    return <Navigate to="/not" />;  // custom page
  }

  return children;
}

export default AdminRoute;
