const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const checkAuthUser = require('../middlewares/checkAuthUser')

const {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById
} = require('../controllers/ProductControllers');

/**
 * @route POST private /products
 * @desc Create products
 */
router.post('/', checkAuthUser, [
  check('title', 'Title is required').notEmpty(),
  check('price', 'Price is required').notEmpty(),
  check('category', 'Category is required').notEmpty(),
  check('productImage', 'Product image is required').notEmpty(),
],    createProduct);

/**
 * @route GET  /products
 * @desc fetch products
 */
router.get('/',  getProducts);

/**
 * @route PUT private /products/:productId
 * @desc Update product
 */
router.put('/:productId', checkAuthUser,  updateProductById);

/**
 * @route DELETE private /products/:productId
 * @desc delete product
 */
router.delete('/:productId', checkAuthUser,  deleteProductById);

 module.exports = router;