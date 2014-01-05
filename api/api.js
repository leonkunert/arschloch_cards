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
var table    = require('./schemas/table.js')
    , player = require('./schemas/player.js')
    , cards  = require('./schemas/cards.js')
    , path   = require('path')
    , so     = require('./so_api.js')
    , auth   = require('./auth.js');

/*---- Adding things ----*/

// Create a New Table with MaxPlayers
exports.addTable = function (req, res) {
    if (auth.checkAuth(req, res)) {
        var maxPlayers;
        if (!req.body.maxPlayers) {
            maxPlayers = 5;
        } else {
            maxPlayers = req.body.maxPlayers;
        }
        new table({
            'maxPlayers': maxPlayers
        }).save(function (err, result, numberAffected) {
            // If an error occours
            if (err) {
                console.log('ERROR Adding Table');
                console.log(err);
            }
            console.info('adding new Table');
            so.addTable(result);

            // Return whatever has been inserted into the DB
            res.json(result);
        });
    }
};

// Create a New Player
exports.addPlayer = function (req, res) {
    if (auth.checkAuth(req, res)) {
        new player({
            playerName : req.body.playerName,
            active     : false,
            lastOn    : new Date().getTime(),
            cards      : []
        }).save(function (err, result, numberAffected) {
            // If an error occours
            if (err) {
                console.log('ERROR Adding Player');
                console.log(err);
            }

            // Return whatever has been inserted into the DB
            res.json(result);
        });
    }
};

// Create a new Deck
// TODO: Add Deck to table
exports.getDeck = function (req, res) {
    var deck = new cards.playingCards();
    res.json(deck);
};


/*---- Updating things ----*/

// Add Player to Table Or Create it if it doesn't exist jet
exports.addPlayerToTable = function (req, res) {
    // Update Table NumPlayers and add to player List
    // Update Table with PlayerId
    // TODOBUG: Have to delete player from previous tables
    player.findByIdAndUpdate(
        {_id: req.params.playerId},
        {tableId: req.params.tableId},
        {safe: true, upsert: true},
        function (err, model) {
            if (err) {
                console.log(err);
            }
            table.findByIdAndUpdate(
                {_id: req.params.tableId},
                {$push: {players: req.params.playerId, passPlayers: req.params.playerId}},
                {safe: true, upsert: false}
            ).exec();
            res.json(model);
        }
    );
};

exports.updatePlayer = function (req, res) {
    player.findByIdAndUpdate(
        {_id: req.params.playerId},
        req.body.updateParams,
        function (err, model) {
            if (err) {
                console.log(err);
            }
            res.json(model);
        }
    );
};

exports.updateTable = function (req, res) {
    table.findByIdAndUpdate(
        {_id: req.params.tableId},
        req.body.updateParams,
        function (err, model) {
            if (err) {
                console.log(err);
            }
            res.json(model);
        }
    );
};


/*---- Getting things ----*/

// List all Tables
exports.listTables = function (req, res) {
    table.find(function (err, tables) {
        res.json(tables);
    });
};

// Get Single Table by Id
exports.getTable = function (req, res) {
    // Find a Table By Id
    table.findById(req.params.tableId, function (err, table) {
        // If no Table with that id is found
        if (table === null) {
            res.status(403).json({"error": "Table not found"});
        }
        else {
            player.find({tableId: table._id}, function (err, players) {
                res.json([table, players]);
            });
        }
    });
};

// List all Players
exports.listPlayers = function (req, res) {
    player.find(function (err, players) {
        res.json(players);
    });
};

// Get Single Player by Id
exports.getPlayer = function (req, res) {
    // Find Player in DB by Id
    player.findById(req.params.playerId, function (err, player) {
        res.json(player);
    });
};


/*---- Deleting things ----*/

// Delete a Table by Id
exports.deleteTableById = function (req, res) {
    // Remove command
    table.findByIdAndRemove(req.params.tableId).exec();

    // Update all Players, so they don't belong to that table any more
    player.update({tableId: req.params.tableId}, {tableId: null}, { multi: true }).exec();

    // Return True
    res.json({"success": true});
};

// Delete a Player By Id
exports.deletePlayerById = function (req, res) {
    // Remove command
    player.findByIdAndRemove(req.params.playerId).exec();

    // Return True
    res.json({"success": true});
};

// Delete a Player By Name
exports.deletePlayerByName = function (req, res) {
    // Remove command
    player.findOneAndRemove({name: req.params.playerName}).exec();
};

// Partials and index serving
exports.index = function (req, res) {
    res.sendfile(path.resolve(__dirname + '/../app/index.html'));
};