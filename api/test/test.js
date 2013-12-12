// Tests using Mocha
// Require Assert for assertation
var assert    = require("assert")
    , request = require("supertest")
    , app     = require("../app.js");

describe('Simple', function() {
    assert.equal(true, true);
});

describe('POST', function(){
    /*------ Tables ------*/
    it('Creating a new Table should respond with json', function(done){
        request(app)
          .post('/v1/add/table')
          .type('form')
          .send({authKey: '550e8400-e29b-41d4-a716-446655440000'})
          .expect('Content-Type', /json/, done);
    });

    it('Creating a new Table without auth should respond with 403', function(done){
        request(app)
          .post('/v1/add/table')
          .expect(403, done);
    });


    /*------ Players ------*/

    it('Creating a new Player should respond with json', function(done){
        request(app)
          .post('/v1/add/player')
          .type('form')
          .send({authKey: '550e8400-e29b-41d4-a716-446655440000', playerName: "😌"})
          .expect('Content-Type', /json/, done);
    });

    it('Creating a new Player without auth should respond with 403', function(done){
        request(app)
          .post('/v1/add/table')
          .expect(403, done);
    });
});

describe('GET', function(){
    /*------ Tables ------*/
    it('respond with json', function(done){
        request(app)
          .get('/v1/tables')
          .expect('Content-Type', /json/, done);
    });
});