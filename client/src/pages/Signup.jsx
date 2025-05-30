import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    role: "customer",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://bank-backend-production-af9c.up.railway.app/api/auth/signup", // Update port/path as needed
        formData,
        { withCredentials: true }
      );
      setMessage(response.data.Message);
      navigate("/login");
      setFormData({
        username: "",
        email: "",
        age: "",
        gender: "",
        role: "customer",
        password: "",
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.Error || "Something went wrong during signup";
      setError(errorMsg);
    }
  };

  const inputStyle = {
    outline: "none",
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = "0 0 0 2px rgba(0, 171, 228, 0.2)";
    e.target.style.borderColor = "#00ABE4";
  };

  const handleBlur = (e) => {
    e.target.style.boxShadow = "none";
    e.target.style.borderColor = "#d1d5db";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: "#E9F1FA" }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#00ABE4" }}>
            Create Account
          </h2>
          <p className="text-gray-600">Join us today</p>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username *
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg transition-all duration-200"
              style={inputStyle}
              value={formData.username}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg transition-all duration-200"
              style={inputStyle}
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age (optional)"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg transition-all duration-200"
              style={inputStyle}
              value={formData.age}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Gender
            </label>
            <select
              name="gender"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg transition-all duration-200"
              style={inputStyle}
              value={formData.gender}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select Gender (optional)</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Role *
            </label>
            <select
              name="role"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg transition-all duration-200"
              style={inputStyle}
              value={formData.role}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="customer">Customer</option>
              <option value="banker">Banker</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg transition-all duration-200"
              style={inputStyle}
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg font-medium mt-8 transition-all duration-200 hover:shadow-md"
            style={{
              backgroundColor: "#00ABE4",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0090c0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#00ABE4")}
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: "#00ABE4" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
