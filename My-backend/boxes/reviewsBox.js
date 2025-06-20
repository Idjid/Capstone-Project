const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new mongoose.Schema({
  bookId: {type: Schema.Types.ObjectId, required: true, ref: 'Book'},
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  userName: { type: String, required: true },
  comment: {type: String, required: true},
  rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);