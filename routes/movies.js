const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const v = require('../validators/validators').validator;
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

router.get('/api/movies', getMovies);
router.post('/api/movies', celebrate({
  body: Joi.object().keys({
    country: v.movie.country,
    director: v.movie.director,
    duration: v.movie.duration,
    year: v.movie.year,
    description: v.movie.description,
    image: v.movie.image,
    trailerLink: v.movie.trailerLink,
    thumbnail: v.movie.thumbnail,
    movieId: v.movie.movieId,
    nameRU: v.movie.nameRU,
    nameEN: v.movie.nameEN,
  }),
}), createMovie);
router.delete('/api/movies/:movieId', deleteMovie);

module.exports = router;
