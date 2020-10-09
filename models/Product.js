const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Collection,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  productImage: {
    type: String,
    required: true,
    default: ''
  },
  visibility: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Array,
    default: []
  }
}, { timestamps: true});

module.exports = Product= mongoose.model('product', ProductSchema);