import React, { useState } from "react";
import axios from "axios";

const CustomerTransaction = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    setMessage(null);
    setCustomer(null);
    setTransactions([]);

    try {
      const res = await axios.get(
        "https://bank-backend-production-af9c.up.railway.app/api/banker/customers",
        {
          withCredentials: true,
        }
      );

      const allCustomers = res.data.customers;
      const matchedCustomer = allCustomers.find(
        (c) => c.username.toLowerCase() === username.toLowerCase()
      );

      if (!matchedCustomer) {
        setMessage("Customer not found.");
        setLoading(false);
        return;
      }

      const transactionRes = await axios.get(
        `https://bank-backend-production-af9c.up.railway.app/api/banker/customers/${matchedCustomer.id}/transactions`,
        {
          withCredentials: true,
        }
      );

      setCustomer(transactionRes.data.customer);
      setTransactions(transactionRes.data.transactions);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching transaction data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="text-xl font-bold text-center mb-4">
          Customer Transaction History
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <button
            onClick={handleFetch}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Fetch Transactions
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {message && <p className="text-center text-red-600">{message}</p>}

        {customer && (
          <div className="mb-4 text-sm">
            <p>
              <strong>ID:</strong> {customer.id}
            </p>
            <p>
              <strong>Username:</strong> {customer.username}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Balance:</strong> $
              {typeof customer.balance === "number"
                ? customer.balance.toFixed(2)
                : parseFloat(customer.balance || 0).toFixed(2)}
            </p>
          </div>
        )}

        {transactions.length > 0 && (
          <div className="overflow-x-auto border rounded p-2 mt-2">
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
                {transactions.map((tx) => (
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

export default CustomerTransaction;
