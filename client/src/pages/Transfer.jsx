import React, { useState } from "react";
import axios from "axios";

const Transfer = ({ onClose, onTransferSuccess }) => {
  const [receiverUsername, setReceiverUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleTransfer = async () => {
    if (!receiverUsername || !amount || parseFloat(amount) <= 0) {
      setError("Enter a valid username and amount.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await axios.post(
        "http://localhost:8081/api/transactions/transfer",
        {
          receiverUsername,
          amount: parseFloat(amount),
          description: description || `Transfer to ${receiverUsername}`,
        },
        { withCredentials: true }
      );

      setMessage(res.data.Message + ` to ${res.data.transferredTo}`);
      onTransferSuccess(res.data.newBalance); // update balance in parent
      setReceiverUsername("");
      setAmount("");
      setDescription("");
    } catch (err) {
      const apiError =
        err.response?.data?.Error || "Transfer failed. Try again.";
      setError(apiError);
      console.error("Transfer error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content text-center">
        <h2 className="text-xl font-bold mb-4">Transfer Funds</h2>

        <input
          type="text"
          value={receiverUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
          placeholder="Recipient's Username"
          className="w-full p-2 mb-3 border rounded"
        />

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
          onClick={handleTransfer}
          disabled={loading}
          className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition w-full"
        >
          {loading ? "Processing..." : "Transfer"}
        </button>

        {message && <p className="mt-4 text-green-700 text-sm">{message}</p>}
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

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

export default Transfer;
