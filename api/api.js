/* The API controller
    Exports 3 methods:
    * addTable         - Creates a new table
    * addPlayerToTable - Adds a Player to a table
    * listTables       - Returns a list of threads
    * getTable         - Returns a Table
*/

// Imports
var table = require('./schemas/table.js');
var auth  = require('./auth.js');


/*---- Adding things ----*/

// Create a New Table with MaxPlayers
exports.addTable = function(req, res) {
    auth.checkAuth(req, res);
    new table({
        maxPlayers: req.body.maxPlayers
    }).save(function(err, result, numberAffected) {
        // If an error occours
        if (err) console.log(err);

        // Return whatever has been inserted into the DB
        res.json(result);
    });
}


/*---- Updating things ----*/

// Add Player to Table
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

    // Update Table with PlayerId
    table.findByIdAndUpdate(
        {_id: req.params.tableId},
        {$push: {players: {playerId: req.params.playerId}}},
        {safe: true, upsert: true},
        function(err, model) {
            if (err) console.log(err);
            res.json({"success":model});
        }
    );
}


/*---- Getting things ----*/

// List all Tables
exports.listTables = function(req, res) {
    table.find(function(err, tables) {
        res.json(tables);
    });
}

// Get Single Table by Id
exports.getTable = function(req, res) {

    // If No Table Id is given
    if (!req.params.tableId) {
        res.json({"Error": "No Table id given"})
        return false;
    }

    table.findById(req.params.tableId, function(err, table){
        res.json(table);
    });
}


/*---- Deleting things ----*/


// Delete Table
exports.deleteTable = function(req, res) {
    // If No Table Id is given
    if (!req.params.tableId) {
        res.json({"Error": "No Table id given"})
        return false;
    }

    // Remove command
    table.remove({ _id: id }, function(err) {
        console.log(err);
    });

    res.json({"success":true});
}