import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, MapPin, BookOpen, CheckCircle, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import admissionFormPdf from '../assets/ADMACC.pdf';

const Admission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Send to external form provider (Zoho/Google) or prompt user to use the official form link
      // Here we simply show success and instruct the user.
      toast.success('Submitted locally. Please complete the official Zoho/Google form for processing.');
      reset();
    } catch (error) {
      console.error('Admission submission error:', error);
      toast.error('Failed to submit enquiry locally. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="section admission-hero">
        <div className="container">
          <h1 className="section-title">Admission Enquiry</h1>
          <p className="section-description">
            Fill out the form below to express your interest in joining our coaching classes. We will contact you within 24-48 hours.
          </p>
          <div className="download-btn-container">
            <a
              href="https://forms.zohopublic.com/abhishekcoachingclasses/form/AdmissionEnquiry/formperma/sample_form_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <CheckCircle size={18} />
              Fill out this form to get contacted within 24 to 48 hours
            </a>
            <a
              href={admissionFormPdf}
              download
              className="btn btn-light"
            >
              <Download size={18} />
              Download Admission Form (PDF) - For already contacted students
            </a>
          </div>
        </div>
      </section>
      
      {/* Student Enquiry Form */}
      <section className="section enquiry-form-section">
        <div className="container">
          <h2 className="section-title">Quick Enquiry Form</h2>
          <p className="section-description">
            Fill out this quick form to get information about our courses. We'll contact you shortly.
          </p>
          <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={18} />
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Your phone number"
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                      }
                    })}
                  />
                </div>
                {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="course">Course of Interest</label>
                <div className="input-with-icon">
                  <BookOpen size={18} />
                  <select
                    id="course"
                    {...register("course", { required: "Please select a course" })}
                  >
                    <option value="">Select a course</option>
                    <option value="Lakshya 90">Lakshya 90 (CBSE Class 10)</option>
                    <option value="Sankalp">Sankalp (Classes 3-5)</option>
                    <option value="MIT30">MIT30 (Spoken English)</option>
                    <option value="MIB 1.0">MIB 1.0 (Biology NCERT)</option>
                  </select>
                </div>
                {errors.course && <span className="error-message">{errors.course.message}</span>}
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  placeholder="Any specific questions or requirements?"
                  rows="3"
                  {...register("message")}
                ></textarea>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </section>
      
      {/* Courses Section in Tiled Format */}
      <section className="section courses-section">
        <div className="container">
          <h2 className="section-title">Available Courses</h2>
          <div className="courses-tiles">
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>Lakshya 90</h3>
                <span className="course-badge">CBSE Class 10</span>
              </div>
              <div className="course-tile-content">
                <p>Comprehensive preparation for CBSE Class 10 board exams with focus on scoring 90+ marks.</p>
              </div>
            </div>
            
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>Sankalp</h3>
                <span className="course-badge">Classes 3-5</span>
              </div>
              <div className="course-tile-content">
                <p>Foundation course for primary school students with focus on building strong basics.</p>
              </div>
            </div>
            
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>MIT30</h3>
                <span className="course-badge">Spoken English</span>
              </div>
              <div className="course-tile-content">
                <p>Enhance your English speaking skills with our specialized 30-day intensive program.</p>
              </div>
            </div>
            
            <div className="course-tile">
              <div className="course-tile-header">
                <h3>MIB 1.0</h3>
                <span className="course-badge">Biology NCERT</span>
              </div>
              <div className="course-tile-content">
                <p>Specialized Biology course focusing on NCERT curriculum with practical applications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-card">
            <h2 className="form-title">Student Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="studentName">
                    <User size={16} className="form-icon" />
                    Student Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    className="form-input"
                    {...register('studentName', { required: 'Student name is required' })}
                    placeholder="Enter student's full name"
                  />
                  {errors.studentName && (
                    <span className="form-error">{errors.studentName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="studentClass">
                    <BookOpen size={16} className="form-icon" />
                    Class *
                  </label>
                  <select
                    id="studentClass"
                    className="form-select class-select"
                    {...register('studentClass', { required: 'Class is required' })}
                  >
                    <option value="">Select Class</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                  {errors.studentClass && (
                    <span className="form-error">{errors.studentClass.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="batchSelection">
                    <BookOpen size={16} className="form-icon" />
                    Batch Selection *
                  </label>
                  <select
                    id="batchSelection"
                    className="form-select batch-select"
                    {...register('batchSelection', { required: 'Batch selection is required' })}
                  >
                    <option value="">Select Batch</option>
                    <option value="Lakshya 90">Lakshya 90 (CBSE Class 10)</option>
                    <option value="Sankalp Class 3">Sankalp Class 3 Entry</option>
                    <option value="Sankalp Class 4">Sankalp Class 4 Entry</option>
                    <option value="Sankalp Class 5">Sankalp Class 5 Entry</option>
                    <option value="MIT30">MIT30 (Spoken English)</option>
                    <option value="MIB 1.0">MIB 1.0 (Biology NCERT)</option>
                  </select>
                  {errors.batchSelection && (
                    <span className="form-error">{errors.batchSelection.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="parentName">
                    <User size={16} className="form-icon" />
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    className="form-input"
                    {...register('parentName', { required: 'Parent name is required' })}
                    placeholder="Enter parent/guardian name"
                  />
                  {errors.parentName && (
                    <span className="form-error">{errors.parentName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact">
                    <Phone size={16} className="form-icon" />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    className="form-input"
                    {...register('contact', { 
                      required: 'Contact number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit mobile number'
                      }
                    })}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.contact && (
                    <span className="form-error">{errors.contact.message}</span>
                  )}
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="address">
                    <MapPin size={16} className="form-icon" />
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    rows="3"
                    className="form-textarea"
                    {...register('address', { required: 'Address is required' })}
                    placeholder="Enter complete address with pincode"
                  />
                  {errors.address && (
                    <span className="form-error">{errors.address.message}</span>
                  )}
                </div>
              </div>

              <div className="checkbox-container">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="mockTestParticipation"
                    className="form-checkbox"
                    {...register('mockTestParticipation')}
                  />
                  <label htmlFor="mockTestParticipation">
                    I would like to participate in monthly mock tests (₹300/month)
                  </label>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="consentGiven"
                    className="form-checkbox"
                    {...register('consentGiven', { required: 'Consent is required' })}
                  />
                  <label htmlFor="consentGiven">
                    I agree to the terms and conditions and give consent for processing this enquiry *
                  </label>
                  {errors.consentGiven && (
                    <span className="form-error">{errors.consentGiven.message}</span>
                  )}
                </div>
              </div>

              <div className="form-submit">
                <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Course Information */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <h2 className="section-title">Course Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="course-card">
              <h3>Lakshya 90</h3>
              <p style={{ marginBottom: '1rem' }}>CBSE Class 10 Special Batch</p>
              <div className="course-fee">₹6,000</div>
              <p style={{ color: '#666' }}>One-time payment for complete 1-year course</p>
            </div>

            <div className="course-card">
              <h3>Sankalp</h3>
              <p style={{ marginBottom: '1rem' }}>Navodaya Vidyalaya Preparation</p>
              <div className="course-fee">₹8,000 - ₹15,000</div>
              <p style={{ color: '#666' }}>Class-wise pricing for specialized preparation</p>
            </div>

            <div className="course-card">
              <h3>MIT30</h3>
              <p style={{ marginBottom: '1rem' }}>Spoken English Mastery</p>
              <div className="course-fee">₹1,499</div>
              <p style={{ color: '#666' }}>3-month intensive course</p>
            </div>

            <div className="course-card">
              <h3>MIB 1.0</h3>
              <p style={{ marginBottom: '1rem' }}>Biology NCERT Mastery</p>
              <div className="course-fee">₹499/month or ₹4,000</div>
              <p style={{ color: '#666' }}>Flexible payment options</p>
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
                  <CheckCircle size={16} style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }} />
                  Fees must be paid between 1st–5th of every month (for monthly batches)
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <CheckCircle size={16} style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }} />
                  If a student leaves within 15 days, half-month fee will be charged
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <CheckCircle size={16} style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }} />
                  If a student leaves after 15 days, full-month fee will be charged
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <CheckCircle size={16} style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }} />
                  Mock test fee: ₹300/month (optional)
                </li>
                <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                  <CheckCircle size={16} style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }} />
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

export default Admission;
