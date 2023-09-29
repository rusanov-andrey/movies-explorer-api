const Movie = require('../models/movie');
const {
  NotFoundError,
  ForbidenError,
  CommonError,
} = require('../utils/error');

function createMovie(req, res, next) {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
}

function getMovies(req, res, next) {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(new CommonError(err.name));
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError();
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbidenError();
      }

      return Movie.deleteOne(movie);
    })
    .then((movie) => {
      if (!res.writableEnded) {
        res.send(movie);
      }
    })
    .catch(next);
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
