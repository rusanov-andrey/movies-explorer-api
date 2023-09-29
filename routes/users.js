const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const v = require('../validators/validators').validator;
const {
  getCurrentUser, updateProfile,
} = require('../controllers/users');

/* router.post('/users', celebrate({
  body: Joi.object().keys({
    name: v.user.name,
    email: v.user.email,
    password: v.user.password,
  }),
}), createUser); */
router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: v.user.name,
    email: v.user.email,
  }).unknown(true),
}), updateProfile);

module.exports = router;