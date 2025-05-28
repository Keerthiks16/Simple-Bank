import express from "express";
import TransactionController from "../controllers/transactionController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All transaction routes require authentication
router.use(verifyToken);

// Customer transaction routes
router.get("/balance", TransactionController.getBalance);
router.get("/history", TransactionController.getTransactions);
router.post("/deposit", TransactionController.deposit);
router.post("/withdraw", TransactionController.withdraw);
router.post("/transfer", TransactionController.transfer);

export default router;
