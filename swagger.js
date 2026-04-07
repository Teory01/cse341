const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Author-Books API',
    description: 'API for managing authors and books. Protected routes require Google OAuth authentication.',
  },
  host: 'cse341-qvea.onrender.com',
  basePath: '/',
  schemes: ['https'],

  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
    {
      name: 'Books',
      description: 'Endpoints for books',
    },
    {
      name: 'Authors',
      description: 'Endpoints for authors',
    }
  ],

  // ✅ ADD THIS (VERY IMPORTANT)
  securityDefinitions: {
    OAuth2: {
      type: 'oauth2',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
      flow: 'implicit',
      scopes: {
        profile: 'Access your Google profile',
        email: 'Access your Google email'
      }
    }
  }
};

const outputFile = './swagger.json';

// ✅ Include ALL route files (important for detection)
const endpointsFiles = [
  './server.js',
  './book-authors-api/routes/auth.js',
  './book-authors-api/routes/books.js',
  './book-authors-api/routes/authors.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);