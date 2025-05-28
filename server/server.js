import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import bankerRoutes from "./routes/bankerRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/banker", bankerRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    Status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
