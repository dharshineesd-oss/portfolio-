import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Project,
  Skill,
  Education,
  Certification,
  Experience,
  ContactMessage
} from '../types/portfolio.types';
import {
  projectsApi,
  skillsApi,
  educationApi,
  certificationsApi,
  experienceApi,
  contactApi
} from '../services/api';

const DEFAULT_ADMIN_SECRET = 'portfolio-admin-secret-2026';

export const AdminDashboard: React.FC = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'projects' | 'skills' | 'education' | 'certifications' | 'experience' | 'messages'
  >('projects');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Loading & Action feedback
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  // Modal / Form state
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    image: ''
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    level: 85
  });

  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    description: ''
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    image: ''
  });

  const [expForm, setExpForm] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: 'Present',
    description: '',
    technologies: ''
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('portfolio_admin_token');
    if (savedToken === DEFAULT_ADMIN_SECRET) {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_ADMIN_SECRET) {
      localStorage.setItem('portfolio_admin_token', passcode.trim());
      setIsAuthenticated(true);
      setAuthError('');
      fetchAllData();
    } else {
      setAuthError('Invalid passcode! Use the default key: portfolio-admin-secret-2026');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projData, skillData, eduData, certData, expData, msgData] = await Promise.all([
        projectsApi.getAll(),
        skillsApi.getAll(),
        educationApi.getAll(),
        certificationsApi.getAll(),
        experienceApi.getAll(),
        contactApi.getAll()
      ]);
      setProjects(projData);
      setSkills(skillData);
      setEducationList(eduData);
      setCertifications(certData);
      setExperiences(expData);
      setMessages(msgData);
    } catch (err) {
      console.error('Failed to load portfolio data for admin', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setProjectForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', image: '' });
    setSkillForm({ name: '', category: 'Frontend', level: 85 });
    setEduForm({ institution: '', degree: '', field: '', startYear: '', endYear: '', description: '' });
    setCertForm({ title: '', issuer: '', issueDate: '', credentialUrl: '', image: '' });
    setExpForm({ company: '', position: '', startDate: '', endDate: 'Present', description: '', technologies: '' });
    setShowModal(true);
  };

  // ============ PROJECTS CRUD ============
  const handleEditProject = (item: Project) => {
    setEditingId(item._id);
    setProjectForm({
      title: item.title,
      description: item.description,
      technologies: item.technologies.join(', '),
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      image: item.image || ''
    });
    setShowModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl,
        image: projectForm.image
      };

      if (editingId) {
        await projectsApi.update(editingId, payload);
        setAlert({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await projectsApi.create(payload);
        setAlert({ type: 'success', text: 'New project created successfully!' });
      }
      setShowModal(false);
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: err.response?.data?.message || 'Error saving project' });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsApi.delete(id);
      setAlert({ type: 'success', text: 'Project deleted successfully!' });
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error deleting project' });
    }
  };

  // ============ SKILLS CRUD ============
  const handleEditSkill = (item: Skill) => {
    setEditingId(item._id);
    setSkillForm({
      name: item.name,
      category: item.category,
      level: item.level
    });
    setShowModal(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await skillsApi.update(editingId, skillForm);
        setAlert({ type: 'success', text: 'Skill updated successfully!' });
      } else {
        await skillsApi.create(skillForm);
        setAlert({ type: 'success', text: 'Skill created successfully!' });
      }
      setShowModal(false);
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error saving skill' });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await skillsApi.delete(id);
      setAlert({ type: 'success', text: 'Skill deleted successfully!' });
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error deleting skill' });
    }
  };

  // ============ EDUCATION CRUD ============
  const handleEditEducation = (item: Education) => {
    setEditingId(item._id);
    setEduForm({
      institution: item.institution,
      degree: item.degree,
      field: item.field,
      startYear: item.startYear,
      endYear: item.endYear,
      description: item.description || ''
    });
    setShowModal(true);
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await educationApi.update(editingId, eduForm);
        setAlert({ type: 'success', text: 'Education updated successfully!' });
      } else {
        await educationApi.create(eduForm);
        setAlert({ type: 'success', text: 'Education created successfully!' });
      }
      setShowModal(false);
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error saving education record' });
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await educationApi.delete(id);
      setAlert({ type: 'success', text: 'Education record deleted successfully!' });
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error deleting education record' });
    }
  };

  // ============ CERTIFICATIONS CRUD ============
  const handleEditCert = (item: Certification) => {
    setEditingId(item._id);
    setCertForm({
      title: item.title,
      issuer: item.issuer,
      issueDate: item.issueDate,
      credentialUrl: item.credentialUrl || '',
      image: item.image || ''
    });
    setShowModal(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await certificationsApi.update(editingId, certForm);
        setAlert({ type: 'success', text: 'Certification updated successfully!' });
      } else {
        await certificationsApi.create(certForm);
        setAlert({ type: 'success', text: 'Certification created successfully!' });
      }
      setShowModal(false);
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error saving certification' });
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await certificationsApi.delete(id);
      setAlert({ type: 'success', text: 'Certification deleted!' });
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error deleting certification' });
    }
  };

  // ============ EXPERIENCE CRUD ============
  const handleEditExp = (item: Experience) => {
    setEditingId(item._id);
    setExpForm({
      company: item.company,
      position: item.position,
      startDate: item.startDate,
      endDate: item.endDate || 'Present',
      description: item.description || '',
      technologies: (item.technologies || []).join(', ')
    });
    setShowModal(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...expForm,
        technologies: expForm.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      };
      if (editingId) {
        await experienceApi.update(editingId, payload);
        setAlert({ type: 'success', text: 'Experience entry updated successfully!' });
      } else {
        await experienceApi.create(payload);
        setAlert({ type: 'success', text: 'Experience entry created successfully!' });
      }
      setShowModal(false);
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error saving experience' });
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await experienceApi.delete(id);
      setAlert({ type: 'success', text: 'Experience entry deleted!' });
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error deleting experience entry' });
    }
  };

  // ============ CONTACT MESSAGES ============
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactApi.delete(id);
      setAlert({ type: 'success', text: 'Contact message deleted!' });
      fetchAllData();
    } catch (err: any) {
      setAlert({ type: 'danger', text: 'Error deleting message' });
    }
  };

  // 1. RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
        <div className="card shadow border-0 rounded-4" style={{ maxWidth: '420px', width: '100%' }}>
          <div className="card-body p-4 p-md-5 text-center">
            <div
              className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: '64px', height: '64px' }}
            >
              <i className="bi bi-shield-lock-fill fs-2"></i>
            </div>
            <h3 className="fw-bold mb-1">Admin Portal</h3>
            <p className="text-muted small mb-4">Enter your administrative passcode to manage portfolio items.</p>

            {authError && (
              <div className="alert alert-danger py-2 small" role="alert">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label className="form-label small fw-semibold">Admin Passcode</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter admin passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-brand-primary w-100 py-2 fw-semibold">
                Sign In to Dashboard
              </button>
            </form>

            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none mt-3"
              onClick={() => setPasscode(DEFAULT_ADMIN_SECRET)}
            >
              <i className="bi bi-magic me-1"></i> Autofill Default Passcode
            </button>

            <div className="mt-4 pt-3 border-top">
              <Link to="/" className="text-muted small text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Back to Public Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER ADMIN DASHBOARD
  return (
    <div className="min-vh-100 bg-light">
      {/* Admin Header */}
      <header className="bg-white border-bottom py-3 sticky-top shadow-sm">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-gradient-brand text-white p-2 rounded-3">
              <i className="bi bi-shield-check"></i>
            </span>
            <span className="fw-bold fs-5 text-dark">
              Portfolio Admin <span className="badge bg-secondary-subtle text-secondary fs-7">Management</span>
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/" className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-box-arrow-up-right me-1"></i> View Live Site
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-danger">
              <i className="bi bi-box-arrow-right me-1"></i> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="container py-4">
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.text}
            <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
          </div>
        )}

        {/* Tab Navigation & Action Bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <ul className="nav nav-pills bg-white p-1 rounded-3 border shadow-sm">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'projects' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <i className="bi bi-kanban me-1"></i> Projects ({projects.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'skills' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className="bi bi-stars me-1"></i> Skills ({skills.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'education' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="bi bi-mortarboard me-1"></i> Education ({educationList.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'certifications' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('certifications')}
              >
                <i className="bi bi-award me-1"></i> Certifications ({certifications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'experience' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <i className="bi bi-briefcase me-1"></i> Experience ({experiences.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'messages' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('messages')}
              >
                <i className="bi bi-envelope me-1"></i> Messages ({messages.length})
              </button>
            </li>
          </ul>

          {activeTab !== 'messages' && (
            <button onClick={openAddModal} className="btn btn-brand-primary d-inline-flex align-items-center gap-2">
              <i className="bi bi-plus-lg"></i> Add New {activeTab.slice(0, -1)}
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted small">Loading records...</p>
          </div>
        ) : (
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-0">
              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Technologies</th>
                        <th>Live / Repo</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p._id}>
                          <td>
                            <strong>{p.title}</strong>
                            <div className="text-muted small text-truncate" style={{ maxWidth: '350px' }}>
                              {p.description}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {p.technologies.map((t, idx) => (
                                <span key={idx} className="badge bg-light text-dark border">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {p.liveUrl && (
                                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-primary small">
                                  Live Demo
                                </a>
                              )}
                              {p.githubUrl && (
                                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-dark small">
                                  GitHub
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="text-end">
                            <button onClick={() => handleEditProject(p)} className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteProject(p._id)} className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Skill Name</th>
                        <th>Category</th>
                        <th>Proficiency Level</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((s) => (
                        <tr key={s._id}>
                          <td>
                            <strong>{s.name}</strong>
                          </td>
                          <td>
                            <span className="badge bg-info-subtle text-info">{s.category}</span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2" style={{ maxWidth: '200px' }}>
                              <div className="progress flex-grow-1" style={{ height: '6px' }}>
                                <div className="progress-bar bg-primary" style={{ width: `${s.level}%` }}></div>
                              </div>
                              <span className="small text-muted">{s.level}%</span>
                            </div>
                          </td>
                          <td className="text-end">
                            <button onClick={() => handleEditSkill(s)} className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteSkill(s._id)} className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* EDUCATION TAB */}
              {activeTab === 'education' && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Institution</th>
                        <th>Degree / Field</th>
                        <th>Duration</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {educationList.map((e) => (
                        <tr key={e._id}>
                          <td>
                            <strong>{e.institution}</strong>
                          </td>
                          <td>
                            <div>{e.degree}</div>
                            <span className="text-muted small">{e.field}</span>
                          </td>
                          <td>
                            {e.startYear} - {e.endYear}
                          </td>
                          <td className="text-end">
                            <button onClick={() => handleEditEducation(e)} className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteEducation(e._id)} className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CERTIFICATIONS TAB */}
              {activeTab === 'certifications' && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Issuer</th>
                        <th>Date</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certifications.map((c) => (
                        <tr key={c._id}>
                          <td>
                            <strong>{c.title}</strong>
                          </td>
                          <td>{c.issuer}</td>
                          <td>{c.issueDate}</td>
                          <td className="text-end">
                            <button onClick={() => handleEditCert(c)} className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteCert(c._id)} className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Period</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experiences.map((exp) => (
                        <tr key={exp._id}>
                          <td>
                            <strong>{exp.company}</strong>
                          </td>
                          <td>{exp.position}</td>
                          <td>
                            {exp.startDate} - {exp.endDate}
                          </td>
                          <td className="text-end">
                            <button onClick={() => handleEditExp(exp)} className="btn btn-sm btn-outline-primary me-2">
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteExp(exp._id)} className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === 'messages' && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Sender</th>
                        <th>Subject & Message</th>
                        <th>Received</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-muted">
                            No incoming messages yet.
                          </td>
                        </tr>
                      ) : (
                        messages.map((m) => (
                          <tr key={m._id}>
                            <td>
                              <strong>{m.name}</strong>
                              <div className="small text-muted">{m.email}</div>
                            </td>
                            <td>
                              <div className="fw-semibold">{m.subject}</div>
                              <p className="small text-muted mb-0">{m.message}</p>
                            </td>
                            <td className="small text-muted">
                              {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Recent'}
                            </td>
                            <td className="text-end">
                              <button onClick={() => handleDeleteMessage(m._id)} className="btn btn-sm btn-outline-danger">
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL FOR ADD / EDIT ================= */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              {/* Project Modal Form */}
              {activeTab === 'projects' && (
                <form onSubmit={handleSaveProject}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="React, TypeScript, Node.js"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">GitHub URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={projectForm.githubUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Live URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={projectForm.liveUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-brand-primary">
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              {/* Skills Modal Form */}
              {activeTab === 'skills' && (
                <form onSubmit={handleSaveSkill}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Skill Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Category</label>
                      <select
                        className="form-select"
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Languages">Languages</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Level Percentage ({skillForm.level}%)</label>
                      <input
                        type="range"
                        className="form-range"
                        min={10}
                        max={100}
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-brand-primary">
                      Save Skill
                    </button>
                  </div>
                </form>
              )}

              {/* Education Modal Form */}
              {activeTab === 'education' && (
                <form onSubmit={handleSaveEducation}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Institution</label>
                      <input
                        type="text"
                        className="form-control"
                        value={eduForm.institution}
                        onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Degree</label>
                        <input
                          type="text"
                          className="form-control"
                          value={eduForm.degree}
                          onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Field of Study</label>
                        <input
                          type="text"
                          className="form-control"
                          value={eduForm.field}
                          onChange={(e) => setEduForm({ ...eduForm, field: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Start Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={eduForm.startYear}
                          onChange={(e) => setEduForm({ ...eduForm, startYear: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">End Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={eduForm.endYear}
                          onChange={(e) => setEduForm({ ...eduForm, endYear: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={eduForm.description}
                        onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-brand-primary">
                      Save Education
                    </button>
                  </div>
                </form>
              )}

              {/* Certifications Modal Form */}
              {activeTab === 'certifications' && (
                <form onSubmit={handleSaveCert}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Certificate Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Issuer</label>
                        <input
                          type="text"
                          className="form-control"
                          value={certForm.issuer}
                          onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Issue Date / Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={certForm.issueDate}
                          onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Credential Verification URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={certForm.credentialUrl}
                        onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-brand-primary">
                      Save Certification
                    </button>
                  </div>
                </form>
              )}

              {/* Experience Modal Form */}
              {activeTab === 'experience' && (
                <form onSubmit={handleSaveExp}>
                  <div className="modal-body">
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Company / Organization</label>
                        <input
                          type="text"
                          className="form-control"
                          value={expForm.company}
                          onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Position / Role</label>
                        <input
                          type="text"
                          className="form-control"
                          value={expForm.position}
                          onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Start Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Jun 2024"
                          value={expForm.startDate}
                          onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">End Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Aug 2024 or Present"
                          value={expForm.endDate}
                          onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={expForm.technologies}
                        onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={expForm.description}
                        onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-brand-primary">
                      Save Experience
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
