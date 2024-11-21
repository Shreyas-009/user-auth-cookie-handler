import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "https://user-auth-cookie-handler-backend.vercel.app/login",
        { email, password },
        { withCredentials: true }
      );

      const authToken = res.data.data;

      if (!authToken) throw new Error("Invalid token received from server.");
      document.cookie = `authToken=${authToken}; path=/; SameSite=Strict`;
      alert(res.data.message || "Login successful!"); 
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-900 flex justify-center items-center">
      <div className="flex flex-col text-center gap-7 bg-zinc-800 p-7 rounded-xl w-11/12 md:w-1/3">
        <h1 className="text-4xl text-white">Login</h1>
        <hr className="border-zinc-600" />
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="p-4 text-black outline-none border-none rounded-full"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            className="p-4 bg-purple-500 hover:bg-purple-600 font-semibold rounded-full text-white text-xl cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
        <div>
          <span className="text-xl text-white">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-purple-400 hover:text-purple-700"
              to="/"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
