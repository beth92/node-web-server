/* jshint esversion: 6 */

const express = require('express');
// load handlebars
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// use next to specify when this middleware function is done
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Error: could not log network action: ' + log);
    }
  });
  // move on
  next();
});

// maintenance middleware - while present this halts execution of request handlebars
// due to lack of next function
/*app.use( (req,res,next) => {
  res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

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
    welcomeMessage: 'Hi there'
  });
});

app.get('/about', (req,res)=>{
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// Make a projects page
app.get('/projects', (req,res)=>{
  res.render('projects.hbs', {
    pageTitle: 'My Projects'
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// bind app to a port on this machine
// heroku uses an environment variable
app.listen(port, ()=>{
  console.log('Server is up on port ' + port);
});
