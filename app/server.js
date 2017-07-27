var express = require('express');
var app = express();
var path = require('path');
var http = require ('http');
var request = require('request');
var cheerio = require('cheerio');

app.use(express.static(__dirname + '/../public'));

app.get('/api', function(req, res) {
    var searchTerm = req.query;
	request(searchTerm.url, function (error, response, html) {
  		if (!error && response.statusCode == 200) {
    		res.send(html);
		}
	});
});

// viewed at http://localhost:8080

app.listen(8080);