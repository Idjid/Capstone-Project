const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bookQuality: { type: String, enum: ['like new', 'scratchy', 'some marks'], required: true },
  bookType: { type: String, enum: ['hardcover', 'paperback']},
  author: { type: String, required: true },
  coordinates: { lat: { type: Number }, lng: { type: Number } },
  images: [{ type: String }], 
  }, { timestamps: true });

module.exports = mongoose.model('Listing', bookSchema);