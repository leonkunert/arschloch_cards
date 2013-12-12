// The Table Schema

var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var tableSchema = mongoose.Schema({
    // Maximum Number of Players
    maxPlayers   : Number,

    // Number of Players
    numPlayers   : Number,

    // High Cards as Array
    highCard     : [
      { card     : String }
    ],

    // Order of Players for this round
    order        : [
      { playerId : ObjectId }
    ],

    // Player that has to so the next move
    activePlayer : ObjectId,

    // Players that are not active any more
    passPlayers  : [
      { playerId : ObjectId }
    ]
}, { collection : 'tables' });

module.exports = mongoose.model('table', tableSchema);