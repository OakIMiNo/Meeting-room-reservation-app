import React, { useEffect,useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./../context/auth"


const MyPage: React.FC = () => {
    
    const { user } = useAuth()
    console.log(user)

  return (
    <>
      <div className="App">
        <h1>Mypage</h1>
        {/* <h1>{user.username}</h1> */}
      </div>
    </>
  );
};

export default MyPage;
