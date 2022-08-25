import express from "express";
import {
  createOrder,
  listOrders,
  listMyOrders,
  getDetailOrder,
} from "../controllers/order.controller.js";
import { verifyToken, checkRole } from "../midleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/list", verifyToken, checkRole("admin"), listOrders);
router.get("/list/myorders", verifyToken, listMyOrders);
router.get("/:id", verifyToken, getDetailOrder);

export default router;
