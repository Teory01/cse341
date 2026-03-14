const { ObjectId } = require("mongodb");

// GET all contacts
const getAllContacts = async (req, res) => {
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

module.exports = {
  getAllContacts,
  getSingleContact
}