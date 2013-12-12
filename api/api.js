/* The API controller


    /---- Adding things ----/
    * addTable         - Creates a new table
    * addPlayer        - Creates a new player

    /---- Updating things ----/
    * addPlayerToTable - Adds a Player to a table

    /---- Getting things ----/
    * listTables       - Returns a list of threads
    * getTable         - Returns a Table

    /---- Deleting things ----/
    * deleteTable      - Deletes a Table and removes all Players from that table
*/

// Imports
var table  = require('./schemas/table.js')
  , player = require('./schemas/player.js')
  , auth   = require('./auth.js');


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

// Create a New Player
exports.addPlayer = function(req, res) {
    auth.checkAuth(req, res);
    new player({
        playerName : req.body.playerName,
        active     : false,
        cards      : []
    }).save(function(err, result, numberAffected) {
        // If an error occours
        if (err) console.log(err);

        // Return whatever has been inserted into the DB
        res.json(result);
    })
}


/*---- Updating things ----*/

// Add Player to Table Or Create it if it doesn't exist jet
exports.addPlayerToTable = function(req, res) {
    // Update Table NumPlayers and add to player List

    // If No Table Id is given
    if (!req.params.tableId) {
        res.json({"Error": "No Table id given"})
    }

    // If no Player Id is given
    else if (!req.params.playerId) {
        res.json({"Error": "No Player id given"})
    }

    // If a Player Id and A Table Id is given
    else {
        // Update Table with PlayerId
        player.findByIdAndUpdate(
            {_id: req.params.playerId},
            {tableId: req.params.tableId},
            {safe: true, upsert: true},
            function(err, model) {
                if (err) console.log(err);
                res.json(model);
            }
        );
    }
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
    }
    else {

        // Find a Table By Id
        table.findById(req.params.tableId, function(err, table) {
            // If no Table with that id is found
            if (table == null) {
                res.json([]);
            }
            else {
                player.find({tableId: table._id}, function(err, players) {
                    res.json([table, players]);
                });
            }
        });

    }
}

// List all Players
exports.listPlayers = function(req, res) {
    player.find(function(err, players) {
        res.json(players);
    });
}

// Get Single Player by Id
exports.getPlayer = function(req, res) {

    // If No Table Id is given
    if (!req.params.playerId) {
        res.json({"Error": "No Player id given"})
    }
    else {
        // Find Player in DB by Id
        player.findById(req.params.playerId, function(err, player) {
            res.json(player);
        });
    }

}


/*---- Deleting things ----*/


// Delete Table
exports.deleteTable = function(req, res) {

    // If No Table Id is given
    if (!req.params.tableId) {
        res.json({"Error": "No Table id given"});
    }
    else {
        // Remove command
        table.remove({ _id: req.params.tableId }).exec();

        // Update all Players, so they don't belong to that table any more
        player.update({tableId: req.params.tableId}, {tableId: null}, { multi: true }).exec();

        res.json({"success":true});
    }

}

exports.deletePlayer = function(req, res) {

    // If No Player Id is given
    if (!req.params.playerId) {
        res.json({"Error": "No Player id given"});
    }
    else {
        // Remove command
        player.remove({ _id: req.params.tableId }).exec();
    }

}