import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";
// import userRoutes from "./routes/user.route.js";
// import articleRoutes from "./routes/article.route.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:8081", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/sheets", sheetRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/articles", articleRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
