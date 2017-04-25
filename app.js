var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
var db;

mongoose.connect('mongodb://localhost/usersdb', function(err){
	if (err) return console.log(err);
	return console.log('Connected');
})

db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var routes = require ('./routes/index');

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => { 
	console.log(`Server is up on port ${port}`); 
});