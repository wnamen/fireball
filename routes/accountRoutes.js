var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.post('/signup', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/signin', function(req, res) {
    res.render('signin', { user : req.user });
});

router.post('/signin', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
