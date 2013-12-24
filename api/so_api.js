var table    = require('./schemas/table.js')
    , player = require('./schemas/player.js')
    , cards  = require('./schemas/cards.js')
    , path   = require('path')
    , auth   = require('./auth.js')
    , so     = {};

so.test = function (socket) {
    socket.emit('Hello', { content: 'Hello would you like some sockets?' });
    socket.on('tableJoin', function (data) {
        // socket.emit('news', { content: data.text });
        console.log('got message join message');
        //socket.broadcast.emit('join', { content: data});
    });
};

module.exports = so;