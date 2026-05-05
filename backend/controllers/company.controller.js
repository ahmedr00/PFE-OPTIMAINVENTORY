import { Company } from "../models/company.model.js";
import { Warehouse } from "../models/warehouse.model.js";

// Create a new Company (Logic for Super Admin)
export const createCompany = async (req, res) => {
  try {
    const { name, legalName } = req.body;
    const newCompany = new Company({ name, legalName });
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating company", error: err.message });
  }
};

// Get all companies (For Super Admin dashboard)
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single company details
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update company info (legal name, etc.)
export const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all warehouses belonging to a company
export const getCompanyWarehouses = async (req, res) => {
  try {
    // This uses the companyId (FK) defined in your Warehouse model
    const warehouses = await Warehouse.find({ companyId: req.params.id });
    res.status(200).json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a company
export const deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    // Note: You might want to delete associated Warehouses and Articles here (Cascading)
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
