// Tests using Mocha
// Require Assert for assertation
var assert    = require("assert")
    , request = require("supertest")
    , app     = require("../app.js")
    ,table ,player;

describe('Simple', function() {
    assert.equal(true, true, 'True is not True');
});

describe('API', function() {
    /*------ ERRORS ------*/
    it('Creating a new Player without auth should respond with 403', function(done) {
        request(app)
            .post('/v1/add/table')
            .expect(403, /Authentication failed/, done);
    });

    it('Creating a new Table without auth should respond with 403', function(done) {
        request(app)
            .post('/v1/add/table')
            .expect(403, /Authentication failed/, done);
    });


    /*------ ADDING ------*/

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


    /*------ UPDATE ------*/

    it('Should be updating a Table with a Player', function(done) {
        request(app)
            .post('/v1/add/table/'+table._id+'/'+player._id)
            .end(function(err, res) {
                assert.equal(res.body.tableId, table._id, 'Table Id is not the Same as in the DB');
                assert.equal(res.body._id, player._id, 'Player Id is not the Same as in the DB');
                done();
            });
    });

    /*------ GET ------*/

    it('Should get All tables', function (done) {
        request(app)
            .get('/v1/tables')
            .expect('Content-Type', /json/)
            .expect(200, /"passPlayers"/, done);
    });

    it('Should get One Table', function (done) {
        request(app)
            .get('/v1/table/'+table._id)
            .expect('Content-Type', /json/)
            .expect(200, /"_id"/, done);
    });

    it('Should get All Players', function (done) {
        request(app)
            .get('/v1/players')
            .expect('Content-Type', /json/)
            .expect(200, /"playerName": "😌"/, done);
    });

    it('Should get One Player', function (done) {
        request(app)
            .get('/v1/player/'+player._id)
            .expect('Content-Type', /json/)
            .expect(200, /"_id"/, done);
    });


    /*------ DELETE ------*/

    it('should delete the Table', function (done) {
        request(app)
            .post('/v1/rm/table/id/'+table._id)
            .expect('Content-Type', /json/)
            .expect(200, '{\n  "success": true\n}', done);
    });

    it('should delete the Table', function (done) {
        request(app)
            .post('/v1/rm/player/id/'+player._id)
            .expect('Content-Type', /json/)
            .expect(200, '{\n  "success": true\n}', done);
    });
});