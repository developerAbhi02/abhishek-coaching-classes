import React from 'react';
import abhishekSir from '../assets/abhisheksir.png';
import shivamSir from '../assets/shivamsir.png';
const Faculty = () => {
  const faculties = [
    {
      name: 'Abhishek Kumar Gupta',
      qualification: 'MCA, Lovely Professional University (LPU)',
      photo: abhishekSir,
      bio: 'Founder and lead faculty with a passion for simplifying complex concepts and guiding students to excel.'
    },
    {
      name: 'Shivam Gupta',
      qualification: 'B.A., Banaras Hindu University (BHU)',
      photo: shivamSir,
      bio: 'Dedicated educator focused on building strong fundamentals and student confidence.'
    }
  ];

  return (
    <div>
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white', paddingTop: '6rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Our Faculty</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            Meet our dedicated team of educators committed to student success.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {faculties.map((f, idx) => (
              <div key={idx} className="course-card" style={{ textAlign: 'center', overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    boxShadow: '0 15px 35px rgba(22, 163, 74, 0.25)',
                    border: '6px solid rgba(22,163,74,0.15)',
                    overflow: 'hidden',
                    transform: 'translateY(0)',
                    transition: 'transform 220ms ease'
                  }}>
                    {f.photo ? (
                      <img src={f.photo} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#e5f6ec', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1f7a45' }}>
                        No Photo
                      </div>
                    )}
                  </div>
                  <h3 style={{ color: 'var(--color-primary)', margin: '1rem 0 0.25rem' }}>{f.name}</h3>
                  <p style={{ color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.5rem' }}>{f.qualification}</p>
                  <p style={{ color: 'var(--color-muted)', maxWidth: 520 }}>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;


