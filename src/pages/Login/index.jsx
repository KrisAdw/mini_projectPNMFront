import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth/authSlice";

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();

      dispatch(login(responseData));
      localStorage.setItem("isAuthenticated", true);
      // localStorage.setItem("jwtToken", responseData.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);  
      setErrorMessage("Failed to login. Email or password invalid"); // Menetapkan pesan kesalahan ke state
    }    
  };


  return (
    <div className="bg-gray-100 flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="w-full max-w-xs">
          <div className="mb-4 flex justify-center">
            <h1 className="text-2xl font-bold">LOGIN</h1>
          </div>
          {/* Menampilkan pesan kesalahan jika ada */}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">
              <div className="label py-2">
                <span className="label-text">Email</span>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                type="text"
                placeholder="Enter your email"
              />
            </label>
            {errors.email && errors.email.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="text-red-500">Invalid email address</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">
              <div className="label py-2">
                <span className="label-text">Password</span>
              </div>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter your password"
              />
            </label>
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="flex justify-center py-2 text-sm">
            <p>
              Don't have an account?{" "}
              <span className="text-blue-500 hover:text-blue-300">
                <Link to={"/register"}>click here</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Index;
