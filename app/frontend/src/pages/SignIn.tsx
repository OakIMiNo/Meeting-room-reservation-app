import React from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth"
// import style from "./../ styles / SignIn.module.css";

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

const SignIn: React.FC = () =>
{
  const {user,login,isAuthenticated} = useAuth()
  const navigate = useNavigate();

  // console.log(isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: resolver,
  });
  const onSubmit = handleSubmit(async (data) =>
  {
    await login(data.useName, data.password)
      // .then(() => isAuthenticated())
      .then(() =>  navigate("/mypage"))
      .catch((e: any) => console.log(e))
  });

  //johndoe secret
  return (
    <>
      <div className="App">
        <h1>SignIn</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>User Name</label>
            <input {...register("useName")} placeholder="useName" />
            {errors?.useName && <p>{errors.useName.message}</p>}
          </div>

          <div>
            <label>Password</label>
            <input {...register("password")} placeholder="password" />
          </div>

          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default SignIn