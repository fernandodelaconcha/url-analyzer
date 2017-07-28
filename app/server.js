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
  			var htmlVersion; 
  			if (String(html).indexOf('<!doctype html>') == -1){
  				htmlVersion='HTML 4.01 or older';
  				} else {
  					htmlVersion='HTML 5';
  				}
	        var webpageTitle = $("title").text();
	        var h1 = $("body").find('h1');
	        var h2 = $("body").find('h2');
	        var h3 = $("body").find('h3');
	        var h4 = $("body").find('h4');
	        var h5 = $("body").find('h5');
	        var h6 = $("body").find('h6');

	        var links = $("body").find('a');
	        var internalLinks= [];
	        var emptyLinks = [];
			links.each(function(i, link) {
            if($(link).attr("href").indexOf('/') == 0){
	            internalLinks[i]=link; 
	            };
	        });
            links.each(function(i, link) {
            if($(link).attr("href") == ""){
            	emptyLinks[i]=link; 
	            };
	        });

	        var loginForm;

	        if ($('form').attr('method') == "post"){
	        	loginForm = 'Yes';
	        } else {
	        	loginForm = 'No';
	        }

	        var webpage = {
	        	htmlVersion: htmlVersion,
        		title: webpageTitle,
        		headings: h1.length + h2.length + h3.length + h4.length + h5.length + h6.length,
        		h1: h1.length,
        		h2: h2.length,
        		h3: h3.length,
        		h4: h4.length,
        		h5: h5.length,
        		h6: h6.length,
        		links: links.length,
        		internalLinks: internalLinks.length,
        		emptyLinks: emptyLinks.length,
        		loginForm: loginForm
        	}
        	//sends the JSON with the filtered information as a response
        	res.json(webpage);
		}else if(error){
            res.json({ error: "Oops, it seems there is an error with the URL" });;
        }
	});
});

// viewed at http://localhost:8080

var server = app.listen(8080,function(){
   console.log('express server listening on port ' + server.address().port);
    });