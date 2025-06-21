const mongoose = require('mongoose');
const { Schema } = mongoose;

const userBooksSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  bookIds: [{type: Schema.Types.ObjectId, ref: 'Book'}]
}, { timestamps: true });

module.exports = mongoose.model('UserBooks', userBooksSchema);
