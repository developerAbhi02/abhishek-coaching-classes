const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  studentClass: {
    type: String,
    required: true
  },
  batchSelection: {
    type: String,
    required: true,
    enum: ['Lakshya 90', 'Sankalp Class 3', 'Sankalp Class 4', 'Sankalp Class 5', 'MIT30', 'MIB 1.0']
  },
  parentName: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mockTestParticipation: {
    type: Boolean,
    default: false
  },
  consentGiven: {
    type: Boolean,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'enrolled', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Admission', admissionSchema);
