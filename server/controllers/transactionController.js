import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { dbPromise } from "../config/database.js";

class TransactionController {
  // Get user's balance
  static async getBalance(req, res) {
    try {
      const userId = req.user.id;
      const balance = await User.getBalance(userId);

      if (balance === null) {
        return res.status(404).json({ Error: "User not found" });
      }

      res.json({
        Status: "Success",
        balance: parseFloat(balance),
      });
    } catch (error) {
      console.error("Get Balance Error:", error);
      res.status(500).json({ Error: "Error fetching balance" });
    }
  }

  // Get user's transaction history
  static async getTransactions(req, res) {
    try {
      const userId = req.user.id;
      const transactions = await Transaction.getByUserId(userId);

      res.json({
        Status: "Success",
        transactions,
      });
    } catch (error) {
      console.error("Get Transactions Error:", error);
      res.status(500).json({ Error: "Error fetching transactions" });
    }
  }

  // Deposit money
  static async deposit(req, res) {
    const connection = await dbPromise.getConnection();

    try {
      const { amount, description } = req.body;
      const userId = req.user.id;

      // Validation
      if (!amount || amount <= 0) {
        return res.status(400).json({ Error: "Invalid amount" });
      }

      await connection.beginTransaction();

      // Get current balance
      const currentBalance = await User.getBalance(userId);
      if (currentBalance === null) {
        await connection.rollback();
        return res.status(404).json({ Error: "User not found" });
      }

      // Calculate new balance
      const newBalance = parseFloat(currentBalance) + parseFloat(amount);

      // Update balance
      await User.updateBalance(userId, newBalance);

      // Create transaction record
      await Transaction.create({
        receiverId: userId,
        amount: parseFloat(amount),
        transactionType: "deposit",
        description: description || "Cash deposit",
      });

      await connection.commit();

      res.json({
        Message: "Deposit successful",
        newBalance: parseFloat(newBalance),
      });
    } catch (error) {
      await connection.rollback();
      console.error("Deposit Error:", error);
      res.status(500).json({ Error: "Error processing deposit" });
    } finally {
      connection.release();
    }
  }

  // Withdraw money
  static async withdraw(req, res) {
    const connection = await dbPromise.getConnection();

    try {
      const { amount, description } = req.body;
      const userId = req.user.id;

      // Validation
      if (!amount || amount <= 0) {
        return res.status(400).json({ Error: "Invalid amount" });
      }

      await connection.beginTransaction();

      // Get current balance
      const currentBalance = await User.getBalance(userId);
      if (currentBalance === null) {
        await connection.rollback();
        return res.status(404).json({ Error: "User not found" });
      }

      // Check if sufficient funds
      if (parseFloat(currentBalance) < parseFloat(amount)) {
        await connection.rollback();
        return res.status(400).json({ Error: "Insufficient Funds" });
      }

      // Calculate new balance
      const newBalance = parseFloat(currentBalance) - parseFloat(amount);

      // Update balance
      await User.updateBalance(userId, newBalance);

      // Create transaction record
      await Transaction.create({
        senderId: userId,
        amount: parseFloat(amount),
        transactionType: "withdrawal",
        description: description || "Cash withdrawal",
      });

      await connection.commit();

      res.json({
        Message: "Withdrawal successful",
        newBalance: parseFloat(newBalance),
      });
    } catch (error) {
      await connection.rollback();
      console.error("Withdrawal Error:", error);
      res.status(500).json({ Error: "Error processing withdrawal" });
    } finally {
      connection.release();
    }
  }

  // Transfer money between users
  static async transfer(req, res) {
    const connection = await dbPromise.getConnection();

    try {
      const { receiverUsername, amount, description } = req.body;
      const senderId = req.user.id;

      // Validation
      if (!receiverUsername || !amount || amount <= 0) {
        return res.status(400).json({ Error: "Invalid transfer details" });
      }

      await connection.beginTransaction();

      // Find receiver
      const receiver = await User.findByUsername(receiverUsername);
      if (!receiver) {
        await connection.rollback();
        return res.status(404).json({ Error: "Receiver not found" });
      }

      if (receiver.id === senderId) {
        await connection.rollback();
        return res.status(400).json({ Error: "Cannot transfer to yourself" });
      }

      // Get sender balance
      const senderBalance = await User.getBalance(senderId);
      if (parseFloat(senderBalance) < parseFloat(amount)) {
        await connection.rollback();
        return res.status(400).json({ Error: "Insufficient Funds" });
      }

      // Get receiver balance
      const receiverBalance = await User.getBalance(receiver.id);

      // Update balances
      const newSenderBalance = parseFloat(senderBalance) - parseFloat(amount);
      const newReceiverBalance =
        parseFloat(receiverBalance) + parseFloat(amount);

      await User.updateBalance(senderId, newSenderBalance);
      await User.updateBalance(receiver.id, newReceiverBalance);

      // Create transaction record
      await Transaction.create({
        senderId: senderId,
        receiverId: receiver.id,
        amount: parseFloat(amount),
        transactionType: "transfer",
        description: description || `Transfer to ${receiver.username}`,
      });

      await connection.commit();

      res.json({
        Message: "Transfer successful",
        newBalance: parseFloat(newSenderBalance),
        transferredTo: receiver.username,
      });
    } catch (error) {
      await connection.rollback();
      console.error("Transfer Error:", error);
      res.status(500).json({ Error: "Error processing transfer" });
    } finally {
      connection.release();
    }
  }
}

export default TransactionController;
