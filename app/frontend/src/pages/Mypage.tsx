import React, { useEffect,useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./../context/auth"
import Button from "@mui/material/Button";
import { handleBreakpoints } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import { GetReservations } from "../components/GetReservations";
import { DeleteReservation } from "../components/DeleteReservation";



const MyPage: React.FC = () => {
    
  const { user, isAuthenticated } = useAuth();
  const [message, setMessage] = useState("")
  const navigate = useNavigate();

  useEffect (() =>
  {
    isAuthenticated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  const handlePutDisabled = () =>
  {
    const navigateFn = () => {
      navigate("/signin");
    };

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
        .then((res) => setMessage("退会しました"))
        .then(() => setTimeout(navigateFn, 1000));
    }
  }
  
  return (
    <>
      <Header />
      <div className="App">
        {user && (
          <div>
            <Button onClick={handlePutDisabled}>退会する</Button>
            <h4>
              会員名： {user.name} 登録連絡先: {user.email}
            </h4>
          </div>
        )}
        {message}
      </div>
      <GetReservations />
      <DeleteReservation />
    </>
  );
};

export default MyPage;
