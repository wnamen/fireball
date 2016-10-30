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

    var Account = require('./models/account');

var routes = require('./routes/index');
var app = express();


  app.use(bodyParser.urlencoded({ extended: true }));


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

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));

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

   app.get('/meteors', function(req, res){
     res.sendFile(__dirname + '/views/meteors.html');
   })

   app.get('/signin', function(req, res){
     res.sendFile(__dirname + '/views/signin.html');
   })

   app.get('/signup', function(req, res){
     res.sendFile(__dirname + '/views/signup.html');
   })

   /*
   * JSON API Endpoints
   */

  //  app.get('/community', function(req, res){
  //    res.sendFile('views/community');
  //  })


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