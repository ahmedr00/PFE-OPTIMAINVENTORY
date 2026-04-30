import express from "express";
import {
  createSheet,
  deleteSheet,
  getAllSheets,
  getSheetById,
  updateSheet,
} from "../controllers/sheet.controller.js";

const router = express.Router();
router.get("/get-sheet", getAllSheets);
router.post("/create-sheet", createSheet);
router.get("/:id", getSheetById);
router.put("/:id", updateSheet);
router.delete("/:id", deleteSheet);
export default router;
