const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const checkAuthUser = require('../middlewares/checkAuthUser')

const {
  handleWebhook,
} = require('../controllers/PaymentControllers');

/**
 * // https://shopover.herokuapp.com/api/payments/webhook
 * @route POST private /webhook
 * @desc start transaction
 */
router.post('/webhook_url', handleWebhook );

 module.exports = router;