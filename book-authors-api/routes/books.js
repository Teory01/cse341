const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/books');

const bookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('authorName').notEmpty().withMessage('Author name is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('publishedYear').isInt({ min: 1000, max: 2100 }).withMessage('Valid published year required'),
  body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive number'),
  body('language').notEmpty().withMessage('Language is required'),
  body('summary').notEmpty().withMessage('Summary is required')
];

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', bookValidation, createBook);
router.put('/:id', bookValidation, updateBook);
router.delete('/:id', deleteBook);

module.exports = router;