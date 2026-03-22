const { getDb } = require('../db/database');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

const getAllAuthors = async (req, res) => {
  try {
    const db = getDb();
    const authors = await db.collection('authors').find().toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch authors', details: err.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const db = getDb();
    const author = await db.collection('authors').findOne({ _id: new ObjectId(req.params.id) });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch author', details: err.message });
  }
};

const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const db = getDb();
    const newAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      birthYear: req.body.birthYear,
      genre: req.body.genre,
      awardsWon: req.body.awardsWon,
      biography: req.body.biography
    };
    const result = await db.collection('authors').insertOne(newAuthor);
    res.status(201).json({ message: 'Author created successfully', authorId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create author', details: err.message });
  }
};

const updateAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const db = getDb();
    const updatedAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      birthYear: req.body.birthYear,
      genre: req.body.genre,
      awardsWon: req.body.awardsWon,
      biography: req.body.biography
    };
    const result = await db.collection('authors').replaceOne(
      { _id: new ObjectId(req.params.id) },
      updatedAuthor
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update author', details: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('authors').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete author', details: err.message });
  }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };