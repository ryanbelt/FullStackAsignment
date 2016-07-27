var config = {
	port:5000,
	env:"development",
	sessionTimeout:1000*60*20,
	sessionSecret: "mySecret",
	sessionKey: "fullstack_key",

	redirect_uri: 'http://localhost:5000/receive_code/',
	client_id: '62dfa95af83bfcfbb834dcd05c31c67b',
	client_secret: 'd196ac485c3b70027e98acb8107b7ae0',
	scope: 'basic names email',

	TTAM_token_url: 'https://api.23andme.com/token/',
	TTAM_info_url: 'https://api.23andme.com/1',

	//testing db
	//mongo ds029735.mlab.com:29735/athleticgen -u a -p a
	db: 'mongodb://a:a@ds029735.mlab.com:29735/athleticgen',

}

module.exports = config;