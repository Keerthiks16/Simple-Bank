import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

class BankerController {
  // Get all customers (banker view)
  static async getAllCustomers(req, res) {
    try {
      // Check if user is a banker
      if (req.user.typeofuser !== "banker") {
        return res
          .status(403)
          .json({ Error: "Access denied. Banker privileges required." });
      }

      const customers = await User.getAllCustomers();

      res.json({
        Status: "Success",
        customers,
      });
    } catch (error) {
      console.error("Get All Customers Error:", error);
      res.status(500).json({ Error: "Error fetching customers" });
    }
  }

  // Get specific customer's transaction history
  static async getCustomerTransactions(req, res) {
    try {
      // Check if user is a banker
      if (req.user.typeofuser !== "banker") {
        return res
          .status(403)
          .json({ Error: "Access denied. Banker privileges required." });
      }

      const { customerId } = req.params;

      // Verify customer exists
      const customer = await User.findById(customerId);
      if (!customer) {
        return res.status(404).json({ Error: "Customer not found" });
      }

      const transactions = await Transaction.getByCustomerId(customerId);

      res.json({
        Status: "Success",
        customer: {
          id: customer.id,
          username: customer.username,
          email: customer.email,
          balance: customer.balance,
        },
        transactions,
      });
    } catch (error) {
      console.error("Get Customer Transactions Error:", error);
      res.status(500).json({ Error: "Error fetching customer transactions" });
    }
  }

  // Get all transactions overview (banker view)
  static async getAllTransactions(req, res) {
    try {
      // Check if user is a banker
      if (req.user.typeofuser !== "banker") {
        return res
          .status(403)
          .json({ Error: "Access denied. Banker privileges required." });
      }

      const transactions = await Transaction.getAll();

      res.json({
        Status: "Success",
        transactions,
      });
    } catch (error) {
      console.error("Get All Transactions Error:", error);
      res.status(500).json({ Error: "Error fetching all transactions" });
    }
  }
}

export default BankerController;
