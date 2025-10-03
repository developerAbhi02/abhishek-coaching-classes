const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all active resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resources by category
router.get('/category/:category', async (req, res) => {
  try {
    const resources = await Resource.find({ 
      category: req.params.category,
      isActive: true 
    }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error('Get resources by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create text-based resource (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, subtitle, category, content } = req.body;
    
    const resource = new Resource({
      title,
      subtitle,
      category,
      content,
      isActive: true
    });
    
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update text-based resource (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { title, subtitle, category, content } = req.body;
    
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, category, content },
      { new: true }
    );
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.json(resource);
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resource (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
