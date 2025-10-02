import React, { useState } from 'react';
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--color-card)', padding: '3rem', borderRadius: '15px', boxShadow: 'var(--shadow-strong)', width: '100%', maxWidth: '420px', border: '1px solid var(--color-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--color-primary)', width: '64px', height: '64px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Lock size={24} style={{ color: 'white' }} />
          </div>
          <h2 style={{ color: 'var(--color-text)', marginBottom: '0.5rem' }}>Admin Login</h2>
          <p style={{ color: 'var(--color-muted)' }}>Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" style={{ color: 'var(--color-text)' }}>
              <User size={16} style={{ marginRight: '0.5rem' }} />
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ color: 'var(--color-text)' }}>
              <Lock size={16} style={{ marginRight: '0.5rem' }} />
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
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            ← Back to Website
          </a>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={async () => {
              try {
                const desiredPassword = window.prompt('Set password for default admin (username: admin):', 'admin123');
                if (!desiredPassword) return;
                await api.post('/api/admin/ensure-default', { username: 'admin', password: desiredPassword, email: 'admin@abhishekcoaching.com', key: process.env.REACT_APP_ADMIN_SETUP_KEY || '' });
                toast.success('Default admin ensured. You can login now.');
              } catch (e) {
                const msg = e?.response?.data?.message || 'Failed to create/update default admin.';
                toast.error(msg);
              }
            }}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Ensure default admin
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={async () => {
              try {
                await api.post('/api/admin/dev-bootstrap');
                toast.success('Dev admin bootstrapped. Try login now.');
              } catch (e) {
                const msg = e?.response?.data?.message || 'Failed to reset password';
                toast.error(msg);
              }
            }}
            style={{ width: '100%' }}
          >
            Dev bootstrap admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
