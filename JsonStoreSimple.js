// post with id="new" -> save new file and return id
// post with id -> update json 
// get with id -> return json
var jsonStoreDir = './jsonstore/'; //if possible a local mount (for performance issues)
var debugLevel = 2;      //0 shows nothing, 3 most messages at console.log
var randomIdLength = 6; //if you are expecting really lot of json data request this should be set to 8 or 10
var portNumber = 1212; //set here or use environment Variable "PORT" to setup

var express = require('express');
var app = express();
var bodyParser = require('body-parser'); app.use( bodyParser.json() ); 
//app.use(allowCrossDomain); //maybee in a newer express version
var cors = require('cors'); app.use(cors()); //cross domain problem

function debugLog(message,level) {
	var at = new Date().toISOString();
	if (level <= debugLevel) {
		console.log(at + " " + message);
	}
}

function saveJson(myJson,fileName) {
	var fs = require('fs');
	fs.writeFile(jsonStoreDir +fileName, JSON.stringify(myJson), function(err) {
	    if(err) {
	        debugLog(err,3);
	    } else {
	        debugLog("file save: " + jsonStoreDir + fileName, 1); 
	        debugLog(JSON.stringify(myJson), 2);
	    }
	}); 
}

function readJson(fileName) {
	var fs = require('fs');
	debugLog("read file: " + jsonStoreDir + fileName, 1);
    return fs.readFileSync(jsonStoreDir + fileName, "utf8"); //maybee later be done async
}

function genRandom() {
	var fs = require('fs');
	var result='notExist';
	do {
		var randomString =Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, randomIdLength);
		if (fs.existsSync(jsonStoreDir + randomString)) { 
         	result='exists'; 
    	} 
	}
	while (result == 'exists');
	return randomString;
}

//     {"entrys":[{"vorname":"Önna","nachname":"müller"},{"vorname":"Lola","nachname":"maier"}]}

app.get('/:id',function(req, res) {
  //var data = JSON.parse('{"entrys":[{"vorname":"Önna","nachname":"müller"},{"vorname":"Lola","nachname":"maier"}]}'); //only for testing
    res.set('Content-Type', 'application/json; charset=utf-8');
    var fs = require('fs'); 
  	fs.exists(jsonStoreDir + req.params.id, function(exists) { 
  	  var data;	
	  if (exists) { 
	  	data = JSON.parse(readJson(req.params.id));
	  } else {
        data = JSON.parse('{"error":"file not found"}');
	  }
	  res.send(JSON.stringify(data));
	}); 
});

app.post('/:id', function(req, res) {
   if (req.params.id != 'new') { 
	   res.send(200, req.params.id);
	   saveJson(req.body,req.params.id);
    } else {
    	var newId = genRandom();
    	res.set('Content-Type', 'text/html');
    	saveJson(req.body,newId);
    	res.send(newId);
    }	   
}); 

app.listen(process.env.PORT || portNumber);

