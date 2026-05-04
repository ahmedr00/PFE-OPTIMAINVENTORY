import Sheet from "../models/sheet.model.js";
import Article from "../models/article.model.js";

export const getAllSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({});
    res.json({ sheets });
  } catch (error) {
    console.log(` Error fetching sheets: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
