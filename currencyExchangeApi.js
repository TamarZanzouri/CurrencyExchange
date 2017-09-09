var dataLayer = require("./DataLayer");
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});

exports.openApiConnection = function(){
  connection.onopen = function (session) {
  console.log("connection open");

        // function marketEvent (args,kwargs) {
        //   dataLayer.insertData(args);
        //   console.log(args, kwargs);
        // }
        function tickerEvent (args,kwargs) {
                dataLayer.insertData(args);
                console.log("args ", args);
                // console.log(args, kwargs);
                // console.log(args, kwargs);
        }
        // function trollboxEvent (args,kwargs) {
        //         console.log(args);
        // }
        //session.subscribe('BTC_XMR', marketEvent);
        //session.subscribe('BTC_REP', marketEvent);
        session.subscribe('ticker', tickerEvent);
        //session.subscribe('trollbox', trollboxEvent);
}
 
  connection.onclose = function (err) {
    console.log("Websocket connection closed " + err + "go fetch data");
  }
                       
  connection.open();
}

