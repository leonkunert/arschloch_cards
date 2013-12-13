// The Player Schema

var mongoose   = require('mongoose')
    , Schema   = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var playerSchema = mongoose.Schema({
    playerName : String,
    active     : Boolean,
    tableId    : ObjectId,
    cards      : [
      { card   : String }
    ]
}, {collection : 'players' });

module.exports = mongoose.model('player', playerSchema);