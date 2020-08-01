const express = require('express');
const router =express.Router();

const {
  signup
} = require('../controllers/UserControllers')
/**
 * @route POST /users
 * @desc 
 */
router.get('/',  signup);

 module.exports = router;