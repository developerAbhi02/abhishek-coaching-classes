import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="logo">
              <div className="logo-container">
                <img src={logo} alt="Abhishek Coaching Classes" className="site-logo" />
              </div>
              <div className="logo-text">
                <Terminal size={16} className="logo-icon" />
                <span>ACC</span>
              </div>
            </Link>
          </div>
          
          <div className={`navbar-right ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li><Link to="/" className={activeLink === '/' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Home</Link></li>
              <li><Link to="/courses" className={activeLink === '/courses' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Courses</Link></li>
              <li><Link to="/admission" className={activeLink === '/admission' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Admission</Link></li>
              <li><Link to="/events" className={activeLink === '/events' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Events</Link></li>
              <li><Link to="/resources" className={activeLink === '/resources' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Resources</Link></li>
              <li><Link to="/faculty" className={activeLink === '/faculty' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Faculty</Link></li>
              <li><Link to="/contact" className={activeLink === '/contact' ? 'nav-link active' : 'nav-link'} onClick={() => {window.scrollTo(0, 0); setIsMenuOpen(false);}}>Contact</Link></li>
            </ul>
          </div>
          
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
