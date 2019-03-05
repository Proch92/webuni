var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();

var DIR = './documents/';

var upload = multer({
	dest: DIR,
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to	' + file.path);
	});

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', ['*']);
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.post('/upload', upload.single('pdfFile'), function (req, res, next) {
	console.log('hellooooo');
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', function () {
	console.log('Working on port ' + PORT);
});
