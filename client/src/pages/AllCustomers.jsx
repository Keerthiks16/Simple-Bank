import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { UserContext } from "../context/UserContext";

const AllCustomer = ({ onClose }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  //   const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setMessage(null);
      try {
        // console.log("User:", user);
        const res = await axios.get(
          "http://localhost:8081/api/banker/customers",
          { withCredentials: true }
        );

        if (res.data && Array.isArray(res.data.customers)) {
          setCustomers(res.data.customers);
        } else {
          setMessage("No customers found.");
        }
      } catch (error) {
        setMessage("Failed to load customers. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="text-xl font-bold mb-4 text-center">All Customers</h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {message && !loading && (
          <p className="text-center text-red-600">{message}</p>
        )}

        {!loading && !message && customers.length > 0 && (
          <div className="max-h-64 overflow-y-auto border rounded p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">ID</th>
                  <th className="border-b p-2">Name</th>
                  <th className="border-b p-2">Email</th>
                  <th className="border-b p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="border-b p-2">{customer.id}</td>
                    <td className="border-b p-2">{customer.username}</td>
                    <td className="border-b p-2">{customer.email}</td>
                    <td className="border-b p-2">
                      ${customer.balance.toFixed(2)}
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
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
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

export default AllCustomer;
