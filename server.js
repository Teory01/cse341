//const express = require('express');
//const app = express();

//const port = 3000;

//app.use('/', require('./routes'));

 
//app.listen(process.env.PORT || 3000, () => {
// console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
//});



require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const contactsRoutes = require("./routes/contacts");

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

// Routes
app.use("/contacts", contactsRoutes);

// Get PORT from environment (Render provides this)
const PORT = process.env.PORT || 8080;

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in environment variables!");
  process.exit(1); // Exit if URI is missing
}

// Async function to connect to MongoDB and start server
async function startServer() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    // Save DB instance for routes
    const db = client.db("CSE341");
    app.locals.db = db;

    console.log("Connected to MongoDB!");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  }
}

// Start the server
startServer();
