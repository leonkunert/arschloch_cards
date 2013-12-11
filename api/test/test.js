// Tests using Mocha
// Require Assert for assertation
var assert  = require("assert"),
    request = require("supertest"),
    express = require("../app.js")

describe('Does Testing work', function() {
    describe('Hello Test', function() {
        it('It Should Just pass', function() {
            assert.equal('Hello Test', 'Hello Test');
        })
    })
});

describe('Correct Errors', function() {
    describe('Can\'t create Tables with get', function() {
        it('It Should Return Json', function() {

            request(express)
                .get('/v1/add/table')
                .set('Content-Type', 'application/json')
                .expect('application/json');
        });

        it('It Should Return No Player Id given', function() {

            request(express)
                .post('/v1/add/player/52a7939935a0fe0000000003/')
                .set('Content-Type', 'application/json')
                .expect('{"Error": "No Player id given"}');
        });

        it('It Should Return No table Id given', function() {

            request(express)
                .post('/v1/add/player//52a7939935a0fe0000000003')
                .set('Content-Type', 'application/json')
                .expect('{"Error": "No Table id given"}');
        })
    })
})