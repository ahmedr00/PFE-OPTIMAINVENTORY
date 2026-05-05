import { Warehouse } from "../models/warehouse.model.js";
import { Article } from "../models/article.model.js";

// --- Warehouse Handlers ---
export const createWarehouse = async (req, res) => {
  try {
    const newWarehouse = new Warehouse(req.body);
    const saved = await newWarehouse.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getWarehousesByCompany = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({
      companyId: req.params.companyId,
    });
    res.status(200).json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
