// node.js  server

"use strict;"   // flag JS errors

/* Module dependencies:
 *
 * require() loads a nodejs "module" - basically a file.  Anything
 * exported from that file (with "exports") can now be dotted off
 * the value returned by require(), in this case e.g. splat.api
 * The convention is use the same name for variable and module.
 */
var https = require("http"),   // ADD CODE
// NOTE, use the version of "express" linked to the assignment handout
    express = require("express"),   // ADD CODE
    fs = require("fs"),
    path = require("path"),
    url = require("url"),
    multer = require("multer"),
    logger = require("morgan"),
    compression = require("compression"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    directory = require("serve-index"),
    errorHandler = require("errorhandler"),


    //cross site attack security optional after
    csurf= require('csurf'),// optional, for HTTP auth

    // config is an object module, that defines app-config attribues,
    // such as "port", DB parameters
    config = require("./config"),
    testNode = require('./routes/testNode.js')

// middleware check that req is associated with an authenticated session
function isAuthd(req, res, next) {
    if(req.session.auth){
        return next();
    }
    else{
        res.status(403).send("please signin to countinue your application.")
    }
};


var app = express();  // Create Express app server

// Configure app server
app.use(function (req,res,next){
    res.setHeader("Strict-Transport-Security","max-age=36000");
    next();
});
// use PORT environment variable, or local config file value
app.set('port', process.env.PORT || config.port);

// activate basic HTTP authentication (to protect your solution files)
//app.use(basicAuth('username', 'password'));  // REPLACE username/password


// change param value to control level of logging  ... ADD CODE
app.use(logger('dev'));  // 'default', 'short', 'tiny', 'dev'

// use compression (gzip) to reduce size of HTTP responses
app.use(compression());

// Setup for rendering csurf token into index.html at app-startup
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public');

app.get('/index.html', function(req, res) {
    res.render('index.html');
});


app.get('/', testNode.api);

app.use(errorHandler({ dumpExceptions:true, showStack:true }));

// location of app's static content ... may need to ADD CODE
app.use(express.static(__dirname + "/public"));
// Default-route middleware, in case none of above match

app.use(function (req, res) {
    res.status(404).send('<h3>File Not Found</h3>');
});

// Start HTTP server
https.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode",
        app.get('port'), config.env );
});