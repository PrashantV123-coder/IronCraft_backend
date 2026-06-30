const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDB = require("./config/db");

// Routes
const userRoutes = require("./routes/user.router");
const sellerRoutes = require("./routes/seller.routes");
const designRoutes = require("./routes/design.routes");
const orderRoutes = require("./routes/orders.routes");
const slotTimeRoutes = require("./routes/slotTime.routes");
const bookSlotRoutes = require("./routes/bookSlot.routes");

const app = express();

// Connect Database
connectToDB();

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://iron-craft-gamma.vercel.app",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IronCraft Backend is running 🚀",
  });
});

// Routes
app.use("/users", userRoutes);
app.use("/seller", sellerRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/slot-time", slotTimeRoutes);
app.use("/api/book-slots", bookSlotRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;