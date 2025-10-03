import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [admissions, setAdmissions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', fee: '', duration: '', timing: '' });
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', fee: '' });
  const [newResource, setNewResource] = useState({ title: '', subtitle: '', content: '', category: 'notes' });
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editingResource, setEditingResource] = useState({ title: '', subtitle: '', content: '', category: 'notes' });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingCourse, setEditingCourse] = useState({ name: '', description: '', fee: '', duration: '', timing: '' });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState({ title: '', description: '', date: '', location: '', fee: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Verify token validity by making an authenticated request
    const verifyAuth = async () => {
      try {
        await api.get('/api/admissions');
        fetchAllData();
      } catch (error) {
        // If token is invalid, the interceptor will handle redirection
        console.error('Authentication error:', error);
      }
    };
    
    verifyAuth();
    document.body.classList.add('has-admin-sidebar');
    return () => {
      document.body.classList.remove('has-admin-sidebar');
    };
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [admissionsRes, coursesRes, eventsRes, resourcesRes] = await Promise.all([
        api.get('/api/admissions'),
        api.get('/api/courses'),
        api.get('/api/events'),
        api.get('/api/resources')
      ]);
      
      setAdmissions(admissionsRes.data);
      setCourses(coursesRes.data);
      setEvents(eventsRes.data);
      setResources(resourcesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const updateAdmissionStatus = async (id, status) => {
    try {
      await api.put(`/api/admissions/${id}`, { status });
      setAdmissions(admissions.map(adm => 
        adm._id === id ? { ...adm, status } : adm
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'contacted': return '#17a2b8';
      case 'enrolled': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Create Resource (text-based)
  const submitResource = async (e) => {
    e.preventDefault();
    try {
      const resourceData = {
        title: newResource.title,
        subtitle: newResource.subtitle,
        category: newResource.category,
        content: newResource.content
      };

      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resourceData)
      });

      if (!response.ok) {
        throw new Error('Failed to create resource');
      }

      const data = await response.json();
      setResources([data, ...resources]);
      setNewResource({ title: '', subtitle: '', content: '', category: 'notes' });
      setShowAddResource(false);
      toast.success('Resource created successfully');
    } catch (error) {
      console.error('Error creating resource:', error);
      toast.error('Failed to create resource');
    }
  };

  const deleteResource = async (id) => {
    try {
      await api.delete(`/api/resources/${id}`);
      setResources(resources.filter(r => r._id !== id));
      toast.success('Resource deleted');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete');
    }
  };

  const startEditResource = (resource) => {
    setEditingResourceId(resource._id);
    setEditingResource({
      title: resource.title || '',
      subtitle: resource.subtitle || '',
      content: resource.content || '',
      category: resource.category || 'notes'
    });
  };

  const saveResourceEdit = async (e) => {
    e.preventDefault();
    try {
      const resourceData = {
        title: editingResource.title,
        subtitle: editingResource.subtitle,
        content: editingResource.content,
        category: editingResource.category
      };

      const response = await fetch(`/api/resources/${editingResourceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resourceData)
      });

      if (!response.ok) {
        throw new Error('Failed to update resource');
      }

      const updatedResource = await response.json();
      setResources(resources.map(r => r._id === editingResourceId ? updatedResource : r));
      setEditingResourceId(null);
      toast.success('Resource updated successfully');
    } catch (error) {
      console.error('Error updating resource:', error);
      toast.error('Failed to update resource');
    }
  };

  const cancelResourceEdit = () => {
    setEditingResourceId(null);
  };

  const deleteCourse = async (id) => {
    try {
      await api.delete(`/api/courses/${id}`);
      setCourses(courses.filter(c => c._id !== id));
      toast.success('Course deleted');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete');
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newCourse, fee: Number(newCourse.fee) };
      const res = await api.post('/api/courses', payload);
      setCourses([res.data, ...courses]);
      setShowAddCourse(false);
      setNewCourse({ name: '', description: '', fee: '', duration: '', timing: '' });
      toast.success('Course added');
    } catch (e) {
      console.error(e);
      toast.error('Failed to add course');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/api/events/${id}`);
      setEvents(events.filter(ev => ev._id !== id));
      toast.success('Event deleted');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete');
    }
  };

  const startEditCourse = (course) => {
    setEditingCourseId(course._id);
    setEditingCourse({
      name: course.name || '',
      description: course.description || '',
      fee: String(course.fee || ''),
      duration: course.duration || '',
      timing: course.timing || ''
    });
  };

  const saveCourseEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...editingCourse, fee: Number(editingCourse.fee) };
      const res = await api.put(`/api/courses/${editingCourseId}`, payload);
      setCourses(courses.map(c => c._id === editingCourseId ? res.data : c));
      setEditingCourseId(null);
      toast.success('Course updated');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update course');
    }
  };

  const cancelCourseEdit = () => {
    setEditingCourseId(null);
  };

  const startEditEvent = (event) => {
    setEditingEventId(event._id);
    setEditingEvent({
      title: event.title || '',
      description: event.description || '',
      date: event.date ? String(event.date).slice(0,10) : '',
      location: event.location || '',
      fee: String(event.fee || '')
    });
  };

  const saveEventEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...editingEvent, fee: Number(editingEvent.fee) || 0 };
      const res = await api.put(`/api/events/${editingEventId}`, payload);
      setEvents(events.map(ev => ev._id === editingEventId ? res.data : ev));
      setEditingEventId(null);
      toast.success('Event updated');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update event');
    }
  };

  const cancelEventEdit = () => {
    setEditingEventId(null);
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newEvent, fee: Number(newEvent.fee) || 0 };
      const res = await api.post('/api/events', payload);
      setEvents([res.data, ...events]);
      setShowAddEvent(false);
      setNewEvent({ title: '', description: '', date: '', location: '', fee: '' });
      toast.success('Event added');
    } catch (e) {
      console.error(e);
      toast.error('Failed to add event');
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className={`admin-sidebar${isSidebarCollapsed ? ' collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <BarChart3 size={24} />
            <span>ACC Admin</span>
          </div>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="admin-sidebar-toggle"
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <ul className="admin-nav">
          <li className="admin-nav-item">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
              className={`admin-nav-link${activeTab === 'overview' ? ' active' : ''}`}
            >
              <BarChart3 size={18} />
              <span>Overview</span>
            </a>
          </li>
          <li className="admin-nav-item">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('admissions'); }}
              className={`admin-nav-link${activeTab === 'admissions' ? ' active' : ''}`}
            >
              <Users size={18} />
              <span>Admissions ({admissions.length})</span>
            </a>
          </li>
          <li className="admin-nav-item">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('courses'); }}
              className={`admin-nav-link${activeTab === 'courses' ? ' active' : ''}`}
            >
              <BookOpen size={18} />
              <span>Courses ({courses.length})</span>
            </a>
          </li>
          <li className="admin-nav-item">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('events'); }}
              className={`admin-nav-link${activeTab === 'events' ? ' active' : ''}`}
            >
              <Calendar size={18} />
              <span>Events ({events.length})</span>
            </a>
          </li>
          <li className="admin-nav-item">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('resources'); }}
              className={`admin-nav-link${activeTab === 'resources' ? ' active' : ''}`}
            >
              <FileText size={18} />
              <span>Resources ({resources.length})</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }} />
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className={`admin-main${isSidebarCollapsed ? ' collapsed' : ''}`}>
        <div className="admin-header">
          <h1 className="admin-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h1>
          <div className="admin-user-section">
            <span className="admin-username">
              Welcome, {JSON.parse(localStorage.getItem('adminUser') || '{}').username}
            </span>
            <button onClick={handleLogout} className="admin-btn admin-btn-danger">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="admin-grid">
              {/* Total Admissions Card */}
              <div className="admin-card admin-stat-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Total Admissions</h3>
                  <div className="admin-card-icon">
                    <Users size={20} />
                  </div>
                </div>
                <p className="admin-stat-value">{admissions.length}</p>
                <p className="admin-stat-detail">
                  {admissions.filter(a => a.status === 'pending').length} pending applications
                </p>
              </div>

              {/* Active Courses Card */}
              <div className="admin-card admin-stat-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Active Courses</h3>
                  <div className="admin-card-icon">
                    <BookOpen size={20} />
                  </div>
                </div>
                <p className="admin-stat-value">{courses.length}</p>
                <p className="admin-stat-detail">
                  {courses.reduce((total, course) => total + (course.enrollments || 0), 0)} total enrollments
                </p>
              </div>

              <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Calendar size={24} style={{ color: '#ffc107', marginRight: '0.5rem' }} />
                  <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Upcoming Events</h3>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
                  {events.length}
                </div>
                <p style={{ color: 'var(--color-muted)', margin: '0.5rem 0 0' }}>
                  Events scheduled
                </p>
              </div>

              <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <FileText size={24} style={{ color: '#dc3545', marginRight: '0.5rem' }} />
                  <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Study Resources</h3>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
                  {resources.length}
                </div>
                <p style={{ color: 'var(--color-muted)', margin: '0.5rem 0 0' }}>
                  Resources available
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Recent Admissions</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Batch</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Contact</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissions.slice(0, 5).map((admission) => (
                      <tr key={admission._id}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.studentName}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.studentClass}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.batchSelection}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.contact}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.8rem',
                            background: getStatusColor(admission.status),
                            color: 'white'
                          }}>
                            {admission.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{formatDate(admission.submittedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Admissions Tab */}
        {activeTab === 'admissions' && (
          <div>
            <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>All Admission Enquiries</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Batch</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Parent</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Contact</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Mock Test</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissions.map((admission) => (
                      <tr key={admission._id}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.studentName}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.studentClass}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.batchSelection}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.parentName}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{admission.contact}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          {admission.mockTestParticipation ? 'Yes' : 'No'}
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          <select 
                            value={admission.status}
                            onChange={(e) => updateAdmissionStatus(admission._id, e.target.value)}
                            style={{ 
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '4px', 
                              border: '1px solid #dee2e6',
                              background: getStatusColor(admission.status),
                              color: 'white'
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                          <button 
                            onClick={() => alert(`Address: ${admission.address}`)}
                            style={{ 
                              background: '#17a2b8', 
                              color: 'white', 
                              border: 'none', 
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '4px',
                              cursor: 'pointer',
                              marginRight: '0.5rem'
                            }}
                          >
                            <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Course Management</h3>
                <button className="btn" onClick={() => setShowAddCourse(true)}>
                  <Plus size={16} style={{ marginRight: '0.5rem' }} />
                  Add Course
                </button>
              </div>
              {showAddCourse && (
                <form onSubmit={addCourse} style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                  <input required placeholder="Name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
                  <input required placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
                  <input required type="number" placeholder="Fee" value={newCourse.fee} onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })} />
                  <input placeholder="Duration" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} />
                  <input placeholder="Timing" value={newCourse.timing} onChange={(e) => setNewCourse({ ...newCourse, timing: e.target.value })} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => setShowAddCourse(false)}>Cancel</button>
                  </div>
                </form>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {courses.map((course) => (
                  <div key={course._id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '1rem' }}>
                    {editingCourseId === course._id ? (
                      <form onSubmit={saveCourseEdit} style={{ display: 'grid', gap: '0.5rem' }}>
                        <input required placeholder="Name" value={editingCourse.name} onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })} />
                        <input required placeholder="Description" value={editingCourse.description} onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })} />
                        <input required type="number" placeholder="Fee" value={editingCourse.fee} onChange={(e) => setEditingCourse({ ...editingCourse, fee: e.target.value })} />
                        <input placeholder="Duration" value={editingCourse.duration} onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })} />
                        <input placeholder="Timing" value={editingCourse.timing} onChange={(e) => setEditingCourse({ ...editingCourse, timing: e.target.value })} />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn" type="submit">Save</button>
                          <button className="btn btn-secondary" type="button" onClick={cancelCourseEdit}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{course.name}</h4>
                        <p style={{ color: '#666', marginBottom: '0.5rem' }}>{course.description}</p>
                        <p style={{ fontWeight: 'bold', color: '#28a745' }}>₹{Number(course.fee).toLocaleString()}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Duration: {course.duration}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Timing: {course.timing}</p>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" onClick={() => startEditCourse(course)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <Edit size={14} style={{ marginRight: '0.25rem' }} />
                            Edit
                          </button>
                          <button className="btn btn-secondary" onClick={() => deleteCourse(course._id)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', background: '#dc3545' }}>
                            <Trash2 size={14} style={{ marginRight: '0.25rem' }} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Event Management</h3>
                <button className="btn" onClick={() => setShowAddEvent(true)}>
                  <Plus size={16} style={{ marginRight: '0.5rem' }} />
                  Add Event
                </button>
              </div>
              {showAddEvent && (
                <form onSubmit={addEvent} style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                  <input required placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                  <input required placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                  <input required type="date" placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                  <input placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
                  <input type="number" placeholder="Fee (optional)" value={newEvent.fee} onChange={(e) => setNewEvent({ ...newEvent, fee: e.target.value })} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => setShowAddEvent(false)}>Cancel</button>
                  </div>
                </form>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {events.map((event) => (
                  <div key={event._id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '1rem' }}>
                    {editingEventId === event._id ? (
                      <form onSubmit={saveEventEdit} style={{ display: 'grid', gap: '0.5rem' }}>
                        <input required placeholder="Title" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} />
                        <input required placeholder="Description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                        <input required type="date" placeholder="Date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                        <input placeholder="Location" value={editingEvent.location} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })} />
                        <input type="number" placeholder="Fee (optional)" value={editingEvent.fee} onChange={(e) => setEditingEvent({ ...editingEvent, fee: e.target.value })} />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn" type="submit">Save</button>
                          <button className="btn btn-secondary" type="button" onClick={cancelEventEdit}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{event.title}</h4>
                        <p style={{ color: '#666', marginBottom: '0.5rem' }}>{event.description}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Date: {formatDate(event.date)}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Location: {event.location}</p>
                        {event.fee > 0 && (
                          <p style={{ fontWeight: 'bold', color: '#28a745' }}>Fee: ₹{event.fee}</p>
                        )}
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" onClick={() => startEditEvent(event)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <Edit size={14} style={{ marginRight: '0.25rem' }} />
                            Edit
                          </button>
                          <button className="btn btn-secondary" onClick={() => deleteEvent(event._id)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', background: '#dc3545' }}>
                            <Trash2 size={14} style={{ marginRight: '0.25rem' }} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <div style={{ background: 'var(--color-card)', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-text)' }}>Resource Management</h3>
                <button className="btn" onClick={() => setShowAddResource(true)}>
                  <Plus size={16} style={{ marginRight: '0.5rem' }} />
                  Add Resource
                </button>
              </div>
              {showAddResource && (
                <form onSubmit={submitResource} style={{ display: 'grid', gap: '1rem', marginBottom: '1rem', width: '100%' }}>
                  <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                    <input required placeholder="Title" value={newResource.title} onChange={(e) => setNewResource({ ...newResource, title: e.target.value })} />
                    <input required placeholder="Subtitle" value={newResource.subtitle} onChange={(e) => setNewResource({ ...newResource, subtitle: e.target.value })} />
                    <select value={newResource.category} onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}>
                      <option value="notes">Notes</option>
                      <option value="sample-papers">Sample Papers</option>
                      <option value="syllabus">Syllabus</option>
                      <option value="announcements">Announcements</option>
                    </select>
                  </div>
                  <textarea 
                    required 
                    placeholder="Content" 
                    value={newResource.content} 
                    onChange={(e) => setNewResource({ ...newResource, content: e.target.value })}
                    style={{ minHeight: '150px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #dee2e6' }}
                  />
                  <div>
                    <button type="submit" className="btn">
                      <Plus size={16} style={{ marginRight: '0.5rem' }} />
                      Create Resource
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={() => setShowAddResource(false)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {resources.map((resource) => (
                <div key={resource._id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '1rem' }}>
                  {editingResourceId === resource._id ? (
                      <form onSubmit={saveResourceEdit} style={{ display: 'grid', gap: '1rem' }}>
                        <input required placeholder="Title" value={editingResource.title} onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })} />
                        <input required placeholder="Subtitle" value={editingResource.subtitle} onChange={(e) => setEditingResource({ ...editingResource, subtitle: e.target.value })} />
                        <select value={editingResource.category} onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value })}>
                          <option value="notes">Notes</option>
                          <option value="sample-papers">Sample Papers</option>
                          <option value="syllabus">Syllabus</option>
                          <option value="announcements">Announcements</option>
                        </select>
                        <textarea 
                          required 
                          placeholder="Content" 
                          value={editingResource.content} 
                          onChange={(e) => setEditingResource({ ...editingResource, content: e.target.value })}
                          style={{ minHeight: '150px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #dee2e6' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn" type="submit">Save</button>
                          <button className="btn btn-secondary" type="button" onClick={cancelResourceEdit}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{resource.title}</h4>
                        <p style={{ color: '#666', marginBottom: '0.5rem' }}>{resource.subtitle}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Category: {resource.category}</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Created: {formatDate(resource.createdAt)}</p>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" onClick={() => startEditResource(resource)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <Edit size={14} style={{ marginRight: '0.25rem' }} />
                            Edit
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', background: '#dc3545' }} onClick={() => deleteResource(resource._id)}>
                            <Trash2 size={14} style={{ marginRight: '0.25rem' }} />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
