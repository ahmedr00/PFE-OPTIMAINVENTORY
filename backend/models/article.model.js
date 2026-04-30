import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
});
const Article = mongoose.model("Article", articleSchema);

export default Article;
