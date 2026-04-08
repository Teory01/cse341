require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('./passport');

const app = express();
const port = process.env.PORT || 8080;


app.set('trust proxy', 1);

app.use(express.json());


app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    proxy: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

// ========================
// ROUTES
// ========================
app.use('/auth', require('./book-authors-api/routes/auth'));
app.use('/books', require('./book-authors-api/routes/books'));
app.use('/authors', require('./book-authors-api/routes/authors'));

// ========================
// HOME ROUTE
// ========================
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <h1>Welcome ${req.user.name}</h1>
      <a href="/auth/profile">Profile</a><br>
      <a href="/auth/logout">Logout</a>
    `);
  } else {
    res.status(200).send(`
      <h1>Not logged in</h1>
      <a href="/auth/login">Login with Google</a>
    `);
  }
});

// ========================
// DEBUG ROUTE (optional)
// ========================
app.get('/test-auth', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null
  });
});

// ========================
// 404 HANDLER (LAST)
// ========================
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ========================
// START SERVER
// ========================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Google OAuth callback URL: https://cse341-qvea.onrender.com/auth/google/callback');
});