const { ObjectId } = require('mongodb');
const Contact = require('../models/contact');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contacts = await db.collection('contacts').find().toArray();
    console.log('Contacts from DB:', contacts);
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contact = await db.collection('contacts').findOne({
      _id: new ObjectId(req.params.id)
    });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST - create a new contact using Mongoose validation
const createContact = async (req, res) => {
  try {
    // Validate with Mongoose
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });
    await contact.validate();

    // Insert into MongoDB if valid
    const db = req.app.locals.db;
    const result = await db.collection('contacts').insertOne(contact.toObject());

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

// PUT - update a contact using Mongoose validation
const updateContact = async (req, res) => {
  try {
    // Validate with Mongoose
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });
    await contact.validate();

    // Update in MongoDB if valid
    const db = req.app.locals.db;
    const result = await db.collection('contacts').replaceOne(
      { _id: new ObjectId(req.params.id) },
      contact.toObject()
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

// DELETE - delete a contact
const deleteContact = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await db.collection('contacts').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};