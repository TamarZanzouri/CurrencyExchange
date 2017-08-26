var http = require("http");
var dataLayer = require("./DataLayer");
var api = require("./currencyExchangeApi");
var express = require("express");

var app = express();

api.openApiConnection();

app.get('/*', function(req, res) {
	res.send(404, "ERROR")
});

app.listen(8080, function() {
	console.log("port 8080" );
});