const routes = require('express').Router();
const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.johnRoute);
routes.get('/JaneDoe', contactsController.janeRoute);

module.exports = routes; //exporting the routes