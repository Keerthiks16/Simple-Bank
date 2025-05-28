import React, { useState } from "react";
import axios from "axios";

const Withdraw = ({ onClose, onWithdrawSuccess }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:8081/api/transactions/withdraw",
        {
          amount: parseFloat(amount),
          description: description || "ATM withdrawal",
        },
        { withCredentials: true }
      );

      setMessage(res.data.Message);
      onWithdrawSuccess(res.data.newBalance); // Notify parent of balance update
      setAmount("");
      setDescription("");
    } catch (err) {
      const apiError =
        err.response?.data?.Error || "Withdrawal failed. Please try again.";
      setError(apiError);
      console.error("Withdraw error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content text-center">
        <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>

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
          onClick={handleWithdraw}
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition w-full"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>

        {message && <p className="mt-4 text-green-700 text-sm">{message}</p>}
        {error && <p className="mt-4 text-yellow-600 text-sm">{error}</p>}

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

export default Withdraw;
