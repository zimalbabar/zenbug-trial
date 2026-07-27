// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());

app.use(bodyParser.json({ 
  limit: "10mb" 
}));

app.use(bodyParser.urlencoded({ 
  extended: true, 
  limit: "10mb" 
}));


// Health check route
app.get("/", (req, res) => {
  res.send("Zenbug Backend is running 🚀");
});


// Routes
const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});