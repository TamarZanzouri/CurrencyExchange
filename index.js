var http = require("http");
var dataLayer = require("./DataLayer");
var api = require("./currencyExchangeApi");
var express = require("express");

var app = express();

api.openApiConnection();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/getCurrencies', dataLayer.getAllCurrencies);

app.get('/getRateHistory', dataLayer.getRateHistory);

app.get('/*', function(req, res) {
	res.send(404, "ERROR")
});

app.listen(8080, function() {
	console.log("port 8080" );
});