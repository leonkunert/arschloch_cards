// The Player Schema

var mongoose   = require('mongoose')
    , Schema   = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var playerSchema = mongoose.Schema({
    // name of the player
    playerName : String,

    // is the player active does he/she have to make a move
    active     : Boolean,

    // Date when he/she last logged in
    lastOn    : Date,

    // Is he/she online right now
    online     : Boolean,

    // Table Id of the table he/she ist on
    tableId    : ObjectId,

    // The Cards he/she has got
    cards      : [
        { card   : String }
    ]
}, {collection : 'players' });

module.exports = mongoose.model('player', playerSchema);