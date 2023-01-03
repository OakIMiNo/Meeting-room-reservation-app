import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = (props:any) =>
{
  const [user, setUser] = useState<any>(null);
  console.log("auth.tsx,user",user)
  const navigate = useNavigate();
  
  //tokenあり->apiからuser情報を取得。
  // const isAuthenticated = () =>
  // {
  //   console.log("isAuthenticated実行")
  //   const token:any = localStorage.getItem("token")
  //             if (token) {
  //           const headers = {
  //             Authorization: `Bearer ${token}`,
  //           };
  //           axios
  //             .get("http://localhost:8080/users/me", { headers })
  //             .then((res) => setUser(res.data));
  //         } else {
  //               setUser(null)
  //               navigate("/signin");
  //         }
  // }
  

    useEffect(() =>
    {
      const token = localStorage.getItem("token")
      console.log(token)
        const isAuthenticated = () => {
          if (token) {
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            axios
              .get("http://localhost:8080/users/me", { headers })
              .then((res) => setUser(res.data));
          } else {
            setUser(null);
          }
        };
        //  isAuthenticated()
        return isAuthenticated;
    },[]);
    
  //login情報をapi送付し、apiから送付されたtokenをlocalStorageにセットする
    const login = async (useName:any,password:any) => {
        const params = new URLSearchParams();
        params.append("username", useName);
        params.append("password", password);

        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }

        const response:any =  await axios
          .post("http://localhost:8080/token", params, config)
          .then((res) =>  res.data);
          
          const token = response.access_token
          if (token)
          {
            localStorage.setItem("token", token);
        }
  }
  
  console.log(localStorage)
  //logout
    const logout = () =>
    {
      localStorage.removeItem("token")
      setUser(null)
      //
      navigate("/signin")
    }
    
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {user === undefined? <h1>loading</h1> : props.children }
    </AuthContext.Provider>
  );
}

export default useAuth;
