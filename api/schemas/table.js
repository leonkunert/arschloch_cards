// The Table schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var tableSchema = mongoose.Schema({
    maxPlayers:  Number,
    numPlayers:  Number,
    players: [
        {playerId: Number}
    ]
}, { collection : 'tables' });

module.exports = mongoose.model('table', tableSchema);