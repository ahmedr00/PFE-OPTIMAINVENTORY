import fs from "fs";
import csv from "csv-parser";
import Sheet from "../models/sheet.model.js";
import { Article } from "../models/article.model.js";

export const getAllSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({});
    res.json({ sheets });
  } catch (error) {
    console.log(` Error fetching sheets: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const createSheet = async (req, res) => {
  try {
    const { name } = req.body;
    const articlesFromCsv = [];

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Read and parse the CSV
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => articlesFromCsv.push(row))
      .on("end", async () => {
        try {
          // 1. Map CSV rows to your Article schema and insert[cite: 6, 8]
          const createdArticles = await Article.insertMany(
            articlesFromCsv.map((row) => ({
              reference: row.reference,
              designation: row.designation,
              stock: parseInt(row.stock) || 0,
              counted: 0,
            })),
          );

          // 2. Initialize the Sheet linked to the new articles[cite: 6, 8]
          const newSheet = new Sheet({
            name,
            articles: createdArticles.map((a) => a._id),
            status: "in_progress",
            totalArticles: createdArticles.length,
            countedArticles: 0,
            progress: 0,
            ecarts: 0,
          });

          await newSheet.save();

          // 3. Delete the temp file to keep the server clean
          fs.unlinkSync(req.file.path);

          res.status(201).json({
            message: "Sheet created successfully",
            sheet: newSheet,
          });
        } catch (dbError) {
          res
            .status(500)
            .json({ message: "Database Error: " + dbError.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const sheet = await Sheet.findById(id).populate("articles");
    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }
    res.json({ sheet });
  } catch (error) {
    console.log(` Error fetching sheet: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const updateSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, articlesIds, countedArticles } = req.body;
    const updatedSheet = await Sheet.findByIdAndUpdate(
      id,
      {
        name,
        description,
        articles: articlesIds,
        totalArticles: articlesIds ? articlesIds.length : 0,
        countedArticles: countedArticles || 0,
      },
      { new: true },
    );
    if (!updatedSheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }
    res.json({ message: "Sheet updated successfully", sheet: updatedSheet });
  } catch (error) {
    console.log(` Error updating sheet: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const deleteSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSheet = await Sheet.findByIdAndDelete(id);
    if (!deletedSheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }
    res.json({ message: "Sheet deleted successfully" });
  } catch (error) {
    console.log(` Error deleting sheet: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const addCompteurToSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const { compteurName } = req.body;

    // $push adds the new name to the assignedCompteurs array
    const updatedSheet = await Sheet.findByIdAndUpdate(
      id,
      { $push: { assignedCompteurs: compteurName } },
      { new: true },
    );

    res.json({ sheet: updatedSheet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
