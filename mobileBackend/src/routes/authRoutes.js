import express from "express";
import { login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login-mobile", login);
router.post("/logout-mobile", logout);

export default router;
