var assert = require("assert")
describe('Does Testing work', function(){
    describe('Hello Test', function(){
        it('It Should Just pass', function(){
            assert.equal("Hello Test", "Hello Test");
        })
    })
});