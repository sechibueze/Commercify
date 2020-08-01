const express = require('express');

const router = express.Router();

const UsersRoute = require('./UsersRoute');
const CollectionsRoute = require('./CollectionsRoute');
const ProductsRoute = require('./ProductsRoute');

router.use('/users', UsersRoute);
router.use('/collections', CollectionsRoute);
router.use('/products', ProductsRoute);

module.exports = router;