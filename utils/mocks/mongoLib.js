const sinon = require('sinon');
const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(moviesMock);

const createStub = sinon.stub().resolves(moviesMock[0].id);
const updateStub = sinon.stub().resolves(moviesMock[0].id);
const deleteStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createStub(collection, data);
    }

    update(collection, data) {
        return updateStub(collection, data);
    }

    delete(collection, data) {
        return deleteStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    updateStub,
    deleteStub,
    MongoLibMock
}