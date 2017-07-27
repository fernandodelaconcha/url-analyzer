// require imports
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
//const $ = require('jQuery')(window);
var express = require('express');
var app = express();
var path = require('path');
var http = require ('http');
var request = require('request');
var cheerio = require('cheerio');
//loads the view using express
app.use(express.static(__dirname + '/../public'));
//takes the search term as a parameter in order to make the request
app.get('/api', function(req, res) {
    var searchTerm = req.query;
    var result = "";
	request(searchTerm.url, function (error, response, html) {
		// gets the desired html source code with cheerio and filters the requested items creating a JSON
  		if (!error && response.statusCode == 200) {
  			var $ = cheerio.load(html);
	        var webpageTitle = $("title").text();
	        var links = $("body").find('a').length;
	        var webpage = {
	        	htmVersion: "",
        		title: webpageTitle,
        		headings: "",
        		links: links,
        		hiddenLinks: "",
        		loginForm: ""
        	}
        	//sends the JSON with the filtered information as a response
        	res.send(webpage);
		}
	});
});

// viewed at http://localhost:8080

app.listen(8080);