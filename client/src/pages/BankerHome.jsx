import React, { useState } from "react";
import AllCustomers from "./AllCustomers";
import CustomerTransaction from "./CustomerTransaction";
import AllTransactions from "./AllTransactions";

const BankerHome = ({ user }) => {
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);

  // Simple popup content components for now (replace with real ones when ready)
  const PopupContent = ({ title }) => (
    <div className="popup">
      <div className="popup-content text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">
          This feature is currently under development.
        </p>
        <button
          onClick={closePopup}
          className="text-blue-600 text-sm hover:underline"
        >
          Close
        </button>
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }
        .popup-content {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          max-width: 400px;
          width: 90%;
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      {/* Welcome Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center mb-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: "#E9F1FA" }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: "#00ABE4" }}
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
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#00ABE4" }}>
            Welcome, Banker {user.username}!
          </h1>
          <p className="text-gray-600 text-lg">
            Access comprehensive banking management tools and customer services
          </p>
        </div>
      </div>

      {/* Management Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Customer Details Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: "#E9F1FA" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "#00ABE4" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div
                  className="text-sm font-medium px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: "#00ABE4" }}
                >
                  Customers
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Customer Management
            </h3>
            <p className="text-gray-600 mb-6">
              View and manage all customer accounts and information
            </p>
            <button
              onClick={() => setActivePopup("customer-details")}
              className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md"
              style={{ backgroundColor: "#00ABE4" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0090c0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00ABE4")}
            >
              View Customers
            </button>
          </div>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: "#f0f9ff" }}
              >
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Search
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Transaction Details
            </h3>
            <p className="text-gray-600 mb-6">
              Search and view specific customer transaction history
            </p>
            <button
              onClick={() => setActivePopup("transaction-details")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md"
            >
              Search Transactions
            </button>
          </div>
        </div>

        {/* All Transactions Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: "#f9fafb" }}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                  Reports
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Transactions
            </h3>
            <p className="text-gray-600 mb-6">
              Comprehensive view of all banking transactions and reports
            </p>
            <button
              onClick={() => setActivePopup("all-transactions")}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md"
            >
              View All Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Banking Statistics Overview */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#00ABE4" }}
            >
              Banking Administration Dashboard
            </h3>
            <p className="text-gray-600">
              Complete oversight and management tools for efficient banking
              operations
            </p>
          </div>
        </div>
      </div>

      {/* Render popups based on activePopup state */}
      {activePopup === "customer-details" && (
        <AllCustomers onClose={closePopup} />
      )}
      {activePopup === "transaction-details" && (
        <CustomerTransaction onClose={closePopup} />
      )}
      {activePopup === "all-transactions" && (
        <AllTransactions onClose={closePopup} />
      )}
    </div>
  );
};

export default BankerHome;
