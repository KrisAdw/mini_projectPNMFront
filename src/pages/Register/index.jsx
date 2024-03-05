import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create data");
      }

      console.log("Data created successfully");      
      navigate("/login")
    } catch (error) {
      console.error("Error creating data:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center w-full h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 flex justify-center">
            <h1 className="text-2xl font-bold">Register</h1>
          </div>
          <div className="mb-3">
            {/* Name */}
            <label className="block text-gray-700 text-sm mb-2">
              <div className="label py-2">
                <span className="label-text">Name</span>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your name"
                {...register("nama", { required: true, maxLength: 20 })}
              />
            </label>
          </div>
          <div className="mb-3">
            {/* Email */}
            <label className="block text-gray-700 text-sm mb-2">
              <div className="label py-2">
                <span className="label-text">Email</span>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </label>
          </div>
          <div className="mb-3">
            {/* Password */}
            <label className="block text-gray-700 text-sm mb-2">
              <div className="label py-2">
                <span className="label-text">Password</span>
              </div>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true, maxLength: 20 })}
              />
            </label>
          </div>
          <div className="mb-8">
            {/* Role */}
            <label className="block text-gray-700 text-sm mb-2">
              <div className="label py-2">
                <span className="label-text">Role</span>
              </div>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("role", { required: true })}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex justify-center py-2 text-sm">
            <p>
              Already have an account?{" "}
              <span className="text-blue-500 hover:text-blue-300">
                <Link to={"/login"}>click here</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
