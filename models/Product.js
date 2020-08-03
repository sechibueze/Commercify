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
  tag: {
    type: Array,
    default: []
  }
}, { timestamps: true});

module.exports = Product= mongoose.model('product', ProductSchema);