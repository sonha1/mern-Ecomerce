import express from "express";
import {
  createProduct,
  getProducts,
  listProducts,
  deleteProduct,
  hideProduct,
  updateProduct,
  getDetailProduct,
  createReview,
  deleteReview,
} from "../controllers/product.controller.js";
import { validate } from "../handlers/validation.js";
import { verifyToken, checkRole } from "../midleware/auth.js";

const router = express.Router();
router.post(
  "/create",
  verifyToken,
  checkRole("admin"),
  validate,
  createProduct
);
router.get("/", getProducts);
router.get("/all", verifyToken, checkRole("admin"), listProducts);
router.put("/hide/:id", verifyToken, checkRole("admin"), hideProduct);
router.put("/update/:id", verifyToken, checkRole("admin"), updateProduct);
router.post("/review/create/:id", verifyToken, createReview);
router.delete("/review/delete/:id", verifyToken, deleteReview);
router.delete("/:id", verifyToken, checkRole("admin"), deleteProduct);
router.get("/:id", getDetailProduct);
export default router;
