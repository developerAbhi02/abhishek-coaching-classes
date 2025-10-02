import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, MapPin, BookOpen, CheckCircle, Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import admissionFormPdf from '../assets/ADMACC.pdf';

const Admission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/admissions', data);
      toast.success('Admission enquiry submitted successfully! We will contact you within 24-48 hours.');
      reset();
    } catch (error) {
      console.error('Admission submission error:', error);
      toast.error('Failed to submit admission enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white', paddingTop: '6rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Admission Enquiry</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Fill out the form below to express your interest in joining our coaching classes. We will contact you within 24-48 hours.
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href={admissionFormPdf}
              download
              className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'var(--color-primary)' }}
            >
              <Download size={18} />
              Download Admission Form (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="studentName">
                    <User size={16} style={{ marginRight: '0.5rem' }} />
                    Student Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    {...register('studentName', { required: 'Student name is required' })}
                    placeholder="Enter student's full name"
                  />
                  {errors.studentName && (
                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.studentName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="studentClass">
                    <BookOpen size={16} style={{ marginRight: '0.5rem' }} />
                    Class *
                  </label>
                  <select
                    id="studentClass"
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
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                  {errors.studentClass && (
                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.studentClass.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="batchSelection">
                    <BookOpen size={16} style={{ marginRight: '0.5rem' }} />
                    Batch Selection *
                  </label>
                  <select
                    id="batchSelection"
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
                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.batchSelection.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="parentName">
                    <User size={16} style={{ marginRight: '0.5rem' }} />
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    {...register('parentName', { required: 'Parent name is required' })}
                    placeholder="Enter parent/guardian name"
                  />
                  {errors.parentName && (
                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.parentName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact">
                    <Phone size={16} style={{ marginRight: '0.5rem' }} />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
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
                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.contact.message}</span>
                  )}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="address">
                    <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    rows="3"
                    {...register('address', { required: 'Address is required' })}
                    placeholder="Enter complete address with pincode"
                  />
                  {errors.address && (
                    <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.address.message}</span>
                  )}
                </div>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="mockTestParticipation"
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
                  {...register('consentGiven', { required: 'Consent is required' })}
                />
                <label htmlFor="consentGiven">
                  I agree to the terms and conditions and give consent for processing this enquiry *
                </label>
                {errors.consentGiven && (
                  <span style={{ color: 'red', fontSize: '0.9rem', display: 'block', marginTop: '0.5rem' }}>
                    {errors.consentGiven.message}
                  </span>
                )}
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  type="submit"
                  className="btn"
                  disabled={isSubmitting}
                  style={{ fontSize: '1.1rem', padding: '15px 40px' }}
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
