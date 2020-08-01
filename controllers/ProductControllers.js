

/*** Handle requests to Create product */
const createProduct = (req, res) => {
  return res.status(200).json({
    message: 'Handling requests to create products'
  });
};

module.exports = {
  createProduct
};