var config = {
	port:5000,
	env:"development",
	sessionKey: 'splat.sess',
	sessionSecret: 'login_secret',
	sessionTimeout: 1000*60*20,  // 2 minute session timeout

	//testing db
	//mongo ds029735.mlab.com:29735/athleticgen -u a -p a
	db: 'mongodb://a:a@ds029735.mlab.com:29735/athleticgen',

}

module.exports = config;