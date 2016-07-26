var fs = require('fs'),
// path is "../" since splat.js is in routes/ sub-dir
    bcrypt = require("bcrypt"),
    config = require(__dirname + '/../config'),  // port#, other params
    express = require("express"),
    url = require("url");


exports.api = function(req, res){
    res.status(200).send('<h3>23AndMe API is running!</h3>');
};