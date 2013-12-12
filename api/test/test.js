// Tests using Mocha
// Require Assert for assertation
var assert  = require("assert")
  , request = require("supertest")
  , app     = require("../app.js");

describe('GET /', function(){
    it('respond with json', function(done){
        request(app)
          .get('/v1/tables')
          .expect('Content-Type', /json/, done);
    });

    it('respond with json', function(done){
        request(app)
          .get('/')
          .expect('Content-Type', "text/html; charset=UTF-8")
          .expect(200, done);
    })
});