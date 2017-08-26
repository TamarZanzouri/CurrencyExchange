var mongoClient = require("mongodb").MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://CurrencyExchange:CurrencyExchange1234@ds159953.mlab.com:59953/currencyexchange';


exports.insertData = function(data){
	mongoClient.connect(url, function(err, db){
	debugger;
	//db.collection('Currencies').insertOne();
	console.log("inserting data")
	// console.log(data);
	// db.collection('Currencies').insertOne({
	// 	"name" : "tamar"
	// })
})
}

exports.getAllCurrencies = function(){
	mongoClient.connect(url, function(err ,db){
		var cursor = db.collection('TblCurrencies').find( );
   		cursor.each(function(err, doc) {
      	assert.equal(err, null);
	      if (doc != null) {
	         console.log(doc);
	      } else {
	         console.log(null);
	      }
   		});
	});
	mongoClient.close();
}