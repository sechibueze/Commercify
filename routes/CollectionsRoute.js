const express = require('express');
const { check } = require('express-validator');
const router =express.Router();
const checkUserAuth = require('../middlewares/checkAuthUser');

const {
  createCollection,
  fetchCollections,
  updateCollectionById,
  deleteCollectionById
} = require('../controllers/CollectionControllers');

/**
 * @route POST private /api/collections
 * @desc Create collection
 */
router.post('/', [ check('title', 'Title is required').notEmpty()], createCollection);

/**
 * @route POST /api/collections
 * @desc Get all collections
 */
router.get('/',  fetchCollections);

/**
 * @route PUT /api/collections/:collectionId
 * @desc Update a collection
 */
router.put('/:collectionId',  updateCollectionById);

/**
 * @route DELETE private /api/collections/:collectionId
 * @desc Delete a collection
 */
router.delete('/:collectionId',  deleteCollectionById);

 module.exports = router;