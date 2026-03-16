const { ObjectId } = require("mongodb");

// GET all contacts
const getAllContacts = async (req, res) => {
  // swagger.tags = ['Contacts']
  try {
    const db = req.app.locals.db;

    const contacts = await db.collection("contacts").find().toArray();

    console.log("Contacts from DB:", contacts);

    res.status(200).json(contacts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET single contact by ID
const getSingleContact = async (req, res) => {
  // swagger.tags = ['Contacts']

  try {
    const db = req.app.locals.db;
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!contact) return res.status(404).json({ error: "Contact not found" });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// POST - create a new contact
const createContact = async (req, res) => {
  // swagger.tags = ['Contacts']
  try {
    const db = req.app.locals.db;
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const result = await db.collection("contacts").insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - update a contact
const updateContact = async (req, res) => {
  // swagger.tags = ['Contacts']
  try {
    const db = req.app.locals.db;
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const result = await db
      .collection("contacts")
      .replaceOne({ _id: new ObjectId(req.params.id) }, contact);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - delete a contact
const deleteContact = async (req, res) => {
  // swagger.tags = ['Contacts']
  try {
    const db = req.app.locals.db;
    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
}