/* jshint esversion: 6 */

const express = require('express');
// load handlebars
const hbs = require('hbs');


var app = express();

// dirname stores the path to our project
// the following command indicates where static webpage assets are stored
// i.e. defines webroot
// this eliminates the need to configure a request handler for every single static path
app.use(express.static(__dirname + '/public'));

//tell express what view engine we are using
// need views directory
app.set('view engine', 'hbs');

//set up handler for http requests
// req contains a lot of info on the request
// res has a lot of methods available to it
app.get('/', (req, res)=>{
  // res.send('<h1>Hello, Express!</h1>');
  /*res.send({
    name: 'Beth',
    likes: [
      'node',
      'javascript',
      'video games',
      'roller derby'
    ]
  });*/
  res.render('homepage.hbs', {
    pageTitle: 'Homepage',
    welcomeMessage: 'Hi there',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req,res)=>{
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// bind app to a port on this machine
app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
