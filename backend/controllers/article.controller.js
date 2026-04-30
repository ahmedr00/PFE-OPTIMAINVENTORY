import Article from "../models/article.model.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json({ articles });
  } catch (error) {
    console.log(` Error fetching articles: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const createArticle = async (req, res) => {
  try {
    const { reference, designation, stock, prix } = req.body;
    const article = new Article({ reference, designation, stock, prix });
    await article.save();
    res.status(201).json({ article });
  } catch (error) {
    console.log(` Error creating article: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ article });
  } catch (error) {
    console.log(` Error fetching article: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { reference, designation, stock, prix } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { reference, designation, stock, prix },
      { new: true },
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ article: updatedArticle });
  } catch (error) {
    console.log(` Error updating article: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.log(` Error deleting article: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
