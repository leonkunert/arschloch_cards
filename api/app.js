var express = require('express');
var mongoose = require('mongoose');
var app = express();

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/arsch');

app.configure(function(){
    app.use(express.static(__dirname + '/../'));
    app.use(express.bodyParser());
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');
app.post('/v1/add/table', api.addTable);
app.post('/v1/add/player/:tableId/:playerId', api.addPlayerToTable);
app.get('/v1/tables', api.listTables);

app.listen(3003);

console.log("Express server listening on port 3003");

module.exports = app;