const express = require('express');
const router =express.Router();

const {
  createCollection
} = require('../controllers/CollectionControllers')
/**
 * @route POST /users
 * @desc 
 */
router.get('/',  createCollection);

 module.exports = router;