import express from "express";
import sequelize from "./config/database";
import authRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from './routes/cartRoutes'

const app = express();

app.use(express.json())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB Connection error:", err));

sequelize.sync({ alter: true }) // auto-create/update tables
  .then(() => console.log("✅ Models synced"))
  .catch((err) => console.error("❌ Sync error:", err));
export default app;
