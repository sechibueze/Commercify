

/*** Create a new collection for products */
const createCollection = (req, res) => {
  return res.status(200).json({
    message: 'Create a new collecction'
  });
};

module.exports = {
  createCollection
};