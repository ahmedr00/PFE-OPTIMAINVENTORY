import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getCompanyWarehouses,
} from "../controllers/company.controller.js";

const router = express.Router();
// Super Admin routes
router.post("/", createCompany);
router.get("/", getAllCompanies);

// Company Specific routes
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

// Relations
router.get("/:id/warehouses", getCompanyWarehouses);

export default router;
