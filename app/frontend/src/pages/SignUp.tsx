import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Box } from "@mui/system";

type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.userName || !values.email || !values.password ? {} : values,
    errors:
      !values.userName || !values.email || !values.password
        ? {
            userName: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
  };
};

const SignUp: React.FC = () => {
  const { user, login, isAuthenticated, isRegister } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // console.log(isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: resolver,
  });
  const onSubmit = handleSubmit(async (data) => {
    const navigateFn = () => {
      navigate("/signin");
    };
    isRegister(data.userName, data.email, data.password)
      .then((res: any) => setMessage("登録しました"))
      .then(() => setTimeout(navigateFn, 1000));
  });

  //test@example.com test
  return (
    <>
      <Box
        sx={{
          width: 350,
          height: 150,
          mx: "auto",
          mt: 10,
          p: 2,
          display: "block",
          border: "1px solid",
          backgroundColor: "primary.dark",

          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <h4>登録</h4>
        <form onSubmit={onSubmit}>
          <div>
            <label>Your Name </label>
            <input {...register("userName")} placeholder="your name" />
            {/* {errors?.userName && <p>{errors.userName.message}</p>} */}
          </div>
          <div>
            <label>email Address </label>
            <input {...register("email")} placeholder="email address" />
            {/* {errors?.email && <p>{errors.email.message}</p>} */}
          </div>
          <div>
            <label>Password </label>
            <input {...register("password")} placeholder="password" />
            {errors && <p>{errors.userName?.message}</p>}
          </div>
          <input type="submit" />
        </form>
      </Box>
      {message}
    </>
  );
};

export default SignUp;
