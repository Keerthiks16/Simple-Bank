import React, { useState } from "react";
import axios from "axios";

const Deposit = ({ onClose, onDepositSuccess }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDeposit = async () => {
    if (!amount) {
      setMessage("Amount is required.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        "http://localhost:8081/api/transactions/deposit",
        {
          amount: parseFloat(amount),
          description: description || "Deposit",
        },
        { withCredentials: true }
      );

      setMessage(res.data.Message);
      onDepositSuccess(res.data.newBalance); // Pass new balance to parent
      setAmount("");
      setDescription("");
    } catch (error) {
      setMessage("Deposit failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content text-center">
        <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleDeposit}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
        >
          {loading ? "Processing..." : "Deposit"}
        </button>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-blue-600 hover:underline"
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
          width: 90%;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

export default Deposit;
