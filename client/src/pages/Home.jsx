import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import BankerHome from "./BankerHome";
import CustomerHome from "./CustomerHome";
import Details from "./Details";
import axios from "axios";

const Home = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#E9F1FA" }}
      >
        <div className="text-center">
          <div
            className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 mb-4"
            style={{ borderColor: "#00ABE4" }}
          ></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#E9F1FA" }}
      >
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-red-500 mb-4">Please login to continue</p>
          <a
            href="/login"
            className="inline-block px-6 py-2 text-white font-medium rounded-lg transition-colors duration-200"
            style={{ backgroundColor: "#00ABE4" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0090c0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#00ABE4")}
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8081/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); // Clear user from context
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E9F1FA" }}>
      {/* Enhanced Navbar */}
      <nav
        className="shadow-lg border-b border-gray-100"
        style={{ backgroundColor: "#00ABE4" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-white">National Bank</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white text-sm font-medium">
                    {user.username}
                  </p>
                  <p className="text-blue-100 text-xs capitalize">
                    {user.typeofuser || "User"}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200"
                  title="View Profile"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>

              <div className="border-l border-blue-300 pl-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        {user.typeofuser === "banker" ? (
          <BankerHome user={user} />
        ) : (
          <CustomerHome user={user} />
        )}
      </div>

      {/* Details Popup */}
      {showDetails && <Details onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default Home;
