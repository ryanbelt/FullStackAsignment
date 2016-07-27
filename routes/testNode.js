// path is "../" since splat.js is in routes/ sub-dir
var config = require(__dirname + '/../config'),  // port#, other params
    url = require("url"),
    request = require("request"),
    async = require("async");


exports.api = function(req, res){
    res.status(200).send('<h3>23AndMe API is running!</h3>');
};

exports.index = function(req, res){
    res.render('tpl/index.html',{
        error: '',
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        scope: config.scope
    });
};

exports.receive_code = function(req, res){
    //if not gain access, re-render index
    if(!req.query.code){
        res.render('tpl/index.html',{
            error:"grant access Fail",
            client_id: config.client_id,
            redirect_uri: config.redirect_uri,
            scope: config.scope
        });
    }else{
        request.post({
            url: config.TTAM_token_url,
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
    if(req.session.access_token){
        var auths = {Authorization: 'Bearer ' + req.session.access_token};
        async.parallel([
            function(callback) {
                request.get({
                    wait: true,
                    url: config.TTAM_info_url + '/names/',
                    headers: auths,
                    json: true
                }, function (e, r, body) {
                    if (r.statusCode != 200) {
                        callback(true);
                        return;
                    } else {
                        callback(false,{name:body.first_name + ' ' + body.last_name,
                                        profile : body.profiles[0].id});
                    }
                });
            },
            function(callback) {
                request.get({
                    wait: true,
                    url: config.TTAM_info_url + '/user/?email=true',
                    headers: auths,
                    json: true
                }, function (e, r, body) {
                    if (r.statusCode != 200) {
                        callback(true);
                        return;
                    } else {
                        callback(false,{email: body.email});
                    }
                });
            },
        ],
            function(err, result){
                if(err){
                    req.session.access_token = null;
                    res.redirect('/index.html');
                }
                var merge={};
                for(var key in result[0]) merge[key]=result[0][key];
                for(var key in result[1]) merge[key]=result[1][key];
                res.render('tpl/detail.html',merge);
            }
        );
    }
};