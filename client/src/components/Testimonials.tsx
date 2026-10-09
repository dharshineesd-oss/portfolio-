import React, { useEffect, useState } from 'react';
import { Testimonial } from '../types/portfolio.types';
import { testimonialsApi } from '../services/api';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await testimonialsApi.getAll();
      setTestimonials(data.filter((t) => t.active !== false));
    } catch (err) {
      console.warn('Failed to load testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Endorsements</span>
          <h2 className="section-title fs-2">What Mentors & Peers Say</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color, #4f46e5)', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Feedback and recommendations from professors, team leads, and project collaborators.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {testimonials.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="portfolio-card h-100 p-4 d-flex flex-column bg-white shadow-sm">
                  {/* Star rating */}
                  <div className="d-flex text-warning mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`bi ${i < item.rating ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                    ))}
                  </div>

                  <p className="text-muted small fst-italic mb-4 flex-grow-1" style={{ lineHeight: '1.7' }}>
                    "{item.content}"
                  </p>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top mt-auto">
                    <img
                      src={item.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={item.name}
                      className="rounded-circle object-fit-cover"
                      style={{ width: '48px', height: '48px' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                      }}
                    />
                    <div>
                      <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                      <span className="small text-muted d-block">
                        {item.jobTitle} {item.company ? `• ${item.company}` : ''}
                      </span>
                    </div>
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

export default Testimonials;
