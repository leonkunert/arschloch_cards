// Tests using Mocha
// Require Assert for assertation
var assert    = require("assert")
    , request = require("supertest")
    , app     = require("../app.js")
    , cards   = require("../schemas/cards.js");

describe('API', function () {

    /*------ SIMPLE ------*/

    describe('Simple', function () {
        assert.equal(true, true, 'True is not True');
        it('should check if everything is set up correctly', function (done) {
            assert.equal(true, true, 'True is not True');
            done();
        });
    });

    /*------ ERRORS ------*/

    describe('ERRORS', function () {
        it('Creating a new Player without auth should respond with 403', function (done) {
            request(app)
                .post('/v1/add/table')
                .expect(403, /Authentication failed/, done);
        });

        it('Creating a new Table without auth should respond with 403', function (done) {
            request(app)
                .post('/v1/add/table')
                .expect(403, /Authentication failed/, done);
        });
    });


    /*------ ADDING ------*/

    describe('ADDING', function () {
        it('Creating a new Table should respond with json', function (done) {
            request(app)
                .post('/v1/add/table')
                .send({authKey: '550e8400-e29b-41d4-a716-446655440000', test: true})
                .expect('Content-Type', /json/)
                .expect(200, /"passPlayers"/)
                .end(function (err, res) {
                    exports.table = res.body;
                    done();
                });
        });

        it('Creating a new Player should respond with json', function (done) {
            request(app)
                .post("/v1/add/player")
                .send({authKey: '550e8400-e29b-41d4-a716-446655440000', test: true, playerName: '😌'})
                .expect('Content-Type', /json/)
                .expect(200, /"playerName": "😌"/)
                .end(function (err, res) {
                    exports.player = res.body;
                    done();
                });
        });

    });

    /*------ UPDATE ------*/

    describe('UPDATE', function () {
        it('Should be updating a Table with a Player', function (done) {
            request(app)
                .put('/v1/add/table/' + exports.table._id + '/' + exports.player._id)
                .end(function (err, res) {
                    assert.equal(res.body.tableId, exports.table._id, 'Table Id is not the Same as in the DB');
                    assert.equal(res.body._id, exports.player._id, 'Player Id is not the Same as in the DB');
                    done();
                });
        });
    });

    describe('Update Player', function () {
        it('should update a players Name', function (done) {
            request(app)
                .put('/v1/up/player/' + exports.player._id)
                .send({authKey: '550e8400-e29b-41d4-a716-446655440000', playerName: '🐍🎃'})
                .expect('Content-Type', /json/)
                .expect(200, /"playerName": "🐍🎃"/, done);
        });
    });

    describe('Update Table', function () {
        it('should update a table num players', function (done) {
            request(app)
                .put('/v1/up/table/' + exports.table._id)
                .send({authKey: '550e8400-e29b-41d4-a716-446655440000', activePlayer: exports.player._id})
                .expect('Content-Type', /json/)
                .expect(200, /"activePlayer"/, done);
        });
    });

    /*------ GET ------*/

    describe('GETTING', function () {
        it('Should get All tables', function (done) {
            request(app)
                .get('/v1/tables')
                .expect('Content-Type', /json/)
                .expect(200, /"passPlayers"/, done);
        });

        it('Should get One Table', function (done) {
            request(app)
                .get('/v1/table/' + exports.table._id)
                .expect('Content-Type', /json/)
                .expect(200, /"_id"/, done);
        });

        it('Should get One Table with the right num of players on it', function (done) {
            request(app)
                .get('/v1/table/' + exports.table._id)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    assert.equal(res.body[0].players.length, res.body[1].length);
                    done();
                });
        });

        it('Should get One Table with the right num of passive players on it', function (done) {
            request(app)
                .get('/v1/table/' + exports.table._id)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    assert.equal(res.body[0].passPlayers.length, res.body[1].length);
                    done();
                });
        });

        it('Should get All Players', function (done) {
            request(app)
                .get('/v1/players')
                .expect('Content-Type', /json/)
                .expect(200, /"playerName": "🐍🎃"/, done);
        });

        it('Should get One Player', function (done) {
            request(app)
                .get('/v1/player/' + exports.player._id)
                .expect('Content-Type', /json/)
                .expect(200, /"_id"/, done);
        });

        it('Should get a new Deck', function (done) {
            request(app)
                .get('/v1/deck')
                .expect('Content-Type', /json/)
                .expect(200, /"cards"/)
                .end(function (err, res) {
                    assert.equal(res.body.cards.length, 52);
                    done();
                });
        });
    });


    /*------ DELETE ------*/

    describe('DELETING', function () {
        it('should delete the Table', function (done) {
            request(app)
                .post('/v1/rm/table/id/' + exports.table._id)
                .expect('Content-Type', /json/)
                .expect(200, '{\n  "success": true\n}', done);
        });

        it('should delete the Player', function (done) {
            request(app)
                .post('/v1/rm/player/id/' + exports.player._id)
                .expect('Content-Type', /json/)
                .expect(200, '{\n  "success": true\n}', done);
        });
    });


    /*------ CARDS ------*/

    describe('CARDS', function () {
        // Can I create Cards
        it('should create all cards ', function (done) {
            var deck = new cards.playingCards();
            assert.equal(deck.cards.length, 52, "We need 52 cards to play");
            assert.equal(typeof deck.conf, "object", "We could use a configuration oject over here");
            done();
        });
    });

});