const express = require('express');
const router =express.Router();
const { check } = require('express-validator')

const {
  signup,
  login
} = require('../controllers/UserControllers')
/**
 * @route POST /users
 * @desc Allow users to signup
 */
router.post('/', [
  check('firstname', 'Firstname is required').notEmpty(),
  check('lastname', 'Lastname is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6}),
], signup);

/**
 * @route POST /users/auth
 * @desc Allow  existing users to login
 */
router.post('/auth', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6}),
], login);

 module.exports = router;