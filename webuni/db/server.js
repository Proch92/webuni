var loki = require('lokijs');
var db = new loki('db.json');
var express = require('express');
var app = express();


function startExpress() {
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', ['*']);
		res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST']);
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});

	app.use(express.json());

	app.post('/db/:table', function (req, res) {
		console.log('post', req.body);
		console.log('post req.params', req.params);
		record = req.body;
		record['id'] = generateID();
		var ret = db.getCollection(req.params['table']).insert(record);
		db.saveDatabase(err => console.log(err ? 'error saving db': 'saved successfully'));
		console.log('res', ret);
		res.json(ret);
	});

	app.get('/db/:table', function (req, res) {
		console.log('get', req.query);
		console.log('post req.params', req.params);
		var ret = db.getCollection(req.params['table']).find(req.query);
		console.log('res', ret);
		res.json(ret);
	});

	var PORT = process.env.PORT || 3001;

	app.listen(PORT, '0.0.0.0', function () {
		console.log('Working on port ' + PORT);
	});
}

function startDatabase() {
	if (db.listCollections().length == 0) {
		initDB();
	}
}

function initDB() {
	var collections = [
		'account',
		'doc',
		'version',
		'subscription',
		'board',
		'comment',
		'follow'
	];

	collections.forEach(col => db.addCollection(col));
}

function generateID() {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+"-"+S4()+S4()+S4());
}

function main() {
	startDatabase();
	startExpress();
}

if (require.main === module) {
    main();
}