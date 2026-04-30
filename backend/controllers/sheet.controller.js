import Sheet from "../models/sheet.model.js";

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
    const { name, totalArticles, progress } = req.body;
    const newSheet = new Sheet({
      name,
      totalArticles,
      status: "in_progress",
      countedArticles: 0,
      ecarts: totalArticles - 0,
    });
    await newSheet.save();
    res
      .status(201)
      .json({ message: "Sheet created successfully", sheet: newSheet });
  } catch (error) {
    console.log(` Error creating sheet: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const getSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const sheet = await Sheet.findById(id);
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
    const { name, description } = req.body;
    const updatedSheet = await Sheet.findByIdAndUpdate(
      id,
      { name, description },
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
