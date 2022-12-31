import React from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: resolver,
  });
    const onSubmit = handleSubmit((data) =>
    {
      axios.post("http://localhost:8080/token")
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
        
      //  axios
      //    .get("http://localhost:8080")
      //    .then((res) => console.log(res.data))
      //    .catch((e) => console.log(e));
    });

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