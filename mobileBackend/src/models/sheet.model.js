import mongoose from "mongoose";

const sheetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "in_progress", "completed", "validated"],
      default: "in_progress",
    },
    priority: {
      type: String,
      enum: ["Basse", "Normale", "Haute"],
      default: "Normale",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    assignedDate: {
      type: Date,
      default: Date.now,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    assignedCompteurs: [
      {
        type: String,
        trim: true,
      },
    ],

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
    compteur1: {
      type: String,
      default: "",
      trim: true,
    },
    compteur2: {
      type: String,
      default: "",
      trim: true,
    },
  },

  {
    timestamps: true,
  },
);

sheetSchema.pre("validate", function normalizeSheetFields(next) {
  this.assignedCompteurs = [
    ...new Set((this.assignedCompteurs || []).filter(Boolean)),
  ];
  this.totalArticles = this.totalArticles || this.articles?.length || 0;
  this.progress = this.totalArticles
    ? Math.round(((this.countedArticles || 0) / this.totalArticles) * 100)
    : 0;

  if (this.totalArticles > 0 && this.countedArticles >= this.totalArticles) {
    this.status = this.ecarts > 0 ? "in_progress" : "completed";
  }
});

const Sheet = mongoose.model("Sheet", sheetSchema);
export default Sheet;
