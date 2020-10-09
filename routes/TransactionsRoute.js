const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const checkAuthUser = require('../middlewares/checkAuthUser')

const {
  initializeTransaction,
  verifyTransaction
} = require('../controllers/TransactionControllers');

/**
 * @route POST private /transactions
 * @desc start transaction
 */
router.post('/',  [
  check('email', 'Title is required').isEmail(),
  check('amount', 'Price is required').notEmpty(),
], initializeTransaction );

/**
 * @route POST private /transactions/verify
 * @desc verify transaction
 */
router.post('/',  [
  check('reference', 'Reference is required').notEmpty(),
], verifyTransaction );

 module.exports = router;