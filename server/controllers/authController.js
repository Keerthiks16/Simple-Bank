import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";

const SALT_ROUNDS = 10;

class AuthController {
  // Get current user info (protected route)
  static async getCurrentUser(req, res) {
    try {
      res.json({
        Status: "Success",
        user: req.user,
      });
    } catch (error) {
      res.status(500).json({ Error: "Internal server error" });
    }
  }

  // Register new user
  static async signup(req, res) {
    try {
      const { username, email, age, gender, role, password } = req.body;

      // Validation
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ Error: "Username, email, and password are required" });
      }

      // Check if user already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ Error: "Username already exists" });
      }

      // Check if email already exists
      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(409).json({ Error: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(
        password.toString(),
        SALT_ROUNDS
      );

      // Create user data with proper defaults
      const userData = {
        username: username,
        email: email,
        age: age || null,
        gender: gender || null,
        typeofuser: role || "customer",
        password: hashedPassword,
        balance: 1000.0,
      };

      await User.create(userData);

      res.status(201).json({ Message: "User created successfully" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({
        Error: "Error creating user: " + (error.sqlMessage || error.message),
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validation
      if (!username || !password) {
        return res
          .status(400)
          .json({ Error: "Username and password are required" });
      }

      // Find user
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(404).json({ Error: "User not found" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(
        password.toString(),
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ Error: "Invalid password" });
      }

      // Generate token
      const tokenPayload = {
        id: user.id,
        username: user.username,
        typeofuser: user.typeofuser,
      };

      const token = generateToken(tokenPayload);

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.json({
        Message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          typeofuser: user.typeofuser,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({
        Error: "Error during login: " + error.message,
      });
    }
  }

  // Logout user
  static async logout(req, res) {
    try {
      res.clearCookie("token");
      res.json({ Message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ Error: "Error during logout" });
    }
  }
}

export default AuthController;
