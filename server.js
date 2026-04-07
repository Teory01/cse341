require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('./passport');
const { initDb } = require('./book-authors-api/db/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

// Parse JSON
app.use(express.json());

// Sessions (secure on Render HTTPS)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, null, {
    swaggerOptions: {
      oauth2RedirectUrl: `${process.env.CALLBACK_URL.replace('/auth/google/callback', '')}/api-docs/oauth2-redirect.html`,
      oauth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        appName: 'Books & Authors API',
        usePkceWithAuthorizationCodeGrant: true,
        scopeSeparator: ' ',
      },
    },
  })
);

// Routes
app.use('/auth', require('./book-authors-api/routes/auth'));
app.use('/books', require('./book-authors-api/routes/books'));
app.use('/authors', require('./book-authors-api/routes/authors'));

// Redirect root to login
app.get('/', (req, res) => res.redirect('/auth/login'));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Start DB + server
initDb(err => {
  if (err) return console.error('Database connection failed:', err);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Google OAuth callback URL: ${process.env.CALLBACK_URL}`);
  });
});