require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('./passport'); // root-level passport.js
const { initDb } = require('./book-authors-api/db/database'); // correct path
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./book-authors-api/routes/auth')); // auth routes
app.use('/books', require('./book-authors-api/routes/books')); 
app.use('/authors', require('./book-authors-api/routes/authors'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize DB and start server
initDb((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});