// node.js  server

"use strict;"   // flag JS errors

/* Module dependencies:
 *
 * require() loads a nodejs "module" - basically a file.  Anything
 * exported from that file (with "exports") can now be dotted off
 * the value returned by require(), in this case e.g. fullstack.api
 * The convention is use the same name for variable and module.
 */
var https = require("http"),   // ADD CODE
// NOTE, use the version of "express" linked to the assignment handout
    express = require("express"),   // ADD CODE
    url = require("url"),
    logger = require("morgan"),
    compression = require("compression"),
    errorHandler = require("errorhandler"),
    session = require("express-session"),
    // config is an object module, that defines app-config attribues,
    // such as "port", DB parameters
    config = require("./config"),
    testNode = require('./routes/testNode.js')

var app = express();  // Create Express app server

// use PORT environment variable, or local config file value
app.set('port', process.env.PORT || config.port);

//set cookie
app.use(session({
    name: config.sessionKey,
    secret: config.sessionSecret,
    cookie:{maxAge:config.sessionTimeout},
    saveUninitialized: false,
    resave: false
}));


// change param value to control level of logging  ... ADD CODE
app.use(logger('dev'));  // 'default', 'short', 'tiny', 'dev'

// use compression (gzip) to reduce size of HTTP responses
app.use(compression());

// Setup for rendering csurf token into index.html at app-startup
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public');

app.get('/', testNode.api);

app.get('/index.html', testNode.index);

app.get('/receive_code/', testNode.receive_code);

app.get('/detail.html', testNode.detail);

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