import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Terminal, ChevronRight, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-scanline"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <img 
                src={logo} 
                alt="Abhishek Coaching Classes" 
                className="footer-logo-img site-logo" 
              />
              <div className="footer-logo-text">
                <Terminal size={14} className="footer-logo-icon" />
                <h3>Abhishek Coaching Classes</h3>
              </div>
            </div>
            <p className="footer-description">
              Quality education with personalized guidance. 
              Join our batches to boost your performance and confidence.
            </p>
            <div className="footer-buttons">
              <Link to="/admission" className="btn btn-sm btn-primary">
                <span>Apply Now</span>
                <ChevronRight size={16} />
              </Link>
              <Link to="/courses" className="btn btn-sm btn-light">
                <span>View Courses</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="footer-links-container">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link"><ChevronRight size={14} />Home</Link></li>
              <li><Link to="/courses" className="footer-link"><ChevronRight size={14} />Courses</Link></li>
              <li><Link to="/admission" className="footer-link"><ChevronRight size={14} />Admission</Link></li>
              <li><Link to="/events" className="footer-link"><ChevronRight size={14} />Events</Link></li>
              <li><Link to="/resources" className="footer-link"><ChevronRight size={14} />Resources</Link></li>
              <li><Link to="/faculty" className="footer-link"><ChevronRight size={14} />Faculty</Link></li>
              <li><Link to="/contact" className="footer-link"><ChevronRight size={14} />Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <span>+91 8957536528</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <span>acclilasi@zohomail.in</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <span>lilasi kala, Sonbhadra, Uttar Pradesh 231212</span>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon"><Facebook size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon"><Instagram size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon"><Linkedin size={18} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon"><Github size={18} /></a>
            </div>
          </div>
          

        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 <span className="highlight">Abhishek Coaching Classes</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
