// The Table schema

var mongoose = require('mongoose')
  , Schema   = mongoose.Schema;

var tableSchema = mongoose.Schema({
    tableId   :  String,
    maxPlayers:  Number,
    numPlayers:  Number,
    players: [
        {playerId: String}
    ]
}, { collection : 'tables' });

module.exports = mongoose.model('table', tableSchema);