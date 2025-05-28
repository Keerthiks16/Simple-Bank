import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Details = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Assuming user data is already in context and valid
        const [balanceRes, txRes] = await Promise.all([
          axios.get("http://localhost:8081/api/transactions/balance", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8081/api/transactions/history", {
            withCredentials: true,
          }),
        ]);

        if (balanceRes.data.Status === "Success") {
          setBalance(balanceRes.data.balance);
        }

        if (txRes.data.Status === "Success") {
          setTransactions(txRes.data.transactions);
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">User Details</h2>

        {/* User Info */}
        <div className="mb-4">
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>User Type:</strong> {user?.typeofuser}
          </p>
          <p>
            <strong>User ID:</strong> {user?.id}
          </p>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p>
            <strong>Current Balance:</strong> ₹{balance}
          </p>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-xl font-medium mb-2">Transaction History</h3>
          <div className="max-h-64 overflow-y-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">From</th>
                  <th className="px-4 py-2 text-left">To</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t">
                    <td className="px-4 py-2">{tx.transaction_type}</td>
                    <td className="px-4 py-2">₹{tx.amount}</td>
                    <td className="px-4 py-2">{tx.sender_username || "N/A"}</td>
                    <td className="px-4 py-2">
                      {tx.receiver_username || "N/A"}
                    </td>
                    <td className="px-4 py-2">{tx.description}</td>
                    <td className="px-4 py-2">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && (
              <p className="p-4 text-gray-500 text-center">
                No transactions yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
