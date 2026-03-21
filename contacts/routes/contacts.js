const express = require("express");
const routes = express.Router();
const contactsController = require("../controllers/contactsController");



// GET all contacts
routes.get("/", contactsController.getAllContacts);

// GET single contact
routes.get("/:id", contactsController.getSingleContact);

// POST - create a new contact
routes.post("/", contactsController.createContact);

// PUT - update a contact
routes.put("/:id", contactsController.updateContact);

// DELETE - delete a contact
routes.delete("/:id", contactsController.deleteContact);

module.exports = routes;
