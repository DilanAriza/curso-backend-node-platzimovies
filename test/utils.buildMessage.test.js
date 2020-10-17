const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', () => {
    describe('when recives an entity and an action', () => {
        it('should return the repective message', () => {
            const result = buildMessage('movie', 'create');
            const expected = "movie created";
            assert.strictEqual(result, expected);
        })
    })

    describe('when recives an entity and an action and is a list', () => {
        it('should return the respective message wiht the entity in prural', () => {
            const result = buildMessage('movie', 'list');
            const expected = 'movies listed';
            assert.strictEqual(result, expected);
        })
    })

})