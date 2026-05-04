import express from "express";
import {
  getAllSheets,
  getSheetById,
  countArticle,
} from "../controllers/sheetController.js";

const router = express.Router();

router.get("/get-sheet-mobile", getAllSheets);
router.get("/:id", getSheetById);
// Route for updating article count
router.patch("/:id/articles/:articleId/count", countArticle);

export default router;
