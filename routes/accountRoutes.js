var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var Account = require('../models/account');

router.post('/register', function(req,res) {
    console.log("registering: " + req.body.username);
    Account.register(new Account({ username: req.body.username}),
      req.body.password, function (err, account) {
        console.log("here in register!");
        if (err) {
          console.log(err);
          return res.send(err);
        }
        passport.authenticate('local')(req,res, function(){
          res.redirect('/');
        });
    });
});


router.post('/login', function(req, res, next) {

    passport.authenticate('local', function (err, account, options) {
      if (err) {
        return next(err);
      }
      if (!account) {
        return res.status(401).json({
          err: info
        });
      }
      req.login(account, function(err) {
        if (err) {
          return res.status(500).json({
            err: 'Could not log into account'
          });
        }
        res.redirect('/');
        console.log("login successful");
      });
    })(req, res, next);
  });
//
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;
