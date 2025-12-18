import { useNavigate  } from "react-router-dom";
import { useAuth } from "../contexts/authcontent.jsx";

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth();

  const handlelogin = () => {
    login();    
    navigate("/dashboard");
  };
  return (
    <>
    <div className="w-full h-150 p-4 flex flex-col items-center justify-center">
     <h2 className="text-2xl font-bold text-gray-800 mb-6">login Page</h2>
      <div className="w-[300px]">
      <button className={styles.buttons} onClick={handlelogin}>login</button>
      </div>
      </div>
    </>
  );
}
const styles = {
   buttons:"w-full  text-center bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition",
};

export default Login;
