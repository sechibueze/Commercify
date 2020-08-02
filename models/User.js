const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  roles: {
    type: Array,
    default: ['customer']
  },
}, { timestamps: true});

module.exports = User = mongoose.model('user', UserSchema);