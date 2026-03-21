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
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/contacts", require("./routes/contacts"));

// Root route (optional)
app.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contact = await db.collection("contacts").findOne();

    if (!contact) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// MongoDB connection
MongoClient.connect(process.env.MONGODB_URL)
  .then((client) => {
    const db = client.db('CSE341');
    app.locals.db = db;
    console.log('Connected to MongoDB!');

    app.listen(port, () => {
      console.log(`Contacts server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });