import { dbPromise } from "../config/database.js";

class User {
  constructor(
    username,
    email,
    age,
    gender,
    typeofuser,
    password,
    balance = 1000.0
  ) {
    this.username = username;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.typeofuser = typeofuser;
    this.password = password;
    this.balance = balance;
  }

  // Create a new user with default balance
  static async create(userData) {
    const sql =
      "INSERT INTO users (`username`, `email`, `age`, `gender`, `typeofuser`, `password`, `balance`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
      const [result] = await dbPromise.execute(sql, [
        userData.username,
        userData.email,
        userData.age,
        userData.gender,
        userData.typeofuser,
        userData.password,
        userData.balance || 1000.0,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    const sql = "SELECT * FROM users WHERE username = ?";

    try {
      const [rows] = await dbPromise.execute(sql, [username]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";

    try {
      const [rows] = await dbPromise.execute(sql, [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";

    try {
      const [rows] = await dbPromise.execute(sql, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Get user balance
  static async getBalance(userId) {
    const sql = "SELECT balance FROM users WHERE id = ?";

    try {
      const [rows] = await dbPromise.execute(sql, [userId]);
      return rows.length > 0 ? rows[0].balance : null;
    } catch (error) {
      throw error;
    }
  }

  // Update user balance
  static async updateBalance(userId, newBalance) {
    const sql = "UPDATE users SET balance = ? WHERE id = ?";

    try {
      const [result] = await dbPromise.execute(sql, [newBalance, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get all customers (for banker view)
  static async getAllCustomers() {
    const sql =
      "SELECT id, username, email, balance, created_at FROM users WHERE typeofuser = 'customer'";

    try {
      const [rows] = await dbPromise.execute(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default User;
