const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true});

module.exports = Collection = mongoose.model('collection', CollectionSchema);