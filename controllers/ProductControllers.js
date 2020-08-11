const { validationResult } = require('express-validator')
const Product = require('../models/Product');
/*** Handle requests to Create product */
const createProduct = (req, res) => {
  // Check for input validation errors
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const owner = req.authUser.id;
  if (!owner) {
    return res.status(401).json({
      status: false,
      error: 'Unauthorized'
    })
  }

  const {
    // Required fields
    // owner,
    title,
    price,
    category,
    productImage,
    // Optional fields
    description,
    tags // comma-separated strings
  } = req.body;
  let productData = {
    owner,
    title,
    price,
    category,
    productImage
  };
  if(description) productData.description = description ;
  if(tags) productData.tags = tags.split(',') ;
  
  let newProduct = new Product(productData);
  newProduct.save(err => {
    if (err) {
      return res.status(500).json({
        status: false,
        error: 'Failed to create product',
        err
      });
    }
    
    // console.log('Request received: ', req.body)
    return res.status(201).json({
      status: true,
      message: 'Handling requests to create products - ci/cd update',
      data: newProduct
    });

  });

};

/*** Handle requests to Get all  product */
const getProducts = (req, res) => {
  let filter = {};
  Product
    .find(filter)
    .populate({
      path: 'owner',
      select: ['firstname', 'lastname'],
      model: User
    })
    .then(products => {

      return res.status(200).json({
        status: true,
        message: 'Handling requests to create products - ci/cd update',
        data: products
      });
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Failed to retrive product'
      });
    })
};

/*** Handle requests to Update product */
const updateProductById = (req, res) => {
  const { productId } = req.params ;
  if (!productId) {
    return res.status(400).status({
      status: false,
      error: 'Invalid request'
    })
  }

  Product
    .findOne({_id: productId})
    .then(product => {
      if (!product) {
        return res.status(404).json({
          status: false,
          error: 'Could not retrieve product'
        })
      }

      // Confirm that user is updateing his product

      // Update products
      const {
        title,
        price,
        category,
        productImage,
        description,
        tags // comma-separated strings
      } = req.body;
    
      if(title) product.title = title ;
      if(price) product.price = price ;
      if(category) product.category = category ;
      if(productImage) product.productImage = productImage ;
      if(description) product.description = description ;
      if(tags) product.tags = tags.split(',');

      // save the updated record
      product.save(err => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update product'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Product updated',
          data: product
        });

      });
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Could not retrieve product'
      })
    })
};

/*** Handle requests to Create product */
const deleteProductById = (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({
      status: false,
      error: 'No Product specified'
    });
  }

  Product
    .findOne({ _id: productId})
    .then(product => {

      if (!product) {
        return res.status(404).json({
          status: false,
          error: 'No Product was found'
        });
      }

      product.remove(err => {
        if (err) {
          return res.status(404).json({
            status: false,
            error: 'Failed to remove product'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Product removed',
          data: product._id
        });
      })
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Could not retrieve product'
      });
    });
};

module.exports = {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById
};