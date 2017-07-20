const express = require('express');
const app = express();
const mongojs = require('mongojs');
const db = mongojs('travelDb', ['trips']);
const bodyParser = require('body-parser');

//const rollbar = angular.module('trips', ['tandibar/ng-rollbar']);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

/*rollbar.config(function(RollbarProvider){
	RollbarProvider.init({
		accessToken: "e8e9bdb32bd542468503e572f0f6fc53",
		captureUncaught: true,
		payload: {
			environment: ''
		}
	})
})*/

app.get('/trips', function (req, res) {
	console.log("get request recieved");

	db.trips.find(function (err, docs) {
		res.json(docs);
	});
});

app.post('/trips', function (req, res) {
	db.trips.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/trips/:id', function (req, res) {
	var id = req.params.id;
	db.trips.remove({_id: mongojs.ObjectID(id)}, function (err, doc) {
	res.json(doc);
	});
});

app.get('/trips/:id', function(req, res) {
	var id = req.params.id;
	db.trips.findOne({_id:mongojs.ObjectID(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/trips/:id', function (req, res) {
	var id = req.params.id;
	console.log('PUT endpoint initiated');
	db.trips.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
    	update: {$set: {destination: req.body.destination, budget: req.body.budget, airfareCost: req.body.airfareCost, lodgingCost: req.body.lodgingCost, miscCost: req.body.miscCost}},
    	new: true}, function (err, doc) {
      		res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");