const assert = require('assert');
const proxyquire = require('proxyquire');

const {
    MongoLibMock,
    getAllStub,
    createStub,
    updateStub,
    deleteStub
} = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');
const { movieIdSchema } = require('../utils/schemas/movies');

describe('Services - movies', () => {
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo': MongoLibMock
    })

    const moviesServices = new MoviesServices();

    // GET MOVIES
    describe('when getMovies method is called', async() => {
        it('should call the getAll MongoLib method', async() => {
            await moviesServices.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        });

        it('should return an array of movies', async() => {
            const result = await moviesServices.getMovies({});
            const expected = moviesMock;
            assert.deepStrictEqual(result, expected);
        });
    });

    // CREATE MOVIE
    describe('when create method is called', async() => {
        it('should call the create MongoLib method', async() => {
            await moviesServices.createMovie({})
            assert.strictEqual(createStub.called, true);
        })

        it('should return an id of the movie created', async() => {
            const result = await moviesServices.createMovie({});
            const expected = moviesMock[0].id;
            assert.deepStrictEqual(result, expected);
        })
    })

    //UPDATE MOVIE
    describe('when update method is called', async() => {
        it('should call the update MongoLib method', async() => {
            await moviesServices.updateMovie({})
            assert.strictEqual(updateStub.called, true);
        })

        it('should return an id of the movie updated', async() => {
            const result = await moviesServices.updateMovie({});
            const expected = moviesMock[0].id;
            assert.deepStrictEqual(result, expected);
        })
    })

    // DELETE MOVIE
    describe('when delete method is called', async() => {
        it('should call the delete MongoLib method', async() => {
            await moviesServices.deleteMovie({})
            assert.strictEqual(deleteStub.called, true);
        })

        it('should return an id of the movie deleted', async() => {
            const result = await moviesServices.deleteMovie({});
            const expected = moviesMock[0].id;
            assert.deepStrictEqual(result, expected);
        })
    })

})