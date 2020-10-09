const express = require('express');

const router = express.Router();

const UsersRoute = require('./UsersRoute');
const CollectionsRoute = require('./CollectionsRoute');
const ProductsRoute = require('./ProductsRoute');
const TransactionsRoute = require('./TransactionsRoute');
const PaymentsRoute = require('./PaymentsRoute');

router.use('/users', UsersRoute);
router.use('/collections', CollectionsRoute);
router.use('/products', ProductsRoute);
router.use('/transactions', TransactionsRoute);
router.use('/payments', PaymentsRoute);

module.exports = router;