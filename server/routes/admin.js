const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );
    
    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create admin (for initial setup)
router.post('/create', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    const admin = new Admin({ username, password, email });
    await admin.save();
    
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset admin password (dev-safe). In production, requires ADMIN_SETUP_KEY
router.post('/reset-password', async (req, res) => {
  try {
    const { username, password, key } = req.body;
    const requireKey = !!process.env.ADMIN_SETUP_KEY;
    if (requireKey && key !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.password = password;
    await admin.save(); // triggers hash
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ensure default admin exists and has the provided password (dev-safe upsert)
router.post('/ensure-default', async (req, res) => {
  try {
    const { username = 'admin', password = 'admin123', email = 'admin@abhishekcoaching.com', key } = req.body;
    const requireKey = !!process.env.ADMIN_SETUP_KEY;
    if (requireKey && key !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ message: 'Forbidden: invalid setup key' });
    }

    // Try to find by username first
    let admin = await Admin.findOne({ username });

    // If not found, try by email to avoid duplicate email unique constraint
    if (!admin && email) {
      admin = await Admin.findOne({ email });
    }

    if (!admin) {
      try {
        admin = new Admin({ username, password, email });
        await admin.save();
        return res.status(201).json({ message: 'Admin created successfully' });
      } catch (err) {
        // Handle duplicate key error gracefully by updating the conflicting record
        if (err && err.code === 11000) {
          const conflictField = Object.keys(err.keyPattern || {})[0];
          const filter = conflictField && err.keyValue
            ? { [conflictField]: err.keyValue[conflictField] }
            : { $or: [{ username }, { email }] };
          admin = await Admin.findOne(filter);
          if (!admin) {
            console.error('Ensure default admin dup-key but not found:', err);
            return res.status(500).json({ message: 'Server error' });
          }
        } else {
          console.error('Ensure default admin create error:', err);
          return res.status(500).json({ message: 'Server error' });
        }
      }
    }

    // Update password via save() to trigger hashing
    admin.password = password;
    if (email) admin.email = email;
    // If a different username is requested, attempt to set it if available
    if (username && admin.username !== username) {
      const usernameTaken = await Admin.findOne({ username, _id: { $ne: admin._id } });
      if (!usernameTaken) {
        admin.username = username;
      }
    }
    await admin.save();
    return res.json({ message: 'Admin ensured and password updated', admin: { username: admin.username, email: admin.email } });
  } catch (error) {
    console.error('Ensure default admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dev-only: force create/reset default admin without setup key
router.post('/dev-bootstrap', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const username = 'admin';
    const email = 'admin@abhishekcoaching.com';
    const password = 'admin123';
    let admin = await Admin.findOne({ username });
    if (!admin) {
      admin = new Admin({ username, password, email });
      await admin.save();
    } else {
      admin.password = password;
      admin.email = email;
      await admin.save();
    }
    return res.json({ message: 'Dev admin bootstrapped', admin: { username: admin.username, email: admin.email } });
  } catch (error) {
    console.error('Dev bootstrap error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
