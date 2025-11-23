import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Calendar, Filter, Eye } from 'lucide-react';

// Move static resources to module scope to satisfy exhaustive-deps
const STATIC_RESOURCES = [
  {
    _id: '1',
    title: 'CBSE Class 10 Mathematics Notes',
    description: 'Comprehensive notes covering all chapters of CBSE Class 10 Mathematics syllabus',
    fileType: 'pdf',
    category: 'notes',
    fileUrl: '#',
    createdAt: new Date('2024-11-01')
  },
  {
    _id: '2',
    title: 'Sample Paper - Mathematics Class 10',
    description: 'Latest CBSE sample paper for Mathematics Class 10 with marking scheme',
    fileType: 'pdf',
    category: 'sample-papers',
    fileUrl: '#',
    createdAt: new Date('2024-11-05')
  },
  {
    _id: '3',
    title: 'Navodaya Vidyalaya Syllabus',
    description: 'Complete syllabus for Navodaya Vidyalaya entrance examination',
    fileType: 'pdf',
    category: 'syllabus',
    fileUrl: '#',
    createdAt: new Date('2024-11-10')
  },
  {
    _id: '4',
    title: 'Important Announcement - Mock Tests',
    description: 'Schedule and guidelines for upcoming mock test series',
    fileType: 'pdf',
    category: 'announcements',
    fileUrl: '#',
    createdAt: new Date('2024-11-15')
  },
  {
    _id: '5',
    title: 'Biology NCERT Solutions',
    description: 'Detailed solutions for NCERT Biology textbook questions',
    fileType: 'pdf',
    category: 'notes',
    fileUrl: '#',
    createdAt: new Date('2024-11-20')
  }
];

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'notes', label: 'Study Notes' },
    { value: 'sample-papers', label: 'Sample Papers' },
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'announcements', label: 'Announcements' }
  ];

  // Removed local STATIC_RESOURCES; using module-scoped constant
  useEffect(() => {
    setResources(STATIC_RESOURCES);
    setLoading(false);
  }, []);

  const visibleResources = useMemo(() => {
    if (selectedCategory === 'all') return resources;
    return resources.filter(resource => resource.category === selectedCategory);
  }, [resources, selectedCategory]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      default:
        return '📁';
    }
  };

  const [viewingResource, setViewingResource] = useState(null);

  const handleView = (resource) => {
    setViewingResource(resource);
  };

  const closeResourceView = () => {
    setViewingResource(null);
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
      {/* Resource View Modal */}
      {viewingResource && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '8px',
            padding: '2rem',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>{viewingResource.title}</h2>
              <button 
                onClick={closeResourceView}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer',
                  color: 'var(--text-color)'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Description:</h4>
              <p>{viewingResource.description}</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Content:</h4>
              <div style={{ 
                backgroundColor: 'rgba(0, 20, 0, 0.5)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6'
              }}>
                {viewingResource.content || "This resource doesn't have any text content to display."}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={closeResourceView}
                className="btn"
                style={{ backgroundColor: '#666' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)', color: 'white', paddingTop: '6rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>Study Resources</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Access our comprehensive collection of study materials, sample papers, and important announcements to support your learning journey.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Filter size={20} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontWeight: '600', color: '#333' }}>Filter by Category:</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: selectedCategory === category.value ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                      borderRadius: '20px',
                      background: selectedCategory === category.value ? 'var(--color-primary)' : 'transparent',
                      color: selectedCategory === category.value ? 'white' : 'var(--color-text)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          {visibleResources.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <FileText size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
              <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Resources Found</h3>
              <p style={{ color: '#999' }}>No resources available in this category. Check back later for updates.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {visibleResources.map((resource) => (
                <div key={resource._id} className="course-card">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', marginRight: '0.5rem' }}>
                      {getFileIcon(resource.fileType)}
                    </span>
                    <h3 style={{ margin: 0 }}>{resource.title}</h3>
                  </div>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{resource.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#999', fontSize: '0.9rem' }}>
                    <Calendar size={16} style={{ marginRight: '0.5rem' }} />
                    <span>{formatDate(resource.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button className="btn" onClick={() => handleView(resource)}>
                      <Eye size={16} style={{ marginRight: '0.5rem' }} />
                      View
                    </button>
                    <a
                      href={resource.fileUrl || '#'}
                      className="btn btn-secondary"
                      aria-label={`Download ${resource.title}`}
                    >
                      <FileText size={16} style={{ marginRight: '0.5rem' }} />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Guidelines */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Resource Guidelines</h2>
            <div className="course-card" style={{ padding: '2rem' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  All resources are provided for educational purposes.
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  Please do not redistribute resources without permission.
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
                  For any issues or requests, contact the administration.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
