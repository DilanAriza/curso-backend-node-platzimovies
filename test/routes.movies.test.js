const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServicesMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', () => {
    const route = proxyquire('../routes/movies', {
        '../services/movies': MoviesServicesMock
    });

    const request = testServer(route);

    describe('GET /movies', () => {
        it('sould respond with status 200', done => {
            request.get('/api/movies').expect(200, done)
        });

        it('should respond with the list of the movies', done => {
            request.get('/api/movies').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                });
                done();
            })
        })
    });

    describe('POST /movies', () => {
        it('should respond with status 201', done => {
            request.post('/api/movies').expect(201, done);
        })

        it('should respond with the id of the movie created', done => {
            request.post('/api/movies').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock[0].id,
                    message: 'movie created'
                })

                done();
            })
        })
    });

    describe('PUT /movies', () => {
        it('should respond with status 200', done => {
            request.put('/api/movies/11fff70c-c312-4791-b8b4-1a0665edd79e').expect(200, done);
        })

        it('should respond with the id of the movie updated', done => {
            request.put('/api/movies/11fff70c-c312-4791-b8b4-1a0665edd79e').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock[0].id,
                    message: 'movie updated'
                })

                done();
            })
        })
    });

    describe('DELETE /movies', () => {
        it('should respond with status 200', done => {
            request.delete('/api/movies/11fff70c-c312-4791-b8b4-1a0665edd79e').expect(200, done);
        })

        it('should respond with the id of the movie updated', done => {
            request.delete('/api/movies/11fff70c-c312-4791-b8b4-1a0665edd79e').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock[0].id,
                    message: 'movie deleted'
                })

                done();
            })
        })
    });
})