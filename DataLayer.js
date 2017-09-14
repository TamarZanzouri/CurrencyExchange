var mongoClient = require("mongodb").MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://CurrencyExchange:CurrencyExchange1234@ds159953.mlab.com:59953/currencyexchange';


exports.insertData = function(data){
		mongoClient.connect(url, function(err, db){
			var rateHistory = 
			{
				rate : data[1],
				maxhrHigh : data[8],
				maxhrLow : data[9],
				date : new Date()
			};
	
			var currency = {
				name : data[0],
			};
			var coinsCollection = db.collection('TblDigitalCurrencies');
			if(coinsCollection){
				coinsCollection.findOne({name : currency.name}, function(err, result){
					if(err)
					{
						console.error("error ", err);					}
					if(result != null){
						coinsCollection.update({name : currency.name}, { $push: { "rateHistory": rateHistory }, function(err)
						{
							if(err) console.error("error ", err)
						}
						});
					}
					else{
						currency.rateHistory = [rateHistory];
						coinsCollection.insertOne(currency, function(err){
							if(err) console.error(err);
						});
					}
				});
			}
	}).catch(e => console.error);
}

exports.getAllCurrencies = function(req, res){
	mongoClient.connect(url, function(err ,db){
		db.collection('TblDigitalCurrencies').distinct("name", {}, { name : 1 }, function(err,items){
			if(err) console.error(err);
			res.json(items);
		 });;
	});
}

exports.getRateHistory = function(req, res){
	try{
		var chosenClientCurrency = req.query.chosenCurrency;
	}
	catch(err){
		console.log("failed to get body " + err);
	}
	mongoClient.connect(url, function(err ,db){
		db.collection('TblDigitalCurrencies').find({$or: [{ name : chosenClientCurrency[0]}, {name: chosenClientCurrency[1]}]},
			{ name: 1,rateHistory: 1}
			).toArray(function(err, docs){
			if(err) console.error(err);
			res.json(docs);
		});
	});
}