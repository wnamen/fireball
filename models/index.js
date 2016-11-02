var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/impactwatch');

module.exports.Account = require("./account.js");
