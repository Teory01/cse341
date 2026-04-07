// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('./passport'); // Passport config
const { initDb } = require('./book-authors-api/db/database'); // Your DB init
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

// ----- 1️⃣ JSON Parsing ----- //
app.use(express.json());

// ----- 2️⃣ SESSION & PASSPORT ----- //
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ----- 3️⃣ ROUTES ----- //
app.use('/auth', require('./book-authors-api/routes/auth'));
app.use('/books', require('./book-authors-api/routes/books'));
app.use('/authors', require('./book-authors-api/routes/authors'));

// ----- 4️⃣ SWAGGER ----- //
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, null, {
    oauth2RedirectUrl: `${process.env.CALLBACK_URL}`,
    swaggerOptions: {
      oauth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        appName: 'Books & Authors API',
        usePkceWithAuthorizationCodeGrant: true,
        scopeSeparator: ' ',
      },
    },
  })
);

// ----- 5️⃣ ROOT ----- //
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      `Hello ${req.user.displayName}! <a href="/auth/logout">Logout</a> | <a href="/auth/profile">Profile</a>`
    );
  } else {
    res.redirect('/auth/login');
  }
});

// ----- 6️⃣ 404 ----- //
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ----- 7️⃣ START SERVER AFTER DB INIT ----- //
initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Google OAuth callback URL: ${process.env.CALLBACK_URL}`);
    });
  }
});