const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getCurrentUser, updateProfile,
} = require('../controllers/users');

router.get('/api/users/me', getCurrentUser);
router.patch('/api/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }).unknown(true),
}), updateProfile);

module.exports = router;
