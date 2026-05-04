import Sheet from "../models/sheet.model.js";
import Article from "../models/article.model.js";

export const countArticle = async (req, res) => {
  const { id, articleId } = req.params;
  const { counted } = req.body;

  try {
    // 1. Update the Article first
    const updatedArticle = await Article.findByIdAndReplace(
      articleId,
      { counted: Number(counted) },
      { new: true, runValidators: true },
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    // 2. Fetch the Sheet and its articles to recalculate stats
    const sheet = await Sheet.findById(id).populate("articles");

    // Count how many articles have a non-null 'counted' value
    const totalCounted = sheet.articles.filter(
      (art) => art.counted !== null,
    ).length;

    // Update Sheet stats
    sheet.countedArticles = totalCounted;
    // The pre-validate hook in your model will handle the 'progress' %
    await sheet.save();

    res.status(200).json({
      message: "Comptage enregistré",
      article: updatedArticle,
      sheet: sheet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({})
      .populate("articles")
      .sort({ createdAt: -1 });
    res.json({ sheets });
  } catch (error) {
    console.log(` Error fetching sheets: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const getSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const sheet = await recalculateSheetStats(id);
    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }
    res.json({ sheet });
  } catch (error) {
    console.log(` Error fetching sheet: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
