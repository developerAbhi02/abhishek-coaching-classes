import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white', paddingTop: '6rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Contact Us</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Get in touch with us for any queries, admission information, or to schedule a visit to our coaching center.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {/* Contact Information */}
            <div className="course-card">
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '2rem', textAlign: 'center' }}>Contact Information</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Phone size={20} style={{ color: 'var(--color-primary)', marginRight: '1rem' }} />
                  <strong>Phone</strong>
                </div>
                <p style={{ marginLeft: '2.5rem', color: '#666' }}>+91 8957536528</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Mail size={20} style={{ color: 'var(--color-primary)', marginRight: '1rem' }} />
                  <strong>Email</strong>
                </div>
                <p style={{ marginLeft: '2.5rem', color: '#666' }}>acclilasi@zohomail.in</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <MapPin size={20} style={{ color: 'var(--color-primary)', marginRight: '1rem' }} />
                  <strong>Address</strong>
                </div>
                <p style={{ marginLeft: '2.5rem', color: '#666', lineHeight: '1.6' }}>
                  <span style={{ color: '#ff8c00' }}>Abhishek Coaching Classes</span><br />
                  lilasi kala, Sonbhadra, Uttar Pradesh 231212<br />
                  India
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Clock size={20} style={{ color: 'var(--color-primary)', marginRight: '1rem' }} />
                  <strong>Office Hours</strong>
                </div>
                <p style={{ marginLeft: '2.5rem', color: '#666' }}>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p style={{ marginLeft: '2.5rem', color: '#666' }}>Sunday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>

            {/* Class Timings */}
            <div className="course-card">
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '2rem', textAlign: 'center' }}>Class Timings</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Regular Classes</h4>
                <p style={{ color: '#666', marginLeft: '1rem' }}>4:00 PM - 9:00 PM</p>
                <p style={{ color: '#999', fontSize: '0.9rem', marginLeft: '1rem' }}>
                  Specific slots allocated by admin
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Mock Tests</h4>
                <p style={{ color: '#666', marginLeft: '1rem' }}>Scheduled Monthly</p>
                <p style={{ color: '#999', fontSize: '0.9rem', marginLeft: '1rem' }}>
                  Offline at coaching center
                </p>
              </div>

              <div>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Special Events</h4>
                <p style={{ color: '#666', marginLeft: '1rem' }}>As Announced</p>
                <p style={{ color: '#999', fontSize: '0.9rem', marginLeft: '1rem' }}>
                  Check Events page for updates
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="course-card">
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '2rem', textAlign: 'center' }}>Quick Actions</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="/admission" className="btn" style={{ textAlign: 'center' }}>
                  Apply for Admission
                </a>
                
                <a href="/courses" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                  View Courses
                </a>
                
                <a href="/events" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                  Check Events
                </a>
                
                <a href="/resources" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                  Download Resources
                </a>
              </div>

              <div className="course-card" style={{ marginTop: '2rem', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <MessageCircle size={16} style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }} />
                  <strong>Need Help?</strong>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                  Use our chatbot for instant answers to common questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="course-card" style={{ padding: '2rem' }}>
            <a 
              href="https://maps.app.goo.gl/tnY7gSX1NE8fgc2SA" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{ 
                height: '400px', 
                borderRadius: '10px', 
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
              >
                <MapPin size={64} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: '#ff8c00' }}>Abhishek Coaching Classes</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9, textAlign: 'center', maxWidth: '300px' }}>
                  lilasi kala, Sonbhadra, Uttar Pradesh 231212
                </p>
                <div style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Click to view on Google Maps
                </div>
              </div>
            </a>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <a 
                href="https://maps.app.goo.gl/tnY7gSX1NE8fgc2SA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <MapPin size={16} />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="course-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What are the admission requirements?</h4>
                <p style={{ color: '#666', margin: 0 }}>
                  Simply fill out our admission enquiry form and we will contact you within 24-48 hours to discuss the admission process.
                </p>
              </div>

              <div className="course-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Can I pay fees monthly?</h4>
                <p style={{ color: '#666', margin: 0 }}>
                  Yes, MIB 1.0 course offers monthly payment option (₹499/month). Other courses require one-time payment.
                </p>
              </div>

              <div className="course-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Are mock tests mandatory?</h4>
                <p style={{ color: '#666', margin: 0 }}>
                  No, mock tests are optional and cost ₹300 per month. They are conducted offline at our coaching center.
                </p>
              </div>

              <div className="course-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What if I miss a class?</h4>
                <p style={{ color: '#666', margin: 0 }}>
                  Contact us to arrange for makeup sessions. We understand that students may miss classes due to various reasons.
                </p>
              </div>

              <div className="course-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Do you provide study materials?</h4>
                <p style={{ color: '#666', margin: 0 }}>
                  Yes, we provide comprehensive study materials, notes, and sample papers. Check our Resources section for downloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem' }}>Emergency Contact</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              For urgent queries or emergencies, you can reach us directly.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <Phone size={32} style={{ marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, fontWeight: 'bold' }}>+91 8957536528</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Mail size={32} style={{ marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, fontWeight: 'bold' }}>acclilasi@zohomail.in</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
