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
const PORT = process.env.PORT || 8080;

app.use(express.json());

// routes
app.use("/contacts", contactsRoutes);

// Database connection
const mongoUrl = process.env.MONGODB_URL;

// MongoDB connection
MongoClient.connect(mongoUrl)
  .then((client) => {
    const db = client.db("CSE341");
    app.locals.db = db;

    console.log("Connected to MongoDB!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

