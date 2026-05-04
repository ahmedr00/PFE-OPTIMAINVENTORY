import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    counted: {
      type: Number,
      default: null,
    },
    diff: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "counted", "ecart", "validated"],
      default: "pending",
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    photoUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

articleSchema.pre("save", function updateComputedArticleFields(next) {
  if (typeof this.counted === "number") {
    this.diff = this.counted - this.stock;
    this.status = this.diff === 0 ? "counted" : "ecart";
  } else {
    this.diff = 0;
    this.status = "pending";
  }

  next();
});

articleSchema.index({ reference: 1 });

const Article = mongoose.model("Article", articleSchema);

export default Article;
