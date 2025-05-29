import React, { useState } from "react";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";

const CustomerHome = ({ user }) => {
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);

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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#00ABE4" }}>
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from the banking services below to manage your account
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Deposit Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: "#dcfce7" }}
              >
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">+</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Deposit
            </h3>
            <p className="text-gray-600 mb-6">
              Add money to your account securely
            </p>
            <button
              onClick={() => setActivePopup("deposit")}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md"
            >
              Make Deposit
            </button>
          </div>
        </div>

        {/* Withdraw Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{ backgroundColor: "#fef3c7" }}
              >
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-600">-</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Withdraw
            </h3>
            <p className="text-gray-600 mb-6">
              Take money from your account safely
            </p>
            <button
              onClick={() => setActivePopup("withdraw")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md"
            >
              Make Withdrawal
            </button>
          </div>
        </div>

        {/* Transfer Card */}
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#00ABE4" }}
                >
                  ⇄
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Transfer
            </h3>
            <p className="text-gray-600 mb-6">Send money to another account</p>
            <button
              onClick={() => setActivePopup("transfer")}
              className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md"
              style={{ backgroundColor: "#00ABE4" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0090c0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00ABE4")}
            >
              Make Transfer
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats or Additional Info */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#00ABE4" }}
            >
              Banking made simple
            </h3>
            <p className="text-gray-600">
              Your trusted partner for secure and convenient banking services
            </p>
          </div>
        </div>
      </div>

      {/* Conditional Popup Rendering */}
      {activePopup === "deposit" && (
        <Deposit
          onClose={closePopup}
          onDepositSuccess={(newBalance) => {
            console.log("Updated balance:", newBalance);
            closePopup();
          }}
        />
      )}
      {activePopup === "withdraw" && (
        <Withdraw
          onClose={closePopup}
          onWithdrawSuccess={(newBalance) => {
            console.log("Updated balance:", newBalance);
            closePopup();
          }}
        />
      )}
      {activePopup === "transfer" && (
        <Transfer
          onClose={closePopup}
          onTransferSuccess={(newBalance) => {
            console.log("New balance after transfer:", newBalance);
            closePopup();
          }}
        />
      )}

      {/* Basic Popup Styling */}
      <style>{`
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
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CustomerHome;
