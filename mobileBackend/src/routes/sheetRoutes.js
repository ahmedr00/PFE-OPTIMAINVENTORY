import express from "express";
import { getAllSheets } from "../controllers/sheetController.js";

const router = express.Router();

router.get("/get-sheet-mobile", getAllSheets);
export default router;
