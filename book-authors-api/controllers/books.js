const { getDb } = require('../db/database');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const db = getDb();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err.message });
  }
};

// GET single book by ID
const getBookById = async (req, res) => {
  try {
    const db = getDb();
    const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book', details: err.message });
  }
};

// POST create a new book
const createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const db = getDb();
    const newBook = {
      title: req.body.title,
      authorName: req.body.authorName,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      language: req.body.language,
      summary: req.body.summary
    };
    const result = await db.collection('books').insertOne(newBook);
    res.status(201).json({ message: 'Book created successfully', bookId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book', details: err.message });
  }
};

// PUT update a book
const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const db = getDb();
    const updatedBook = {
      title: req.body.title,
      authorName: req.body.authorName,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      language: req.body.language,
      summary: req.body.summary
    };
    const result = await db.collection('books').replaceOne(
      { _id: new ObjectId(req.params.id) },
      updatedBook
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book', details: err.message });
  }
};

// DELETE a book
const deleteBook = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book', details: err.message });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
