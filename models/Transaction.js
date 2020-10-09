const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  reference: {
    type: String,
    required: true,
    trim: true
  },
  ammount: {
    type: String,
    required: true,
    trim: true
  },
  
}, { timestamps: true});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);