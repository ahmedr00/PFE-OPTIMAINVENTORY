import express from "express";
import {
  createWarehouse,
  getWarehousesByCompany,
} from "../controllers/warehouse.controller.js";
const router = express.Router();
// Warehouse Routes
router.post("/warehouses", createWarehouse);
router.get("/warehouses/company/:companyId", getWarehousesByCompany);

export default router;
