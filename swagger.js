
const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'Books & Authors API',
    description: 'API for managing books and authors. Protected routes require Google OAuth.',
  },
  host: 'cse341-qvea.onrender.com', 
  basePath: '/',
  schemes: ['https'],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Books', description: 'Books endpoints' },
    { name: 'Authors', description: 'Authors endpoints' },
  ],
  securityDefinitions: {
    OAuth2: {
      type: 'oauth2',
      flow: 'implicit', 
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      scopes: {
        profile: 'Access your Google profile',
        email: 'Access your Google email',
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './server.js',
  './book-authors-api/routes/auth.js',
  './book-authors-api/routes/books.js',
  './book-authors-api/routes/authors.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger.json generated successfully!');
});