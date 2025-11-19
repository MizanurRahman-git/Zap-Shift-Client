import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLink from "./SocialLink";

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogIn = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0">
      <div className="card-body">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <h1 className="">Login with ZapShift</h1>
        <form className="mt-4" onSubmit={handleSubmit(handleLogIn)}>
          <fieldset className="fieldset">
            <label className="label font-bold text-black">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required</p>
            )}
            <label className="label font-bold text-black">Password</label>
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
              <a className="link underline text-gray-500">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4 bg-[#CAEB66] border-none text-black">Login</button>
          </fieldset>
          <p className="text-gray-500 mt-3">Don't have any account? <Link state={location.state} to='/register' className="text-[#8FA748]">Register</Link> </p>
          <p className="text-gray-500 text-center mt-2">Or</p>
        </form>
        <SocialLink />
      </div>
    </div>
  );
};

export default Login;
