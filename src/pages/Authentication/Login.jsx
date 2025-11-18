import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {signInUser} = useAuth()

    const handleLogIn = (data) => {
        console.log(data)
        signInUser(data.email, data.password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error=> {
            console.log(error)
        })
    }

  return (
    <div>
      <h1>this is log in page </h1>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-400">
              Password must be 6 Charaters or Longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Minimum six characters, at least one uppercase letter, one
              lowercase letter and one number
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
