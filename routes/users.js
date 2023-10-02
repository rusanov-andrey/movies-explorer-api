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
router.get('/api/users/me', getCurrentUser);
router.patch('/api/users/me', celebrate({
  body: Joi.object().keys({
    name: v.user.name,
    email: Joi.string().email(),
  }).unknown(true),
}), updateProfile);

module.exports = router;
