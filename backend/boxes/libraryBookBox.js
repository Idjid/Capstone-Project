const mongoose = require('mongoose');

const libBookSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, //Work key => "/works/OL12345W"
  title: { type: String, required: true },
  description: { type: String }, 
  subjects: [{ type: String }],  
  authors: [{ type: String }],   //author_key => "/authors/OL12345A"
  cover_i: { type: Number },
}, { collection: 'locallibrary' });

module.exports = mongoose.model('LibBook', libBookSchema);
