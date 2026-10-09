import React, { useEffect, useState } from 'react';
import { Service } from '../types/portfolio.types';
import { servicesApi } from '../services/api';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesApi.getAll();
      setServices(data.filter((s) => s.active !== false));
    } catch (err) {
      console.warn('Failed to load services', err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && services.length === 0) {
    return null; // hide section if no services enabled
  }

  return (
    <section id="services" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">What I Offer</span>
          <h2 className="section-title fs-2">Services & Engineering Expertise</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary-color, #4f46e5)', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Delivering high-performance, modular digital solutions tailored to product specifications and business needs.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {services.map((svc) => (
              <div key={svc._id} className="col-md-6 col-lg-3">
                <div className="portfolio-card h-100 p-4 d-flex flex-column bg-white shadow-sm">
                  <div
                    className="rounded-3 bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '52px', height: '52px', fontSize: '1.5rem' }}
                  >
                    <i className={`bi ${svc.icon || 'bi-layers-fill'}`}></i>
                  </div>

                  <h5 className="fw-bold text-dark mb-2">{svc.name}</h5>
                  <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>
                    {svc.description}
                  </p>

                  {svc.features && svc.features.length > 0 && (
                    <ul className="list-unstyled small text-secondary mb-3 pt-2 border-top">
                      {svc.features.map((feat, idx) => (
                        <li key={idx} className="mb-1 d-flex align-items-center gap-1">
                          <i className="bi bi-check2 text-primary"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {svc.price && (
                    <div className="mt-auto pt-2 text-primary fw-semibold small">
                      Rate: <span className="text-dark">{svc.price}</span>
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

export default Services;
