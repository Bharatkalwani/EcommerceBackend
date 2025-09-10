import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json())
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});
console.log("done")
// Test DB connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB Connection error:", err));

sequelize.sync({ alter: true }) // auto-create/update tables
  .then(() => console.log("✅ Models synced"))
  .catch((err) => console.error("❌ Sync error:", err));
export default app;
