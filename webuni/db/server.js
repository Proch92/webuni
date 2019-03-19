var loki = require('lokijs');
var express = require('express');
var app = express();

app.use(express.json());

app.post('/db/:table', function (req, res) {
	console.log(req.body);
});

var PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', function () {
	console.log('Working on port ' + PORT);
});
