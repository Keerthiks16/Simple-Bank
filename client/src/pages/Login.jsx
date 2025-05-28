import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { ToastBar } from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      console.log("Login data:", formData);
      await axios
        .post("http://localhost:8081/login", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.Error) {
            toast.error(res.data.Error);
          } else {
            toast.success("Login Successful");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold text-white">SecureBank</h1>
          <p className="text-blue-50 mt-1">Login to Your Account</p>
        </div>

        {/* Form */}
        <div className="px-8 py-6 space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.username ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-98"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Logging In...
              </div>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-3">Don't have an account?</p>
            <Link to="/signup">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors"
              >
                Create a new account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
