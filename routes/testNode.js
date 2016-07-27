var fs = require('fs'),
// path is "../" since splat.js is in routes/ sub-dir
    bcrypt = require("bcrypt"),
    config = require(__dirname + '/../config'),  // port#, other params
    express = require("express"),
    url = require("url"),
    request = require("request");


exports.api = function(req, res){
    res.status(200).send('<h3>23AndMe API is running!</h3>');
};

exports.index = function(req, res){
    res.render('tpl/index.html',{
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        scope: config.scope
    });
};

exports.receive_code = function(req, res){
    //if not gain access, re-render index
    if(!req.query.code){
        res.render('index.html');
    }else{
        request.post({
            url: 'https://api.23andme.com/token/',
            form: {
                client_id: config.client_id,
                client_secret: config.client_secret,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: config.redirect_uri,
                scope: config.scope
            },
            json: true}, function(e, r, body){
            if (!e && r.statusCode == 200) {
                console.log(req.session.cookie);
                req.session.access_token= body.access_token;
                res.redirect('/detail.html');
            } else {
                res.send(body);
            }
        });
    }
};

exports.detail = function(req, res){
    console.log(req.session);
}