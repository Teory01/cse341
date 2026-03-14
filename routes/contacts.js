const express = require("express");
const routes = express.Router();

const contactsController = require("../controllers/contactsController");

// GET all contacts
routes.get("/", contactsController.getAllContacts);

// GET single contact
routes.get("/:id", contactsController.getSingleContact);

module.exports = routes;
