const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  key: { type: String }, //Work key => "/works/OL12345W"
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { country: { type: String }, state: { type: String }, city: { type: String }},
  bookQuality: { type: String, enum: ['like new', 'scratchy', 'some marks'], required: true },
  bookType: { type: String, enum: ['hardcover', 'paperback']},
  author: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Добавлено поле owner
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
