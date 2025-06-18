


import React, { useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  // Step 1: Validate form
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    // Step 2: Send request to backend
    const response = await fetch(" https://project-zidio-ecommerce-website-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();
    console.log("Response received:", result);

    // Step 3: Handle response
    if (response.ok) {
      alert("Registration successful!");
      window.location.href = "/login"; // ✅ lowercase path if route is "/login"
    } else {
      alert(result.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-[#1e293b] to-[#0f172a] px-4">
      <motion.div className="bg-[#1e293b] shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4 relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-10 py-3 bg-[#334155] text-white rounded-xl"
            />
            <FaRegUser className="absolute left-3 top-3.5 text-gray-400" />
            {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
          </div>

          <div className="mb-4 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-10 py-3 bg-[#334155] text-white rounded-xl"
            />
            <MdEmail className="absolute left-3 top-3.5 text-gray-400" />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4 relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-10 py-3 bg-[#334155] text-white rounded-xl"
            />
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <a href="/Login" className="text-blue-400 hover:underline">Login</a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
