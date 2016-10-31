var express = require('express');
var passport = require('passport');
var Account = require('../models/account');

function register (req, res) {
    console.log("registering: " + req.body.username);
    Account.register(new Account({
        username: req.body.username
      }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            res.send({
                success: true,
                user: user
            });
        }
    });
};

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

function login (req, res, next) {

    Account.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(user, function (err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });

};

// router.post('/signin', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
// });

// router.get('/signout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = {
  register: register,
  login: login
};
