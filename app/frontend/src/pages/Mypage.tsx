import React, { useEffect,useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./../context/auth"
import Button from "@mui/material/Button";
import { handleBreakpoints } from "@mui/system";



const MyPage: React.FC = () => {
    
    const { user, isAuthenticated, isLoading } = useAuth();
    

  useEffect (() =>
  {
    isAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

   console.log(isLoading);
  
  const handlePutDisabled = () =>
  {
    const token = localStorage.getItem("token")
    if (token)
    {
    
      const body = { disabled: "true" }
     
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .put("http://localhost:8080/users/me", body, config)
        .then((res) => console.log(res));
    }
  }
  
  return (
    <>
      <div className="App">
        <h1>Mypage</h1>
        {user && (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <Button onClick={handlePutDisabled}>退会</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPage;
