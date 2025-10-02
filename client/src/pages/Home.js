import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, FileText, Award } from 'lucide-react';
import Typed from 'typed.js';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Start subtitle typing effect with repeat
    const subtitleTyped = new Typed(subtitleRef.current, {
      strings: ['Empowering students with quality education and personalized guidance to achieve their academic dreams'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      showCursor: true,
      cursorChar: '|',
      loop: true,
      loopCount: Infinity
    });

    // Show buttons immediately (no typing effect on buttons)
    setTimeout(() => {
      buttonsRef.current.style.opacity = '1';
      buttonsRef.current.style.transform = 'translateY(0)';
    }, 500);

    return () => {
      subtitleTyped.destroy();
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title" style={{ minHeight: '60px' }}>
            <span className="welcome-line">Welcome to</span>
            <span className="brand-title brand-title-strong">Abhishek Coaching Classes</span>
          </h1>
          <p style={{ minHeight: '60px', marginBottom: '2rem' }}>
            <span ref={subtitleRef}></span>
          </p>
          <div 
            ref={buttonsRef}
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.8s ease',
              position: 'relative',
              zIndex: 10
            }}
          >
            <Link to="/admission" className="btn" style={{ cursor: 'pointer', textDecoration: 'none' }}>Apply Now</Link>
            <Link to="/courses" className="btn btn-secondary" style={{ cursor: 'pointer', textDecoration: 'none' }}>View Courses</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="course-card" style={{ textAlign: 'center', padding: '2rem', animation: 'slideInLeft 0.8s ease-out' }}>
              <div className="floating">
                <BookOpen size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
              </div>
              <h3>Expert Faculty</h3>
              <p>Experienced teachers dedicated to student success</p>
            </div>
            <div className="course-card" style={{ textAlign: 'center', padding: '2rem', animation: 'slideInLeft 0.8s ease-out 0.1s both' }}>
              <div className="floating">
                <Users size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
              </div>
              <h3>Small Batch Size</h3>
              <p>Personalized attention for every student</p>
            </div>
            <div className="course-card" style={{ textAlign: 'center', padding: '2rem', animation: 'slideInLeft 0.8s ease-out 0.2s both' }}>
              <div className="floating">
                <Calendar size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
              </div>
              <h3>Flexible Timings</h3>
              <p>Classes scheduled between 4 PM to 9 PM</p>
            </div>
            <div className="course-card" style={{ textAlign: 'center', padding: '2rem', animation: 'slideInLeft 0.8s ease-out 0.3s both' }}>
              <div className="floating">
                <Award size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
              </div>
              <h3>Proven Results</h3>
              <p>Consistent track record of student achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Courses</h2>
          <div className="courses-grid">
            <div className="course-card">
              <h3>Lakshya 90</h3>
              <p>CBSE Class 10 Special Batch</p>
              <div className="course-fee">₹6,000</div>
              <div className="course-timing">Timing: 4 PM – 9 PM</div>
              <ul className="course-features">
                <li>Complete CBSE syllabus coverage</li>
                <li>Regular assessments</li>
                <li>Doubt clearing sessions</li>
                <li>One-time payment</li>
              </ul>
            </div>
            
            <div className="course-card">
              <h3>Sankalp</h3>
              <p>Navodaya Vidyalaya Preparation</p>
              <div className="course-fee">₹8,000 - ₹15,000</div>
              <div className="course-timing">Timing: 4 PM – 9 PM</div>
              <ul className="course-features">
                <li>Class 3 Entry: ₹15,000 (3 years)</li>
                <li>Class 4 Entry: ₹13,000 (2 years)</li>
                <li>Class 5 Entry: ₹8,000 (1 year)</li>
                <li>Specialized preparation</li>
              </ul>
            </div>
            
            <div className="course-card">
              <h3>MIT30</h3>
              <p>Spoken English Mastery</p>
              <div className="course-fee">₹1,499</div>
              <div className="course-timing">Timing: 4 PM – 9 PM</div>
              <ul className="course-features">
                <li>3 months intensive course</li>
                <li>Practical speaking sessions</li>
                <li>Grammar fundamentals</li>
                <li>One-time payment</li>
              </ul>
            </div>
            
            <div className="course-card">
              <h3>MIB 1.0</h3>
              <p>Biology NCERT Mastery</p>
              <div className="course-fee">₹499/month or ₹4,000</div>
              <div className="course-timing">Timing: 4 PM – 9 PM</div>
              <ul className="course-features">
                <li>Class 11 & 12 Biology</li>
                <li>Complete NCERT coverage</li>
                <li>Monthly or one-time payment</li>
                <li>Conceptual clarity</li>
              </ul>
            </div>

            <div className="course-card">
              <h3>Doubt Solving</h3>
              <p>Dedicated weekly doubt-solving sessions</p>
              <div className="course-fee">₹499/month</div>
              <div className="course-timing">Timing: 4 PM – 9 PM</div>
              <ul className="course-features">
                <li>Weekly doubt sessions</li>
                <li>Personalized guidance</li>
                <li>Concept revision</li>
                <li>Affordable monthly plan</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/courses" className="btn">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Mock Test Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Mock Test Program</h2>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Enhance your preparation with our monthly mock tests. Practice makes perfect!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '10px' }}>
                <strong>Fee: ₹300/month</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '10px' }}>
                <strong>Mode: Offline at Coaching</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Ready to Start Your Journey?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Join hundreds of successful students who have achieved their goals with our guidance.
            </p>
            <Link to="/admission" className="btn" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
