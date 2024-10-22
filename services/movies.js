const MongoLib = require('../lib/mongo');

class MoviesService {
    constructor() {
        this.collection = 'movies';
        this.mongoDB = new MongoLib;
    }
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const movies = await this.mongoDB.getAll(this.collection, query)
        return movies || [];
    }

    async getMovie({ movieId }) {
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie || {};
    }

    async createMovie({ movie }) {
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId || {};
    }

    async updateMovie({ movieId, movie } = {}) {
        const updateMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updateMovieId || [];
    }

    // async patchMovie() {
    //     const patchMovieId = await Promise.resolve(moviesMock[0].id);
    //     return patchMovieId || [];
    // }

    async deleteMovie({ movieId }) {
        const deleteMovieID = await this.mongoDB.delete(this.collection, movieId);
        return deleteMovieID || [];
    }
}

module.exports = MoviesService;