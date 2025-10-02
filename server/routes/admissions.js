const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admission = require('../models/Admission');

// Submit admission enquiry
router.post('/', [
  body('studentName').notEmpty().withMessage('Student name is required'),
  body('studentClass').notEmpty().withMessage('Class is required'),
  body('batchSelection').notEmpty().withMessage('Batch selection is required'),
  body('parentName').notEmpty().withMessage('Parent name is required'),
  body('contact').isMobilePhone().withMessage('Valid contact number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('consentGiven').equals('true').withMessage('Consent must be given')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const admission = new Admission(req.body);
    await admission.save();
    
    res.status(201).json({ 
      message: 'Admission enquiry submitted successfully!',
      admissionId: admission._id 
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all admissions (admin only)
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ submittedAt: -1 });
    res.json(admissions);
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admission status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    
    res.json(admission);
  } catch (error) {
    console.error('Update admission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
