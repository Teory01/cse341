//const express = require('express');
//const app = express();

//const port = 3000;

//app.use('/', require('./routes'));

 
//app.listen(process.env.PORT || 3000, () => {
// console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
//});



const express = require('express');
const app = express();
const contactsController = require('./controllers/contactsController');

const port = 8080;

app.use('/', require('./routes/contacts'));

app.listen(process.env.PORT || 8080, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8080));
});
    


