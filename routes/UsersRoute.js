const express = require('express');
const router =express.Router();
const { check } = require('express-validator');
const checkAuthUser = require('../middlewares/checkAuthUser');

const {
  signup,
  login,
  getUserWithAuth,
  loadAllUsers,
  updateUserAuth,
  deleteUser,
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

/**
 * @route  GET /users/auth
 * @desc Verify user with token
 */
router.get('/auth', checkAuthUser, getUserWithAuth);

/**
 * @route  GET /users/
 * @desc loadAllUsers
 */
router.get('/', //checkAuthUser, 
loadAllUsers);

/**
 * @route SECRET GET /users/auth
 * @desc update user auth
 */
router.put('/auth',
[check('email', 'Email is required').isEmail()],
 updateUserAuth);

 /**
 * @route  DELETE /users?id=
 * @desc Delete user(s)
 */
router.delete('/', //checkAuthUser, 
deleteUser);

 module.exports = router;