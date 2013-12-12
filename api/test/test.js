// Tests using Mocha
// Require Assert for assertation
var assert  = require("assert")
  , request = require("supertest")
  , app = require("../app.js");

describe('Does Testing work', function() {
    describe('Hello Test', function() {
        it('It Should Just pass', function() {
            assert.equal('Hello Test', 'Hello Test');
        })
        it('It Should Just Not pass', function() {
            assert.equal(true, false);
        })
    })
});

describe('Correct Errors', function() {
    describe('Can\'t create Tables with get', function() {
        it('It Should Return No Player Id given', function() {

            request(app)
                .post('/v1/add/table/52aa3022afe8fa0000000005/')
                .set('Content-Type', 'application/json')
                .expect('Content-Length', '20')
                .expect('{"Error": "No Player id given"}');
        });

        it('It Should Return No table Id given', function() {

            request(app)
                .post('/v1/add/table//52aa3022afe8fa0000000005')
                .set('Content-Type', 'application/json')
                .expect('{"Error": "o Table id given"}');
        })
    })
})