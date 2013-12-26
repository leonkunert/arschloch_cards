var table    = require('./schemas/table.js')
    , player = require('./schemas/player.js')
    , cards  = require('./schemas/cards.js')
    , path   = require('path')
    , auth   = require('./auth.js')
    , so     = {};

so.route = function (socket) {
    socket.broadcast.emit('test', { content: 'Hello would you like some sockets?' });
    socket.on('joinOverview', function(data) {
        console.log('JoinOverview');
        console.log(data);
    });
    socket.on('joinTable', function(data) {
        console.log('JoinTable');
        console.log(data);
        socket.broadcast.emit('newPlayer', data);
    });
    console.log(socket);
};

module.exports = so;