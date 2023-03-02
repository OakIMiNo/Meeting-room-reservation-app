import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";

type FormValues = {
  useName: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.useName ? {} : values,
    errors: !values.useName
      ? {
          useName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const SignIn: React.FC = () => {
  const { user, login, isAuthenticated } = useAuth();
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
    await login(data.useName, data.password)
      .then((res: any) => {
        navigate("/rooms");
      })
      .catch((e: any) => {
        setMessage("emailもしくはpasswordの入力誤り、あるいは退会されています");
      });
  });

  //test@example.com test
  return (
    <>
      <Box
        sx={{
          width: 350,
          height: 120,
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
        <h4>ログイン</h4>
        <form onSubmit={onSubmit}>
          <div>
            <label>email Address </label>
            <input {...register("useName")} placeholder="email address" />
            {errors?.useName && <p>{errors.useName.message}</p>}
          </div>

          <div>
            <label>Password </label>
            <input {...register("password")} placeholder="password" />
          </div>
          <input type="submit" />
        </form>
        <Link to="/signup">
          <Button>新規会員登録はこちら</Button>
        </Link>
      </Box>
      {message}
    </>
  );
};

export default SignIn;
