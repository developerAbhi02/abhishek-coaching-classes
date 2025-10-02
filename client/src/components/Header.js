import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Abhishek Coaching Classes" style={{ height: 112, width: 112, borderRadius: '12px', boxShadow: '0 0 0 4px rgba(255,255,255,0.2), 0 12px 24px rgba(0,0,0,0.35)' }} />
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'white',
                borderRadius: 999,
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
            <li><Link to="/admission" onClick={() => setIsMenuOpen(false)}>Admission</Link></li>
            <li><Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link></li>
            <li><Link to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link></li>
            <li><Link to="/faculty" onClick={() => setIsMenuOpen(false)}>Faculty</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
