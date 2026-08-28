import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/OrderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

//Create order
router.post("/", authMiddleware, createOrder);
// My Orders
router.get("/myorders", authMiddleware, getMyOrders);

// Admin - all Orders
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);
//Admin - Update status
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// Get single order
router.get("/:id", authMiddleware, getOrderById);

export default router;