import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token validity
      const verifyToken = async () => {
        try {
          await api.get('/api/admissions');
          navigate('/admin/dashboard');
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
      };
      verifyToken();
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/api/admin/login', formData);
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      const msg = error?.response?.data?.message || 'Invalid credentials. Please try again.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const setupDefaultAdmin = async () => {
    try {
      const desiredPassword = window.prompt('Set password for default admin (username: admin):', 'admin123');
      if (!desiredPassword) return;
      await api.post('/api/admin/ensure-default', { 
        username: 'admin', 
        password: desiredPassword, 
        email: 'admin@abhishekcoaching.com', 
        key: process.env.REACT_APP_ADMIN_SETUP_KEY || '' 
      });
      toast.success('Default admin ensured. You can login now.');
    } catch (e) {
      const msg = e?.response?.data?.message || 'Failed to create/update default admin.';
      toast.error(msg);
    }
  };

  const devBootstrapAdmin = async () => {
    try {
      await api.post('/api/admin/dev-bootstrap');
      toast.success('Dev admin bootstrapped. Try login now.');
    } catch (e) {
      const msg = e?.response?.data?.message || 'Failed to reset password';
      toast.error(msg);
    }
  };

  return (
    <div className="section section-lg" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-color) 100%)'
    }}>
      <div className="container">
        <div className="form-card" style={{ maxWidth: '420px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <div className="form-icon-container">
              <Lock size={24} className="form-icon-large" />
            </div>
            <h2 className="form-title">Admin Login</h2>
            <p>Access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                <User size={16} className="form-icon" />
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter username"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={16} className="form-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="form-input"
              />
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <a href="/" className="link-primary">
              ← Back to Website
            </a>
          </div>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-sm btn-light w-100"
              onClick={setupDefaultAdmin}
            >
              Ensure default admin
            </button>
          </div>

          <div className="text-center mt-2">
            <button
              type="button"
              className="btn btn-sm btn-light w-100"
              onClick={devBootstrapAdmin}
            >
              Dev bootstrap admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
