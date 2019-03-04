var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();

var DIR = '../documents/';

var upload = multer({dest: DIR});

app.post('/upload', upload.single('pdfFile'), function (req, res, next) {
	console.log('dio cane');
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
	console.log('Working on port ' + PORT);
});
