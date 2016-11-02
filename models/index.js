var mongoose = require("mongoose");
var MONGODB_URI = "//heroku_q368t9z0:2hl46lg69eo18n0mmk7kda8r2@ds141937.mlab.com:41937/heroku_q368t9z0"
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost:27017/impactwatch');

module.exports.Account = require("./account.js");
