var table    = require('./schemas/table.js')
    , player = require('./schemas/player.js')
    , cards  = require('./schemas/cards.js')
    , path   = require('path')
    , auth   = require('./auth.js')
    , api    = require('./api.js')
    , so     = {};

so.route = function (socket) {
    socket.on('join', function (data) {
        switch (data.room) {
            case 'overview':
                console.info('Joined Overview');
                socket.join('overview');
                socket.broadcast.to('overview').emit('playerJoined', data);
                break;
            case 'table':
                console.info('Joined Table');
                socket.join(data.tableId);
                socket.broadcast.to(data.tableId).emit('playerJoined', data);
                break;
        }
    });
    this.addTable = function (data) {
        socket.broadcast.to('overview').emit('newTable', data);
    };
};

module.exports = so;