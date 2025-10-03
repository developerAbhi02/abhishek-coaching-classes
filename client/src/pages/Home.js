import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, FileText, Award, Terminal, Code, Shield, Zap } from 'lucide-react';
import Typed from 'typed.js';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Start subtitle typing effect with repeat
    const subtitleTyped = new Typed(subtitleRef.current, {
      strings: [
        'Empowering students with quality education',
        'Hack your way to academic success',
        'Decode your potential with our expert guidance',
        'Programming your future for excellence'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      showCursor: true,
      cursorChar: '_',
      loop: true,
      loopCount: Infinity
    });

    // Show buttons with animation
    setTimeout(() => {
      if (buttonsRef.current) {
        buttonsRef.current.style.opacity = '1';
        buttonsRef.current.style.transform = 'translateY(0)';
      }
    }, 500);

    return () => {
      subtitleTyped.destroy();
    };
  }, []);

  return (
    <div className="home-container">
        {/* Access Granted Section - Repositioned */}
        <section className="access-granted-section text-center" style={{ marginTop: '20px', marginBottom: '30px' }}>
          <div className="container">
            <div className="access-content">
              <h2>Access Granted to Quality Education</h2>
              <p>Join our coaching classes and get access to expert faculty, comprehensive study materials, and a supportive learning environment.</p>
            </div>
          </div>
        </section>
        
        {/* Hero Section */}
      <section className="hero">
        <div className="matrix-bg"></div>
        <div className="scanline"></div>
        <div className="glitch-effect"></div>
        
        <div className="container hero-content glass-panel text-center">
          <div className="glitch-wrapper">
            <h1 className="hero-title glitch-text">
              <span className="welcome-line">Access Granted:</span>
              <span className="brand-title">ABHISHEK COACHING CLASSES</span>
            </h1>
          </div>
          
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
              <span className="terminal-title">student@acc:~$</span>
            </div>
            <div className="terminal-body">
              <div className="line">
                <span className="prompt">student@acc:~$</span>
                <span className="command">initialize education.sys</span>
              </div>
              <div className="line">
                <span className="response">Loading educational resources...</span>
              </div>
              <div className="line">
                <span className="prompt">student@acc:~$</span>
                <span className="command">display mission</span>
              </div>
              <div className="line">
                <span className="response" ref={subtitleRef}></span>
              </div>
            </div>
          </div>
          
          <div className="hero-buttons d-flex justify-content-center" ref={buttonsRef}>
            <Link to="/admission" className="btn btn-primary mx-2">
              <Zap size={18} />
              <span>Apply Now</span>
            </Link>
            <Link to="/courses" className="btn btn-secondary mx-2">
              <Code size={18} />
              <span>View Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Us</h2>
          <div className="features-grid d-flex justify-content-center">
            <div className="feature-card text-center mx-3">
              <div className="feature-icon">
                <BookOpen size={32} />
              </div>
              <h3>Expert Faculty</h3>
              <p>Experienced teachers dedicated to student success</p>
            </div>
            
            <div className="feature-card text-center mx-3">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Small Batch Size</h3>
              <p>Small batch sizes ensuring individual focus and guidance</p>
            </div>
            
            <div className="feature-card text-center mx-3">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>Proven Results</h3>
              <p>Consistent track record of student success and achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section courses-section">
        <div className="container">
          <h2 className="section-title">Our Courses</h2>
          <div className="courses-tiles d-flex justify-content-center">
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>Classes 1-5</h3>
                <span className="course-badge">Foundation</span>
              </div>
              <div className="course-tile-content">
                <p>Building strong fundamentals in Mathematics, Science, and English for primary school students.</p>
                <Link to="/courses" className="btn btn-sm btn-outline">Learn More</Link>
              </div>
            </div>
            
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>Classes 6-10</h3>
                <span className="course-badge">Comprehensive</span>
              </div>
              <div className="course-tile-content">
                <p>Complete academic support for middle and high school students with focus on board exam preparation.</p>
                <Link to="/courses" className="btn btn-sm btn-outline">Learn More</Link>
              </div>
            </div>
            
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>Navodaya Preparation</h3>
                <span className="course-badge">Special</span>
              </div>
              <div className="course-tile-content">
                <p>Specialized coaching for Jawahar Navodaya Vidyalaya entrance examination with proven success rate.</p>
                <Link to="/courses" className="btn btn-sm btn-outline">Learn More</Link>
              </div>
            </div>
            
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>CHS Preparation</h3>
                <span className="course-badge">New Batch</span>
              </div>
              <div className="course-tile-content">
                <p>Targeted preparation for Central Hindu School entrance test with comprehensive study material and mock tests.</p>
                <Link to="/courses" className="btn btn-sm btn-outline">Learn More</Link>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link to="/courses" className="btn btn-primary">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-tiles d-flex justify-content-center">
            <div className="event-tile">
              <div className="event-tile-header">
                <h3>Science Exhibition</h3>
                <span className="event-badge">Free</span>
              </div>
              <div className="event-tile-content">
                <p className="event-date">December 15, 2024</p>
                <p>Annual science exhibition showcasing student projects and innovations in various scientific domains.</p>
                <p className="event-location">Abhishek Coaching Classes</p>
                <Link to="/events" className="btn btn-sm btn-outline">Details</Link>
              </div>
            </div>
            
            <div className="event-tile">
              <div className="event-tile-header">
                <h3>Mock Test Series Launch</h3>
                <span className="event-badge">₹300</span>
              </div>
              <div className="event-tile-content">
                <p className="event-date">December 25, 2024</p>
                <p>Introduction to our comprehensive mock test series for board exam preparation.</p>
                <p className="event-location">Abhishek Coaching Classes</p>
                <Link to="/events" className="btn btn-sm btn-outline">Register</Link>
              </div>
            </div>
            
            <div className="event-tile">
              <div className="event-tile-header">
                <h3>Parent-Teacher Meeting</h3>
                <span className="event-badge">Important</span>
              </div>
              <div className="event-tile-content">
                <p className="event-date">January 10, 2025</p>
                <p>Quarterly meeting to discuss student progress and address parent concerns.</p>
                <p className="event-location">Abhishek Coaching Classes</p>
                <Link to="/events" className="btn btn-sm btn-outline">Details</Link>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link to="/events" className="btn btn-primary">View All Events</Link>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2 className="cta-title">Ready to Start Your Success Journey?</h2>
            <p className="cta-text">Join Abhishek Coaching Classes and unlock your full potential with our expert guidance.</p>
            <div className="cta-buttons d-flex justify-content-center">
              <Link to="/admission" className="btn btn-primary mx-2">Apply Now</Link>
              <Link to="/contact" className="btn btn-outline mx-2">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
