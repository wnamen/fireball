// dependencies
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    handlebars = require('handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var Account = require('./models/account');
var routes = require('./routes/accountRoutes');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin: http://food2fork.com/api/search?key=1b70f7c3dffb5c592b9bb7ae1accc823");
  res.header("Access-Control-Allow-Methods: GET, POST");
  res.header("Access-Control-Allow-Credentials: true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'the princess and the frog',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


// passport.use(Account.createStrategy());
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



/************
 * DATABASE *
 ************/

var db = require('./models');

/************
 * ROUTES *
 ************/

 // Serve static files from the `/public` directory:
 // i.e. `/images`, `/scripts`, `/styles`
 app.use(express.static(__dirname + '/public'));

 /*
  * HTML Endpoints
  */

 app.get('/', function (req, res) {
   res.sendFile(__dirname + '/views/index.html');
 });

 app.get('/database', function(req, res){
   res.sendFile(__dirname + '/views/database.html');
 })

 app.get('/account', function(req, res){
   res.sendFile(__dirname + '/views/account.html');
 })

 app.get('/login', function(req, res){
   res.sendFile(__dirname + '/views/login.html');
 })

 app.get('/register', function(req, res){
   res.sendFile(__dirname + '/views/register.html');
 })

 /*
 * JSON API Endpoints
 */


app.use( routes)

// app.post('/register', routes.accounts.register);
// app.post('/login', routes.accounts.login);
// app.get('/login', routes.accounts.getLogin);


//  app.get('/api/ingredients', controllers.ingredients.index);
//  app.post('/api/ingredients', controllers.ingredients.create);
//
// //  app.delete('/api/ingredients' controllers.ingredients.delete);
//
//  app.get('/api/f2fdata', controllers.f2fdata.index);
//  app.get('/api/f2fdata/query', controllers.f2fdata.show);
//
//  app.get('/api/recipes', controllers.recipes.index);
//  app.get('/api/recipes/:recipeId', controllers.recipes.show);
//
//  app.post('/api/recipes', controllers.recipes.create);
//  app.delete('/api/recipes/:recipeId', controllers.recipes.destroy);
//  app.put('/api/recipes/:recipeId', controllers.recipes.update);

//Listen on Port 8080
app.listen(process.env.PORT || 8080, function () {
  console.log('Express server is up and running on http://localhost:8080/');
});
