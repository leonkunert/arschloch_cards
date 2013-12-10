/* The API controller
    Exports 3 methods:
    * post - Creates a new table
    * TODO: addPlayerToTable()
    * list - Returns a list of threads
*/

var table = require('./schemas/table.js');
var auth  = require('./auth.js');

// Create a New Table with MaxPlayers
exports.addTable = function(req, res) {
    auth.checkAuth(req, res);
    new table({
        maxPlayers: req.body.maxPlayers
    }).save(function(err, result, numberAffected) {
        if (err) console.log(err);
        res.send([req.body, result]);
    });
}

exports.addPlayerToTable = function(req, res) {
    // Update Table NumPlayers and add to player List
}

exports.listTables = function(req, res) {
    table.find(function(err, tables) {
        res.send(tables);
    });
}