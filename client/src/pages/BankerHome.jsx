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
    <div className="min-h-screen bg-green-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow-md text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, Banker {user.username}!
        </h1>
        <p className="text-gray-600">
          Manage your customers and transactions efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <button
          onClick={() => setActivePopup("customer-details")}
          className="bg-purple-500 text-white p-6 rounded-lg shadow hover:bg-purple-600 transition text-lg font-semibold"
        >
          Customer Details
        </button>
        <button
          onClick={() => setActivePopup("transaction-details")}
          className="bg-indigo-500 text-white p-6 rounded-lg shadow hover:bg-indigo-600 transition text-lg font-semibold"
        >
          Transaction Details
        </button>
        <button
          onClick={() => setActivePopup("all-transactions")}
          className="bg-gray-700 text-white p-6 rounded-lg shadow hover:bg-gray-800 transition text-lg font-semibold"
        >
          All Transactions
        </button>
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
