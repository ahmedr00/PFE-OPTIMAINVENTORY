import mongoose from "mongoose";

const sheetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    compteur1: {
      type: String,
    },
    compteur2: {
      type: String,
    },
    progress: {
      type: Number,
      default: 0,
    },
    countedArticles: {
      type: Number,
      default: 0,
    },
    totalArticles: {
      type: Number,
      default: 0,
    },
    ecarts: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  },
);
const Sheet = mongoose.model("Sheet", sheetSchema);
export default Sheet;
