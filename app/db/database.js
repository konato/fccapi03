/**
 * This file configures the data sets used in the app
 *
 * It uses the nedb module for storing data, and returns 
 * an object with all the datasets. It is required in 
 * routes.js
 * based on http://tutorialzine.com/2014/01/nodejs-picture-voting-game-part-1/
 */ 
/**
 * This file configures the data sets used in the app
 *
 * It uses the nedb module for storing data, and returns 
 * an object with all the datasets. It is required in 
 * routes.js
 */ 

// Require the nedb module
var db = require('nedb'),
	fs = require('fs');

// Initialize the nedb database. Notice the autoload parameter.
var path = process.cwd();
var urls = new db({ filename: path + '/data/urls', autoload: true });

// Make the urls data set available to the code
// that uses require() on this module:

module.exports = {
  urls: urls
};