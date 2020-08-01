const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: treu,
    trim: true
  },
}, { timestamps: true});

module.exports = User = mongoose.model('user', UserSchema);