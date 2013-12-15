var express    = require('express')
    , mongoose = require('mongoose')
    , app      = express();

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/arsch');

app.configure(function () {
    app.use(express.static(__dirname + '/../'));
    app.use(express.bodyParser());
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');

/* ----- POST ----- */

// ADD
// Tables
app.post('/v1/add/table', api.addTable);
// Players
app.post('/v1/add/player', api.addPlayer);

// UPDATE
// Tables
app.post('/v1/add/table/:tableId/:playerId', api.addPlayerToTable);

// DELETE
// Tables
app.post('/v1/rm/table/id/:tableId', api.deleteTableById);
app.post('/v1/rm/player/id/:playerId', api.deletePlayerById);


/* ----- GET ----- */

// Tables
app.get('/v1/tables', api.listTables);
app.get('/v1/table/:tableId', api.getTable);
// Players
app.get('/v1/players', api.listPlayers);
app.get('/v1/player/:playerId', api.getPlayer);
// Decks
app.get('/v1/deck', api.getDeck);

app.get('/partials/:name', api.partials);
app.get('*', api.index);

app.listen(3003);

console.log("Express server listening on port 3003");

module.exports = app;