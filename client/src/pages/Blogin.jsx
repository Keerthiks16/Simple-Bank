import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Blogin = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://bank-backend-production-af9c.up.railway.app/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      if (res.data.user.typeofuser === "customer") {
        toast.error("Customer login not allowed");
        await axios.post(
          "https://bank-backend-production-af9c.up.railway.app/api/auth/logout",
          {},
          { withCredentials: true }
        );
        setUser(null);
        return;
      }

      setUser(res.data.user);
      navigate("/"); // Adjust route as needed
    } catch (err) {
      setError(err.response?.data?.Error || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundColor: "#D6E6F2" }} // Darker tone than #E9F1FA
    >
      <div className="w-full max-w-md px-6">
        <form
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          onSubmit={handleLogin}
        >
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#0077B6" }}
            >
              Banker Login
            </h2>
            <p className="text-gray-600">Access your banking dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  outline: "none",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 2px rgba(0, 119, 182, 0.2)`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  outline: "none",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 2px rgba(0, 119, 182, 0.2)`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg font-medium mt-8 transition-all duration-200 hover:shadow-md"
            style={{
              backgroundColor: "#0077B6",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#005f91")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0077B6")}
          >
            Sign In
          </button>

          <div className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Don’t have a banker account?{" "}
              <Link
                to="/signup"
                className="font-medium hover:underline"
                style={{ color: "#0077B6" }}
              >
                Sign Up
              </Link>
            </p>
            <p className="text-gray-600">
              Are you a customer?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: "#0077B6" }}
              >
                Go to Customer Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blogin;
