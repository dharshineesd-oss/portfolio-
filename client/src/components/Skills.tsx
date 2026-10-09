import React, { useEffect, useState } from 'react';
import { Skill } from '../types/portfolio.types';
import { skillsApi } from '../services/api';

const defaultFallbackSkills: Skill[] = [
  { _id: '1', name: 'HTML', category: 'Frontend', level: 95 },
  { _id: '2', name: 'CSS', category: 'Frontend', level: 90 },
  { _id: '3', name: 'JavaScript', category: 'Frontend', level: 92 },
  { _id: '4', name: 'TypeScript', category: 'Frontend', level: 86 },
  { _id: '5', name: 'React', category: 'Frontend', level: 88 },
  { _id: '6', name: 'Bootstrap', category: 'Frontend', level: 92 },
  { _id: '7', name: 'Node.js', category: 'Backend', level: 85 },
  { _id: '8', name: 'Express.js', category: 'Backend', level: 85 },
  { _id: '9', name: 'MongoDB', category: 'Database', level: 82 },
  { _id: '10', name: 'REST API', category: 'Backend', level: 90 },
  { _id: '11', name: 'Java', category: 'Languages', level: 80 },
  { _id: '12', name: 'Git/GitHub', category: 'Tools', level: 88 }
];

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await skillsApi.getAll();
      if (data && data.length > 0) {
        setSkills(data);
      } else {
        setSkills(defaultFallbackSkills);
      }
      setError(null);
    } catch (err) {
      console.warn('Backend unavailable, using default skills', err);
      setSkills(defaultFallbackSkills);
      setError('Loaded cached skills while connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Expertise</span>
          <h2 className="section-title fs-2">Technical Skills & Proficiency</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            A comprehensive overview of my programming languages, frameworks, backend environments, and development tools.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading skills...</span>
            </div>
            <p className="text-muted mt-2 small">Loading skills from API...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredSkills.map((skill) => (
              <div key={skill._id || skill.name} className="col-md-6 col-lg-4">
                <div className="skill-card h-100 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-dark fs-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check2-circle text-primary"></i>
                      {skill.name}
                    </span>
                    <span className="badge bg-primary-subtle text-primary fw-semibold px-2 py-1">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="skill-progress mb-2">
                    <div
                      className="skill-progress-bar"
                      role="progressbar"
                      style={{ width: `${skill.level}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                      Category: {skill.category}
                    </span>
                    <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                      {skill.level >= 90 ? 'Advanced' : skill.level >= 80 ? 'Proficient' : 'Intermediate'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
