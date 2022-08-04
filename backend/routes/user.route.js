import express from "express";
import {
  login,
  register,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken, checkRole } from "../midleware/auth.js";
import { body } from "express-validator";
import { validate } from "../handlers/validation.js";

const router = express.Router();

router.post("/login", body("email").isEmail(), login);
router.post("/register", body("email").isEmail(), validate, register);
router.get("/all", verifyToken, checkRole("admin"), getAllUsers);

export default router;
