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
        "http://localhost:8081/api/auth/signup", // Update port/path as needed
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age (optional)"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender (optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="role"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="banker">Banker</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
