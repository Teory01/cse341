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

// Root route (returns a single contact)
app.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contact = await db.collection("contacts").findOne();

    if (!contact) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Routes
app.use("/contacts", contactsRoutes);

// Get PORT from environment (Render provides this)
const PORT = process.env.PORT || 8080;

// MongoDB URL
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("Error: MONGODB_URI is not defined in environment variables!");
  process.exit(1); 
}

// Async function to connect to MongoDB and start server
async function startServer() {
  try {
    const client = new MongoClient(MONGODB_URL);
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
