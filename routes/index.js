const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');
 
routes.get('/', lesson1Controller.teekayRoute);
routes.get('/teory', lesson1Controller.teoryRoute);
routes.get('/joy', lesson1Controller.joyRoute);


module.exports = routes;