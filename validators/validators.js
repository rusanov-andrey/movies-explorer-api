const { Joi } = require('celebrate');

const { uriRegExp } = require('../utils/uri');

module.exports.validator = {
  _id: Joi.string().required().regex(/[\da-z]{24}/),
  user: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  },
  movie: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(uriRegExp),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(uriRegExp),
    trailerLink: Joi.string().required().regex(uriRegExp),
    thumbnail: Joi.string().required().regex(uriRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
};
