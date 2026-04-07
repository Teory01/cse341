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

app
  // Parse JSON
  .use(express.json())

  // Session configuration
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL, 
      }),
    })
  )

  // Passport initialization
  .use(passport.initialize())
  .use(passport.session())

  // Swagger documentation
  app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, null, {
    oauth2RedirectUrl: 'https://cse341-qvea.onrender.com/api-docs/oauth2-redirect.html',
    swaggerOptions: {
      oauth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        appName: 'Books & Authors API',
        usePkceWithAuthorizationCodeGrant: true,
        scopeSeparator: ' ',
        additionalQueryStringParams: {},
      },
    },
  })
)

  // Routes
  .use('/auth', require('./book-authors-api/routes/auth'))
  .use('/books', require('./book-authors-api/routes/books'))
  .use('/authors', require('./book-authors-api/routes/authors'))

  // Redirect root to login
  .get('/', (req, res) => {
    res.redirect('/auth/login');
  })

  // Catch-all for undefined routes
  .use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

// Initialize database and start server
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