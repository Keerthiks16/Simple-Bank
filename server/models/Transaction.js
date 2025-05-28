import { dbPromise } from "../config/database.js";

class Transaction {
  constructor(
    senderId,
    receiverId,
    amount,
    transactionType,
    description,
    status = "completed"
  ) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.amount = amount;
    this.transactionType = transactionType;
    this.description = description;
    this.status = status;
  }

  // Create a new transaction
  static async create(transactionData) {
    const sql = `
      INSERT INTO transactions 
      (sender_id, receiver_id, amount, transaction_type, description, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
      const [result] = await dbPromise.execute(sql, [
        transactionData.senderId || null,
        transactionData.receiverId || null,
        transactionData.amount,
        transactionData.transactionType,
        transactionData.description || null,
        transactionData.status || "completed",
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions by user ID
  static async getByUserId(userId) {
    const sql = `
      SELECT 
        t.*,
        sender.username as sender_username,
        receiver.username as receiver_username
      FROM transactions t
      LEFT JOIN users sender ON t.sender_id = sender.id
      LEFT JOIN users receiver ON t.receiver_id = receiver.id
      WHERE t.sender_id = ? OR t.receiver_id = ?
      ORDER BY t.created_at DESC
    `;

    try {
      const [rows] = await dbPromise.execute(sql, [userId, userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all transactions (for banker view)
  static async getAll() {
    const sql = `
      SELECT 
        t.*,
        sender.username as sender_username,
        receiver.username as receiver_username
      FROM transactions t
      LEFT JOIN users sender ON t.sender_id = sender.id
      LEFT JOIN users receiver ON t.receiver_id = receiver.id
      ORDER BY t.created_at DESC
    `;

    try {
      const [rows] = await dbPromise.execute(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get transaction by ID
  static async getById(id) {
    const sql = `
      SELECT 
        t.*,
        sender.username as sender_username,
        receiver.username as receiver_username
      FROM transactions t
      LEFT JOIN users sender ON t.sender_id = sender.id
      LEFT JOIN users receiver ON t.receiver_id = receiver.id
      WHERE t.id = ?
    `;

    try {
      const [rows] = await dbPromise.execute(sql, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions by customer ID (for banker view)
  static async getByCustomerId(customerId) {
    const sql = `
      SELECT 
        t.*,
        sender.username as sender_username,
        receiver.username as receiver_username
      FROM transactions t
      LEFT JOIN users sender ON t.sender_id = sender.id
      LEFT JOIN users receiver ON t.receiver_id = receiver.id
      WHERE t.sender_id = ? OR t.receiver_id = ?
      ORDER BY t.created_at DESC
    `;

    try {
      const [rows] = await dbPromise.execute(sql, [customerId, customerId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Transaction;
