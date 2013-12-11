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
        it('It Should Return Cannot GET /v1/add/tables', function() {

            request(express)
                .get('/v1/add/table')
                .set('Content-Type', 'application/json')
                .expect('application/json');
        });

        it('It Should Return Cannot GET /v1/add/tables', function() {

            request(express)
                .get('/v1/add/table')
                .set('Content-Type', 'application/json')
                .expect('Cannot GET /v1/add/tables');
        })
    })
})