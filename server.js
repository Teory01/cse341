require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('./passport');

const app = express();
const port = process.env.PORT || 8080;

// 🔥 REQUIRED FOR RENDER
app.set('trust proxy', 1);

app.use(express.json());

// 🔥 SESSION (FIXED)
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

// Routes
app.use('/auth', require('./book-authors-api/routes/auth'));


app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      `Hello ${req.user.name} 
      <br><a href="/auth/profile">Profile</a> 
      <br><a href="/auth/logout">Logout</a>`
    );
  } else {
    res.redirect('/auth/login');
  }
});


app.get('/test-auth', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});