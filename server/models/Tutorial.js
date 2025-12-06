const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  author_name: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  attribute1: {
    type: String
  },
  attribute2: {
    type: String
  },
  attribute3: {
    type: String
  },
  image: {
    type: String
  },
  videoLink: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
