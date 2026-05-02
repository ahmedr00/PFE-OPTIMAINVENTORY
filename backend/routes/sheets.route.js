import express from "express";
import {
  addCompteurToSheet,
  createSheet,
  deleteSheet,
  getAllSheets,
  getSheetById,
  updateSheet,
} from "../controllers/sheet.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.put("/:id", addCompteurToSheet);
router.get("/get-sheet", getAllSheets);
router.post("/create-sheet", upload.single("sageFile"), createSheet);
router.get("/:id", getSheetById);
router.put("/:id", updateSheet);
router.delete("/:id", deleteSheet);
export default router;
