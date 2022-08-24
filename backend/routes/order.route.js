import express from "express";
import {
  createOrder,
  listOrders,
  getDetailOrderAdmin,
  listMyOrders,
  getDetailOrderUser,
} from "../controllers/order.controller.js";
import { verifyToken, checkRole } from "../midleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/admin/list", verifyToken, checkRole("admin"), listOrders);

router.get("/list/myorders", verifyToken, listMyOrders);
router.get("/admin/:id", verifyToken, checkRole("admin"), getDetailOrderAdmin);
router.get("/:id", verifyToken, getDetailOrderUser);

export default router;
