const routes = require('express').Router();
const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.johnRoute);
routes.get('/JaneDoe', contactsController.janeRoute);
routes.get('/MikeJohnson', contactsController.mikeRoute);
routes.get('/SarahWilliams', contactsController.sarahRoute);
routes.get('/DavidBrown', contactsController.davidRoute);




module.exports = routes; //exporting the routes