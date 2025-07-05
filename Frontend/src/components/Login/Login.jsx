import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import authService from "../../backend/auth";
import { login as authLogin } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        dispatch(authLogin({ userData: session }));
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border-black/10">
      <div className="mb-2 flex justify-center">
        <h1 className="text-xl font-bold">Login Form</h1>
      </div>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">Username is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
