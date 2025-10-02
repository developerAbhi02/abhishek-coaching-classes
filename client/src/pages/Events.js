import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to static data if API fails
      setEvents([
        {
          _id: '1',
          title: 'Winter Olympiad 2024',
          description: 'Join our annual Winter Olympiad competition for students of all classes. Test your knowledge and win exciting prizes!',
          date: new Date('2024-12-15'),
          location: 'Abhishek Coaching Classes',
          fee: 200
        },
        {
          _id: '2',
          title: 'Parent-Teacher Meeting',
          description: 'Monthly parent-teacher meeting to discuss student progress and address any concerns.',
          date: new Date('2024-12-20'),
          location: 'Abhishek Coaching Classes',
          fee: 0
        },
        {
          _id: '3',
          title: 'Mock Test Series Launch',
          description: 'Introduction to our comprehensive mock test series for board exam preparation.',
          date: new Date('2024-12-25'),
          location: 'Abhishek Coaching Classes',
          fee: 300
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white', paddingTop: '6rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Events & Workshops</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Stay updated with our upcoming events, workshops, and competitions designed to enhance your learning experience.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Calendar size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
              <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Events Scheduled</h3>
              <p style={{ color: '#999' }}>Check back later for upcoming events and workshops.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {events.map((event) => (
                <div key={event._id} className="course-card">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <Calendar size={24} style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }} />
                    <h3>{event.title}</h3>
                  </div>
                  
                  <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {event.description}
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <Clock size={16} style={{ color: '#666', marginRight: '0.5rem' }} />
                      <span style={{ color: '#666' }}>{formatDate(event.date)}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <MapPin size={16} style={{ color: '#666', marginRight: '0.5rem' }} />
                      <span style={{ color: event.location === 'Abhishek Coaching Classes' ? '#ff8c00' : '#666' }}>{event.location}</span>
                    </div>
                    
                    {event.fee > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Users size={16} style={{ color: '#666', marginRight: '0.5rem' }} />
                        <span style={{ color: '#666' }}>Fee: ₹{event.fee}</span>
                      </div>
                    )}
                  </div>
                  
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href="/admission" className="btn" style={{ width: '100%', textAlign: 'center' }}>
                      Register Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Announcement */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Stay Connected</h2>
            <div className="course-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Don't Miss Out!</h3>
              <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                Follow us on social media and subscribe to our newsletter to stay updated with all upcoming events, 
                workshops, and important announcements.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/admission" className="btn">
                  Subscribe to Updates
                </a>
                <a href="/contact" className="btn btn-secondary">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Guidelines */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Event Guidelines</h2>
            <div className="course-card" style={{ padding: '2rem' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Registration is required for all paid events
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Please arrive 15 minutes before the scheduled time
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Bring necessary materials as mentioned in event details
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Cancellation policy: 24 hours notice required for refunds
                </li>
                <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Contact us for any special requirements or accommodations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
