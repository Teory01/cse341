const express = require('express');
const router = express.Router();

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/auth', require('./auth'));

module.exports = router;