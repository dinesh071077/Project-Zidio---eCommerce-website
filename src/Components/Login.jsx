

import React, { useEffect, useState } from "react";
import { FaRegUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // ✅ Save token and user info
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.user.role); // store role from user object
      localStorage.setItem("username", result.user.username);
      localStorage.setItem("email", result.user.email);
      localStorage.setItem("userId", result.user.id);

      // ✅ Redirect based on role
      if (result.user.role === "admin") {
        window.location.href = "/admin"; // Redirect to admin dashboard
      } else {
        window.location.href = "/"; // Redirect to user homepage
      }
    } else {
      alert(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleCallback = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log("Google User:", userObject);
    alert(`Welcome ${userObject.name}`);
   
    window.location.href = "/";
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "1061635173504-4r9thfmspnms00ne5b223amelejm572s.apps.googleusercontent.com",
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-[#1e293b] to-[#0f172a] px-4">
      <motion.div className="bg-[#1e293b] shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-4">Login</h1>

        {/* Google Sign-In Button */}
        <div id="googleSignInDiv" className="mb-6 text-center"></div>

        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-3 bg-[#334155] text-white rounded-xl"
            />
            <FaRegUser className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-3 bg-[#334155] text-white rounded-xl"
            />
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <a href="/Register" className="text-blue-400 hover:underline">Register</a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
