const express = require('express');
const router =express.Router();

const {
  createProduct
} = require('../controllers/ProductControllers')
/**
 * @route POST /users
 * @desc 
 */
router.get('/',  createProduct);

 module.exports = router;