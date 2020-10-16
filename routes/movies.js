const express = require('express');
const MoviesService = require('../services/movies');
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService;

    router.get("/", async function(req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });


        } catch (e) {
            next(e);
        }
    })

    router.get(
        "/:movieId",
        validationHandler({ movieId: movieIdSchema }, 'params'),
        async function(req, res, next) {
            const { movieId } = req.params;

            try {
                const movies = await moviesService.getMovie({ movieId })

                res.status(200).json({
                    data: movies,
                    message: 'movie retrieved'
                });


            } catch (e) {
                next(e);
            }
        }
    )

    router.post(
        "/",
        validationHandler(createMovieSchema),
        async function(req, res, next) {
            const { body: movie } = req;
            try {
                const createMovieId = await moviesService.createMovie({ movie });

                res.status(201).json({
                    data: createMovieId,
                    message: 'movie created'
                });


            } catch (e) {
                next(e);
            }
        }
    )

    router.put(
        "/:movieId",
        validationHandler({ movieId: movieIdSchema }),
        validationHandler(updateMovieSchema),
        async function(req, res, next) {
            const { body: movie } = req;
            const { movieId } = req.params;

            try {
                const updatedMovieId = await moviesService.updateMovie({
                    movie,
                    movieId
                });

                res.status(200).json({
                    data: updatedMovieId,
                    message: 'movie updated'
                });


            } catch (e) {
                next(e);
            }
        }
    )


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

    router.delete(
        "/:movieId",
        validationHandler({ movieId: movieIdSchema }),
        async function(req, res, next) {
            const { movieId } = req.params;

            try {
                const deleteMovieId = await moviesService.deleteMovie({ movieId })

                res.status(200).json({
                    data: deleteMovieId,
                    message: 'movie deleted'
                });


            } catch (e) {
                next(e);
            }
        }
    )
}



module.exports = moviesApi;