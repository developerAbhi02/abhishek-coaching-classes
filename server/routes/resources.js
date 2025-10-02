const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png|gif|mp4|avi|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, images, and videos are allowed'));
    }
  }
});

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

// Create resource with file upload (admin only)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, fileType } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const resource = new Resource({
      title,
      description,
      category,
      fileType: fileType || (req.file ? path.extname(req.file.originalname).slice(1) : 'link'),
      fileUrl,
      fileName: req.file ? req.file.originalname : null,
      fileSize: req.file ? req.file.size : null
    });
    
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update resource with file upload (admin only)
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, fileType } = req.body;
    const updateData = { title, description, category };
    
    if (req.file) {
      // Delete old file if exists
      const existingResource = await Resource.findById(req.params.id);
      if (existingResource && existingResource.fileUrl) {
        const relativeOld = existingResource.fileUrl.startsWith('/')</n+          ? existingResource.fileUrl.slice(1)
          : existingResource.fileUrl;
        const oldFilePath = path.join(__dirname, '..', relativeOld);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      
      updateData.fileUrl = `/uploads/${req.file.filename}`;
      updateData.fileName = req.file.originalname;
      updateData.fileSize = req.file.size;
      updateData.fileType = fileType || path.extname(req.file.originalname).slice(1);
    }
    
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    
    // Delete associated file if exists
    if (resource.fileUrl) {
      const relativePath = resource.fileUrl.startsWith('/')
        ? resource.fileUrl.slice(1)
        : resource.fileUrl;
      const filePath = path.join(__dirname, '..', relativePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
