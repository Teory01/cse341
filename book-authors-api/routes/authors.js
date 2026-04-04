const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors');

const authorValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('nationality').notEmpty().withMessage('Nationality is required'),
  body('birthYear').isInt({ min: 1000, max: 2100 }).withMessage('Valid birth year required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('awardsWon').isInt({ min: 0 }).withMessage('Awards won must be 0 or more'),
  body('biography').notEmpty().withMessage('Biography is required')
];

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to perform this action'});
};

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', isAuthenticated, authorValidation, createAuthor);
router.put('/:id', isAuthenticated, authorValidation, updateAuthor);
router.delete('/:id', isAuthenticated, deleteAuthor);

module.exports = router;
