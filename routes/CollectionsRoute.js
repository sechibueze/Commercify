const express = require('express');
const { check } = require('express-validator');
const router =express.Router();
const checkAuthUser = require('../middlewares/checkAuthUser');
const checkAuthAdmin = require('../middlewares/checkAuthAdmin');

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
router.post('/', checkAuthUser, checkAuthAdmin, [ check('title', 'Title is required').notEmpty()], createCollection);

/**
 * @route POST /api/collections
 * @desc Get all collections
 */
router.get('/',  fetchCollections);

/**
 * @route PUT /api/collections/:collectionId
 * @desc Update a collection
 */
router.put('/:collectionId', checkAuthUser, checkAuthAdmin, updateCollectionById);

/**
 * @route DELETE private /api/collections/:collectionId
 * @desc Delete a collection
 */
router.delete('/:collectionId', checkAuthUser, checkAuthAdmin, deleteCollectionById);

 module.exports = router;