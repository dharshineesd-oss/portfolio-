import React, { useEffect, useState } from 'react';
import { Achievement } from '../types/portfolio.types';
import { achievementsApi } from '../services/api';

export const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const data = await achievementsApi.getAll();
      setAchievements(data);
    } catch (err) {
      console.warn('Failed to load achievements', err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && achievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Recognitions</span>
          <h2 className="section-title fs-2">Honors & Achievements</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color, #4f46e5)', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Awards, hackathon highlights, and competitive coding milestones.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {achievements.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="portfolio-card h-100 p-4 d-flex flex-column shadow-sm border bg-light">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-warning-subtle text-dark border border-warning px-3 py-1 rounded-pill fw-semibold">
                      <i className="bi bi-trophy-fill text-warning me-1"></i> {item.organization}
                    </span>
                    <span className="small text-muted fw-medium">{item.date}</span>
                  </div>

                  <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                  <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>
                    {item.description}
                  </p>

                  {item.url && (
                    <div className="mt-auto pt-2 border-top">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                      >
                        Learn More <i className="bi bi-arrow-up-right"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
