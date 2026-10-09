import React, { useEffect, useState } from 'react';
import { Experience as ExperienceType } from '../types/portfolio.types';
import { experienceApi } from '../services/api';

export const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await experienceApi.getAll();
      setExperiences(data || []);
    } catch (err) {
      console.warn('Backend unavailable for experience fetching', err);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="experience" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Career & Practical Training</span>
          <h2 className="section-title fs-2">Experience & Internships</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Internship history, software engineering apprenticeships, and hands-on industrial training.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading experience...</span>
            </div>
          </div>
        ) : experiences.length === 0 ? (
          /* Empty-state message as specified in requirements */
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-5 text-center bg-white rounded-4 border shadow-sm">
                <div
                  className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '70px', height: '70px' }}
                >
                  <i className="bi bi-briefcase fs-2"></i>
                </div>
                <h4 className="fw-bold text-dark mb-2">Currently Seeking Opportunities</h4>
                <p className="text-muted mb-4" style={{ maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
                  I am actively seeking Full Stack Developer internships, entry-level engineering roles, and open-source collaborations.
                  Check back soon or explore my projects above to see my technical capabilities!
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#contact" className="btn btn-brand-primary">
                    <i className="bi bi-envelope-fill me-1"></i> Get in Touch
                  </a>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-brand-outline">
                    <i className="bi bi-file-earmark-person me-1"></i> View Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="timeline">
                {experiences.map((exp) => (
                  <div key={exp._id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="portfolio-card p-4 shadow-sm bg-white">
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                        <div>
                          <span className="badge bg-primary text-white mb-2">
                            {exp.startDate} – {exp.endDate || 'Present'}
                          </span>
                          <h4 className="fw-bold text-dark mb-1">{exp.position}</h4>
                          <h5 className="h6 text-primary fw-semibold mb-0">
                            <i className="bi bi-building me-1"></i> {exp.company}
                          </h5>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-muted small mt-3 mb-3" style={{ lineHeight: '1.7' }}>
                          {exp.description}
                        </p>
                      )}

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mt-2">
                          {exp.technologies.map((t, idx) => (
                            <span key={idx} className="badge-tech">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
