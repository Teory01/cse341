//const routes = require('express').Router();
//const lesson1Controller = require('../controllers/lesson1');
 
//routes.get('/', lesson1Controller.teekayRoute);
//routes.get('/teory', lesson1Controller.teoryRoute);
//routes.get('/joy', lesson1Controller.joyRoute);


//module.exports = routes;

const routes = require("express").Router();

routes.use("/", require("./swagger"));

routes.get("/", (req, res) => {
    // swagger.tags = ['Root']
    res.send("Welcome to the Contacts API! Use /api-docs for API documentation.");
});

routes.use("/contacts", require("./contacts"));

module.exports = routes;    