import React, { useEffect, useState } from "react";
import axios from "axios";

const AllTransactions = ({ onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://bank-backend-production-af9c.up.railway.app/api/banker/transactions",
        {
          withCredentials: true,
        }
      );
      setTransactions(res.data.transactions);
      setFilteredTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const applyFilters = () => {
    let filtered = transactions;

    if (transactionType !== "all") {
      filtered = filtered.filter(
        (tx) => tx.transaction_type === transactionType
      );
    }

    filtered = filtered.filter((tx) => {
      const amount = parseFloat(tx.amount || 0);
      const min = parseFloat(minAmount || 0);
      const max = parseFloat(maxAmount || Number.MAX_SAFE_INTEGER);
      return amount >= min && amount <= max;
    });

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [transactionType, minAmount, maxAmount]);

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="text-xl font-bold text-center mb-4">
          All Customer Transactions
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div>
                <label
                  htmlFor="typeFilter"
                  className="block text-sm font-medium"
                >
                  Filter by Type:
                </label>
                <select
                  id="typeFilter"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="border rounded p-2 w-40"
                >
                  <option value="all">All</option>
                  <option value="transfer">Transfer</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Min Amount:</label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  className="border rounded p-2 w-32"
                  placeholder="e.g. 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Max Amount:</label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  className="border rounded p-2 w-32"
                  placeholder="e.g. 1000"
                />
              </div>
            </div>

            <div className="overflow-auto border rounded p-2">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="border-b p-2">ID</th>
                    <th className="border-b p-2">Sender ID</th>
                    <th className="border-b p-2">Sender Username</th>
                    <th className="border-b p-2">Receiver ID</th>
                    <th className="border-b p-2">Receiver Username</th>
                    <th className="border-b p-2">Type</th>
                    <th className="border-b p-2">Amount</th>
                    <th className="border-b p-2">Description</th>
                    <th className="border-b p-2">Status</th>
                    <th className="border-b p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="border-b p-2">{tx.id ?? "NA"}</td>
                      <td className="border-b p-2">{tx.sender_id ?? "NA"}</td>
                      <td className="border-b p-2">
                        {tx.sender_username || "NA"}
                      </td>
                      <td className="border-b p-2">{tx.receiver_id ?? "NA"}</td>
                      <td className="border-b p-2">
                        {tx.receiver_username || "NA"}
                      </td>
                      <td className="border-b p-2 capitalize">
                        {tx.transaction_type || "NA"}
                      </td>
                      <td className="border-b p-2">
                        {tx.amount
                          ? `$${parseFloat(tx.amount).toFixed(2)}`
                          : "NA"}
                      </td>
                      <td className="border-b p-2">{tx.description || "NA"}</td>
                      <td className="border-b p-2 capitalize">
                        {tx.status || "NA"}
                      </td>
                      <td className="border-b p-2">
                        {tx.created_at
                          ? new Date(tx.created_at).toLocaleString()
                          : "NA"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 block mx-auto text-sm text-blue-600 hover:underline"
        >
          Close
        </button>
      </div>

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
          padding: 1rem;
        }
        .popup-content {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          width: 95%;
          max-width: 95%;
          max-height: 90vh;
          overflow-y: auto;
        }
        table th,
        table td {
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default AllTransactions;
