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
});
export const Article = mongoose.model("Article", articleSchema);
