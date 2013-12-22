// The Table Schema

var mongoose   = require('mongoose')
    , Schema   = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var tableSchema = mongoose.Schema({
    // Maximum Number of Players
    // Not updatable is placed once on creation
    maxPlayers   : Number,

    // Number of Players
    // Continuesly updated
    numPlayers   : Number,

    // All Players
    // Continuesly updated
    players      : [
        ObjectId
    ],

    // High Cards as Array
    // The higest Card(s)
    // Continuesly updated
    highCard     : [
        String
    ],

    // Order of Players for this round
    // Continuesly updated
    order        : [
        {playerId: ObjectId}
    ],

    // Player that has to do the next move
    // Continuesly updated
    activePlayer : ObjectId,

    // Players that are not active (any more)
    // Continuesly updated
    passPlayers  : [
        ObjectId
    ]
}, {collection: 'tables'});

module.exports = mongoose.model('table', tableSchema);