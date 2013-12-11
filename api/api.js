/* The API controller
    Exports 3 methods:
    * addTable         - Creates a new table
    * addPlayerToTable - Adds a Player to a table
    * listTables       - Returns a list of threads
*/

var table = require('./schemas/table.js');
var auth  = require('./auth.js');

// Create a New Table with MaxPlayers
exports.addTable = function(req, res) {
    auth.checkAuth(req, res);
    new table({
        maxPlayers: req.body.maxPlayers
    }).save(function(err, result, numberAffected) {
        // If an error occours
        if (err) console.log(err);

        // Return whatever has been inserted into the DB
        res.send(result);
    });
}

exports.addPlayerToTable = function(req, res) {
    // Update Table NumPlayers and add to player List

    // If No Table Id is given
    if (!req.params.tableId) {
        res.json({"Error": "No Table id given"})
        return false;
    }

    // If no Player Id is given
    if (!req.params.playerId) {
        res.json({"Error": "No Player id given"})
        return false;
    }

    console.log(req.params);
    res.json({"success":req.params});
}

exports.listTables = function(req, res) {
    table.find(function(err, tables) {
        res.send(tables);
    });
}