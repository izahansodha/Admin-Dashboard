import { createContext,useContext,useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [user,setuser] = useState(null);

    const login = () => {
        setuser({name:"Admin",role:"admin"});
    };
    const logout = () => {
        setuser(null);
    };
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}
  