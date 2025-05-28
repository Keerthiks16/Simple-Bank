import React, { useState } from "react";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";

// Placeholder popup components
// const DepositPopup = ({ onClose }) => (
//   <div className="popup">
//     <div className="popup-content">
//       <h2 className="text-xl font-bold mb-2">Deposit</h2>
//       <p>Deposit functionality coming soon.</p>
//       <button
//         onClick={onClose}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

// const WithdrawPopup = ({ onClose }) => (
//   <div className="popup">
//     <div className="popup-content">
//       <h2 className="text-xl font-bold mb-2">Withdraw</h2>
//       <p>Withdraw functionality coming soon.</p>
//       <button
//         onClick={onClose}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

// const TransferPopup = ({ onClose }) => (
//   <div className="popup">
//     <div className="popup-content">
//       <h2 className="text-xl font-bold mb-2">Transfer</h2>
//       <p>Transfer functionality coming soon.</p>
//       <button
//         onClick={onClose}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

const CustomerHome = ({ user }) => {
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="bg-white p-8 rounded-xl shadow-md text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}!</h1>
        <p className="text-gray-600">
          Manage your account with the options below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <button
          onClick={() => setActivePopup("deposit")}
          className="bg-green-500 text-white p-6 rounded-lg shadow hover:bg-green-600 transition text-lg font-semibold"
        >
          Deposit
        </button>
        <button
          onClick={() => setActivePopup("withdraw")}
          className="bg-yellow-500 text-white p-6 rounded-lg shadow hover:bg-yellow-600 transition text-lg font-semibold"
        >
          Withdraw
        </button>
        <button
          onClick={() => setActivePopup("transfer")}
          className="bg-blue-500 text-white p-6 rounded-lg shadow hover:bg-blue-600 transition text-lg font-semibold"
        >
          Transfer
        </button>
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
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CustomerHome;
