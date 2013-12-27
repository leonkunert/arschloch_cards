var table    = require('./schemas/table.js')
    , player = require('./schemas/player.js')
    , cards  = require('./schemas/cards.js')
    , path   = require('path')
    , auth   = require('./auth.js')
    , so     = {};

so.route = function (socket) {
    socket.broadcast.emit('test', { content: 'Hello would you like some sockets?' });
    socket.on('joinOverview', function(data) {
        socket.join('overview');
        socket.broadcast.to('overview').emit('playerJoined', data)
    });
    socket.on('joinTable', function(data) {
        socket.join(data.tableId);
    });
    console.log(socket.manager.rooms);
};

module.exports = so;