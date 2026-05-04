import express from "express";
import {
  login,
  logout,
  updateMe,
  updatePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/login-mobile", login);
router.post("/logout-mobile", logout);
router.patch("/update-me", verifyToken, updateMe);
router.patch("/update-password", verifyToken, updatePassword);

export default router;
