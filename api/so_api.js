var table    = require('./schemas/table.js')
    , player = require('./schemas/player.js')
    , cards  = require('./schemas/cards.js')
    , path   = require('path')
    , auth   = require('./auth.js')
    , so     = {};

so.test = function (socket) {
    socket.emit('Hello', { content: 'Hello would you like some sockets?' });
    socket.on('join', function (data) {
        // socket.emit('news', { content: data.text });
        socket.broadcast.emit('join', { content: data});
    });
};

module.exports = so;