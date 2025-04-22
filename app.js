const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const connectDB = require("./conn/conn.js"); // MongoDB connection
const auth = require("./routes/auth.js");    // Auth routes
const list = require("./routes/list.js");    // List routes

const app = express();

// ✅ Proper CORS setup (NO trailing slash)
const corsOptions = {
  origin: ['https://jovial-moxie-f5e774.netlify.app'], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse JSON request body

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1", auth);
app.use("/api/v1", list);

// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
