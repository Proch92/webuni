var loki = require('lokijs');
var db = new loki('db.json', {
	autoload: true,
	autoloadCallback: initDB,
	autosave: true
});
var express = require('express');
var app = express();


function startExpress() {
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', ['*']);
		res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE']);
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});

	app.use(express.json());

	app.post('/db/:table', function (req, res) {
		console.log('post');
		record = req.body;
		record['id'] = generateID();
		var table = db.getCollection(req.params['table']);
		
		var last_prog = -1;
		if (table.count() > 0) {
			last_prog = table.max('progressive');;
		}
		record['progressive'] = last_prog + 1;

		var ret = table.insert(record);
		res.json(ret);
	});

	app.get('/db/:table', function (req, res) {
		console.log('get');
		var ret = db.getCollection(req.params['table']).find(req.query);
		res.json(ret);
	});

	app.delete('/db/:table', function (req, res) {
		console.log('delete');
		var ret = db.getCollection(req.params['table']).findAndRemove(req.query);
		res.json(ret);
	});

	var PORT = process.env.PORT || 3001;

	app.listen(PORT, '0.0.0.0', function () {
		console.log('Working on port ' + PORT);
	});
}

function initDB() {
	var collections = [
		'account',
		'doc',
		'version',
		'board',
		'comment',
		'follow',
		'event'
	];

	collections.forEach(col => {
		if (!db.getCollection(col)) {
			db.addCollection(col);
		}
	});
}

function generateID() {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+"-"+S4()+S4()+S4());
}

function main() {
	startExpress();
}

if (require.main === module) {
    main();
}