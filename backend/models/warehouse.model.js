import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    // required: true,
  },
  name: { type: String, required: true },
  location: { type: String },
});

export const Warehouse = mongoose.model("Warehouse", WarehouseSchema);
