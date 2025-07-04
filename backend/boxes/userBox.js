const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  password: {type: String,required: true,},
  role: {type: String,enum: ['reader', 'author', 'admin'],default: 'reader',},
  description: {type: String},
  address: { country: { type: String }, state: { type: String }, city: { type: String }},
  picture: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);