require('dotenv').config();
const express = require('express');
const { initDb } = require('./book-authors-api/db/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/books', require('./book-authors-api/routes/books'));
app.use('/authors', require('./book-authors-api/routes/authors'));

// Start server after DB connects
initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
