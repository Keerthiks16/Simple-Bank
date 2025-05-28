import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import BankerHome from "./BankerHome";
import CustomerHome from "./CustomerHome";
import Details from "./Details";
import axios from "axios";

const Home = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user)
    return <div className="text-center mt-20 text-red-500">Please login</div>;

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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow">
        <h1 className="text-xl font-bold">National Bank</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDetails(true)}
            className="hover:underline font-medium"
            title="View Profile"
          >
            {user.username}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Conditionally Render Banker or Customer Home */}
      <div className="p-4">
        {user.typeofuser === "banker" ? (
          <BankerHome user={user} />
        ) : (
          <CustomerHome user={user} />
        )}
      </div>

      {/* Show Details Popup */}
      {showDetails && <Details onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default Home;
