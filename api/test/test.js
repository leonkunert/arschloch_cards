// Tests using Mocha
// Require Assert for assertation
var assert    = require("assert")
    , request = require("supertest")
    , app     = require("../app.js")
    ,table ,player;

describe('Simple', function() {
    assert.equal(true, true);
});

describe('POST', function() {
    /*------ Tables ------*/
    it('Creating a new Table should respond with json', function(done) {
        request(app)
            .post('/v1/add/table')
            .send({authKey: '550e8400-e29b-41d4-a716-446655440000', test:true})
            .expect('Content-Type', /json/)
            .expect(200, /"passPlayers"/)
            .end(function(err, res) {
                table = res.body;
                done();
            });
    });

    it('Creating a new Table without auth should respond with 403', function(done) {
        request(app)
            .post('/v1/add/table')
            .expect(403, /Authentication failed/, done);
    });


    /*------ Players ------*/

    it('Creating a new Player should respond with json', function(done) {
        request(app)
            .post("/v1/add/player")
            .send({authKey: '550e8400-e29b-41d4-a716-446655440000', test:true, playerName: "😌"})
            .expect('Content-Type', /json/)
            .expect(200, /"playerName": "😌"/)
            .end(function(err, res) {
                player = res.body;
                done();
            });
    });

    it('Creating a new Player without auth should respond with 403', function(done) {
        request(app)
            .post('/v1/add/table')
            .expect(403, /Authentication failed/, done);
    });

});

describe('GET', function() {
    /*------ Tables ------*/
    it('respond with json', function(done) {
        request(app)
            .get('/v1/tables')
            .expect('Content-Type', /json/, done);
    });
});

describe('UPDATE', function() {
    it('Updating a Table with a Player', function(done) {
        request(app)
            .post('/v1/add/table/'+table._id+'/'+player._id)
            .end(function(err, res) {
                assert.equal(res.body.tableId, table._id, 'Table Id is not the Same as in the DB');
                assert.equal(res.body._id, player._id, 'Player Id is not the Same as in the DB');
                done();
            });

    })

    it('Test', function(done) {
        // console.log(table);
        // console.log(player);
        done();
    });
});