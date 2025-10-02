import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={logo} alt="Abhishek Coaching Classes" style={{ height: 50, width: 50, borderRadius: '50%', marginRight: 10, objectFit: 'cover' }} />
              <h3 style={{ color: '#ff8c00', margin: 0 }}>Abhishek Coaching Classes</h3>
            </div>
            <p style={{ marginBottom: '1rem', maxWidth: 400 }}>
              Quality education with personalized guidance. Join our batches to boost your performance and confidence.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href="/admission" className="btn" style={{ padding: '8px 16px' }}>Apply Now</a>
              <a href="/courses" className="btn btn-secondary" style={{ padding: '8px 16px' }}>View Courses</a>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#ffd700' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/admission" style={{ color: 'white', textDecoration: 'none' }}>Admission</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/resources" style={{ color: 'white', textDecoration: 'none' }}>Resources</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/faculty" style={{ color: 'white', textDecoration: 'none' }}>Faculty</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#ffd700' }}>Contact Info</h4>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Phone size={16} style={{ marginRight: '0.5rem' }} />
              <span>+91 8957536528</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Mail size={16} style={{ marginRight: '0.5rem' }} />
              <span>acclilasi@zohomail.in</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MapPin size={16} style={{ marginRight: '0.5rem' }} />
              <span>lilasi kala, Sonbhadra, Uttar Pradesh 231212</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #555', paddingTop: '1rem', textAlign: 'center' }}>
          <p>&copy; 2024 <span style={{ color: '#ff8c00' }}>Abhishek Coaching Classes</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
