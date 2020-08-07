const { validationResult } = require('express-validator');
const Collection = require('../models/Collection');

/*** Create a new collection for products */
const createCollection = (req, res) => {
  // Check for input validation errors
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  // Passed all validations
  // Get  fields
  const { title, description } = req.body;
  let collecctionData = { title };
  if(description) collecctionData.description = description;

  let newCollection = new Collection(collecctionData);

  newCollection.save(err => {
    if(err){
      return res.status(500).json({
        status: false,
        error: 'Could not save collection'

      })
    }

    return res.status(201).json({
      status: true,
      message: 'Created a new collecction',
      data: newCollection
    });

  });
};

/*** Get Coolections */
const fetchCollections = (req, res) => {
  let filter = {};

  Collection
    .find(filter)
    .then(collections => {

      return res.status(200).json({
        status: true,
        message: 'Requested collection',
        data: collections
      });
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Could not retrieve collections'

      })
    });
};

/*** Update collections */
const updateCollectionById = (req, res) => {
  const { collectionId } = req.params;

  if (!collectionId) {
    return res.status(400).json({
      status: false,
      error: 'No collection specified'
    });
  }
  const { title, description } = req.body;

  Collection
    .findOne({ _id: collectionId})
    .then(collection => {

      if(title) collection.title = title;
      if(description) collection.description = description;

      collection.save(err => {

        return res.status(200).json({
          status: true,
          message: 'Collecction updated',
          data: collection
        });
      })
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Could not retrieve collection'
      });
    });
  
};

/*** Create a new collection for products */
const deleteCollectionById = (req, res) => {
  const { collectionId } = req.params;

  if (!collectionId) {
    return res.status(400).json({
      status: false,
      error: 'No collection specified'
    });
  }

  Collection
    .findOne({ _id: collectionId})
    .then(collection => {

      if (!collection) {
        return res.status(404).json({
          status: false,
          error: 'No Collection was found'
        });
      }

      collection.remove(err => {
        if (err) {
          return res.status(404).json({
            status: false,
            error: 'Failed to remove collection'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Collecction removed',
          data: collection._id
        });
      })
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Could not retrieve collection'
      });
    });
};

module.exports = {
  createCollection,
  fetchCollections,
  updateCollectionById,
  deleteCollectionById
};