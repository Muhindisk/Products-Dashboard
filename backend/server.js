// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: "https://products-dashboard-molf.vercel.app/", // Adjust according to your frontend port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// Default route (Home Page)
app.get("/", (req, res) => {
  res.send("Welcome to the Product API! Go to /api/products to see all products.");
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; 