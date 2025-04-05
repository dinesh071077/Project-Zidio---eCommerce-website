import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setemailError] = useState("");

  const getStorage = localStorage.getItem("username");
  const getPassword = localStorage.getItem("password");
  const getnewPassword = localStorage.getItem("newpassword");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === getStorage && password === getPassword) {
      alert("Login successfully");
      window.location.href = "/";
    } else if (password === getnewPassword) {
      alert("Login successfully");
      window.location.href = "/";
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const result = await response.json();
      console.log("User registered successfully!", result);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">TRENDY</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(e);
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FaRegUser className="absolute right-3 top-3 text-gray-400" />
            </div>
            <p className="text-red-500 text-sm mt-1">{emailerror}</p>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FaLock className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="/Forgot" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/Register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
