import React from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
// import style from "./../ styles / SignIn.module.css";


const Home: React.FC = () => {
  const { user, login, isAuthenticated } = useAuth();

console.log("home",user)
    
  return (
    <>
      <div >
              <h1>
                  Home 会議室一覧のページ
              </h1>
      </div>
    </>
  );
};

export default Home;
