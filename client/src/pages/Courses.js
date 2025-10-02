import React, { useState, useEffect } from 'react';
import { Clock, Users, BookOpen, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to static data if API fails
      setCourses([
        {
          _id: '1',
          name: 'Lakshya 90',
          description: 'CBSE Class 10 Special Batch - Complete syllabus coverage with regular assessments',
          fee: 6000,
          duration: '1 Year',
          timing: '4 PM – 9 PM',
          features: ['Complete CBSE syllabus coverage', 'Regular assessments', 'Doubt clearing sessions', 'One-time payment']
        },
        {
          _id: '2',
          name: 'Sankalp',
          description: 'Navodaya Vidyalaya Preparation - Specialized coaching for entrance exams',
          fee: 15000,
          duration: '1-3 Years',
          timing: '4 PM – 9 PM',
          features: ['Class 3 Entry: ₹15,000 (3 years)', 'Class 4 Entry: ₹13,000 (2 years)', 'Class 5 Entry: ₹8,000 (1 year)', 'Specialized preparation']
        },
        {
          _id: '3',
          name: 'MIT30',
          description: 'Spoken English Mastery - Intensive 3-month course for English fluency',
          fee: 1499,
          duration: '3 Months',
          timing: '4 PM – 9 PM',
          features: ['3 months intensive course', 'Practical speaking sessions', 'Grammar fundamentals', 'One-time payment']
        },
        {
          _id: '4',
          name: 'MIB 1.0',
          description: 'Biology NCERT Mastery - Complete coverage of Class 11 & 12 Biology',
          fee: 4000,
          duration: 'Flexible',
          timing: '4 PM – 9 PM',
          features: ['Class 11 & 12 Biology', 'Complete NCERT coverage', 'Monthly or one-time payment', 'Conceptual clarity']
        },
        {
          _id: '5',
          name: 'Doubt Solving',
          description: 'Dedicated doubt-solving sessions every week to strengthen concepts and boost confidence',
          fee: 499,
          duration: 'Monthly',
          timing: '4 PM – 9 PM',
          features: ['Weekly doubt sessions', 'Personalized guidance', 'Concept revision', '₹499 per month']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatFee = (course) => {
    if (course.name === 'Sankalp') {
      return '₹8,000 - ₹15,000';
    } else if (course.name === 'MIB 1.0') {
      return '₹499/month or ₹4,000';
    } else if (course.name === 'Doubt Solving') {
      return '₹499/month';
    }
    return `₹${course.fee.toLocaleString()}`;
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
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Our Courses</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Choose from our comprehensive range of courses designed to help students excel in their academic journey.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <BookOpen size={24} style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }} />
                  <h3>{course.name}</h3>
                </div>
                
                <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>{course.description}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Clock size={16} style={{ color: 'var(--color-muted)', marginRight: '0.5rem' }} />
                  <span className="course-timing">{course.timing}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Users size={16} style={{ color: 'var(--color-muted)', marginRight: '0.5rem' }} />
                  <span style={{ color: 'var(--color-muted)' }}>Duration: {course.duration}</span>
                </div>
                
                <div className="course-fee">{formatFee(course)}</div>
                
                {course.features && (
                  <ul className="course-features">
                    {course.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
                
                <div style={{ marginTop: '1.5rem' }}>
                  <a href="/admission" className="btn" style={{ width: '100%', textAlign: 'center' }}>
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Test Section */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Mock Test Program</h2>
            <div className="course-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Enhance Your Preparation</h3>
              <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                Join our monthly mock test program to assess your progress and identify areas for improvement.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="course-card" style={{ textAlign: 'center', padding: '1rem' }}>
                  <CheckCircle size={24} style={{ color: '#28a745', marginBottom: '0.5rem' }} />
                  <strong>₹300/month</strong>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>Affordable pricing</p>
                </div>
                <div className="course-card" style={{ textAlign: 'center', padding: '1rem' }}>
                  <Users size={24} style={{ color: '#28a745', marginBottom: '0.5rem' }} />
                  <strong>Offline Mode</strong>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>At coaching center</p>
                </div>
                <div className="course-card" style={{ textAlign: 'center', padding: '1rem' }}>
                  <BookOpen size={24} style={{ color: '#28a745', marginBottom: '0.5rem' }} />
                  <strong>Monthly Tests</strong>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>Regular assessment</p>
                </div>
              </div>
              
              <a href="/admission" className="btn">
                Enroll for Mock Tests
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Terms & Conditions</h2>
            <div className="course-card" style={{ padding: '2rem' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Fees must be paid between 1st–5th of every month (for monthly batches)
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  If a student leaves within 15 days, half-month fee will be charged
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  If a student leaves after 15 days, full-month fee will be charged
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Mock test fee: ₹300/month (optional)
                </li>
                <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  One-time fees are non-refundable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
