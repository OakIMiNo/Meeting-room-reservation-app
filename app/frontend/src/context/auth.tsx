import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = (props:any) =>
{
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  const isAuthenticated = () =>
  {
    const token = localStorage.getItem("token")
    console.log(token)
          if (token) {
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            axios
              .get("http://localhost:8080/users/me", { headers })
              .then((res) => setUser(res.data))
              .catch((e) =>
              {
                setUser(null);
                navigate("/signin");
              })
    }
  }
  

  const isRegister = async (userName: string, email: string, password: string) =>
  {
    const body = {
      name: userName,
      email: email,
      password: password
    }

    await axios
      .post("http://localhost:8080/register", body)
      .then((res) => res.data)
  }
  
  //login情報をapi送付し、apiから送付されたtokenをlocalStorageにセットする
  const login = async (email:any,password:any) => {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    await axios
      .post("http://localhost:8080/token", params, config)
      .then((res: any) =>
      {
        localStorage.setItem("token", res.data.access_token)
      });
  }
  
  const logout = () =>
  {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/signin")
  }
    
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isRegister }}
    >
      {/* {isLoading ? <h1>loading</h1> : props.children} */}
      {props.children}
    </AuthContext.Provider>
  );
}

export default useAuth;
