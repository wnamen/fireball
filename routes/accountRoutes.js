var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var Account = require('../models/account');

router.post('/register', bodyParser.urlencoded({ extended: true }), function(req,res) {
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
});

// router.post('/signup', function(req, res, next) {
//   console.log("here");
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//
//         passport.authenticate('local')(req, res, function () {
//             req.session.save(function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 res.redirect('/');
//             });
//         });
//     });
// });

router.post('/login', bodyParser.urlencoded({ extended: true }), function(req, res, next) {

    Account.authenticate()(req.body.username, req.body.password, function (err, account, options) {
        if (err) return next(err);
        if (account === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(account, function (err) {
                res.send({
                    success: true,
                    account: account
                });
                res.redirect('/');
            });
        }
    });

});

// router.post('/signin', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
// });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
