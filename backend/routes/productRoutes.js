import express from "express";

import {
  getProducts,
  getProductById,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();
router.get("/", getProducts);

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllProductsAdmin
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

router.get("/:id", getProductById);

export default router;