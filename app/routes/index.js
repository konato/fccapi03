'use strict';
var path = process.cwd();

var db = require(path + '/app/db/database.js'),
	urls = db.urls;

var UrlShortApi = require(path + '/app/controllers/urlShortApi.server.js');

module.exports = function (app) {

	var urlShort = new UrlShortApi();
	
// regarder pour s'assurer d'une route indépendante
// http://stackoverflow.com/questions/4602212/organize-routes-in-node-js

	app.route('/new/*').get(urlShort.getCode);
	
	app.route('/:id').get(urlShort.redirect);
	
	app.route('/stats/:id').get(urlShort.getStats);
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
};
