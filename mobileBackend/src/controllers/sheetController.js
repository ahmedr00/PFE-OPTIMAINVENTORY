import Sheet from "../models/sheet.model.js";
import Article from "../models/article.model.js";

export const countArticle = async (req, res) => {
  const { id, articleId } = req.params;
  const { counted } = req.body;
  console.log("counted");

  try {
    // 1. Fetch the article first to ensure it exists
    const article = await Article.findById(articleId);
    console.log(article);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    // 2. Update and SAVE (using .save() triggers the pre-save hook for diff/status)
    article.counted = Number(counted);
    await article.save();

    // 3. Fetch the Sheet and populate articles[cite: 24]
    const sheet = await Sheet.findById(id).populate("articles");
    if (!sheet) {
      return res.status(404).json({ message: "Fiche non trouvée" });
    }

    // 4. SAFE FILTER: Check if 'art' exists before accessing '.counted'[cite: 24]
    // This prevents the 500 error if there's a broken ID in the articles array[cite: 24]
    const totalCounted = sheet.articles.filter(
      (art) => art && typeof art.counted === "number",
    ).length;

    // 5. Update sheet stats and SAVE (triggers pre-validate hook for progress)[cite: 23, 24]
    sheet.countedArticles = totalCounted;
    await sheet.save();

    res.status(200).json({
      message: "Comptage enregistré",
      article,
      sheet,
    });
  } catch (error) {
    // LOG THE ERROR: This will show the exact reason in your VS Code terminal[cite: 24]
    console.error("CRASH IN COUNT_ARTICLE:", error);
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
    const sheet = await Sheet.findById(id).populate("articles");

    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }
    res.json({ sheet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
