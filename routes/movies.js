const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService;

    router.get("/", async function(req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
            throw new Error('Error getting Movies');

            res.status(200).json({
                data: movies,
                message: 'Movies listed'
            });


        } catch (e) {
            next(e);
        }
    })

    router.get("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;

        try {
            const movies = await moviesService.getMovie({ movieId })

            res.status(200).json({
                data: movies,
                message: 'Movie retrieved'
            });


        } catch (e) {
            next(e);
        }
    })

    router.post("/", async function(req, res, next) {
        const { body: movie } = req;
        try {
            const createMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createMovieId,
                message: 'Movie created'
            });


        } catch (e) {
            next(e);
        }
    })

    router.put("/:movieId", async function(req, res, next) {
        const { body: movie } = req;
        const { movieId } = req.params;

        try {
            const updatedMovieId = await moviesService.updateMovie({
                movie,
                movieId
            });

            res.status(200).json({
                data: updatedMovieId,
                message: 'Movie updated'
            });


        } catch (e) {
            next(e);
        }
    })


    // router.patch("/:movieId", async function(req, res, next) {
    //     const { body: movie } = req;
    //     const { movieId } = req.params;

    //     try {
    //         const updatedMovieId = await moviesService.patchMovie({
    //             movie,
    //             movieId
    //         });

    //         res.status(200).json({
    //             data: updatedMovieId,
    //             message: 'Movie patched'
    //         });


    //     } catch (e) {
    //         next(e);
    //     }
    // })

    router.delete("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;

        try {
            const deleteMovieId = await moviesService.deleteMovie({ movieId })

            res.status(200).json({
                data: deleteMovieId,
                message: 'Movie Deleted'
            });


        } catch (e) {
            next(e);
        }
    })
}



module.exports = moviesApi;