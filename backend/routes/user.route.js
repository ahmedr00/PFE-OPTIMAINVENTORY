import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCounters,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/get-users", getAllUsers);
router.get("/get-counters", getCounters);
router.post("/create-user", createUser);
router.get("/:id", getUserById);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
