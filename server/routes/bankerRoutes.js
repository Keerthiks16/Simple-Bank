import express from "express";
import BankerController from "../controllers/bankerController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All banker routes require authentication
router.use(verifyToken);

// Banker-specific routes
router.get("/customers", BankerController.getAllCustomers);
router.get(
  "/customers/:customerId/transactions",
  BankerController.getCustomerTransactions
);
router.get("/transactions", BankerController.getAllTransactions);

export default router;
