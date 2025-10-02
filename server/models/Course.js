const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
