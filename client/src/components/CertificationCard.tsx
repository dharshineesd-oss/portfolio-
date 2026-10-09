import React, { useEffect, useState } from 'react';
import { Certification } from '../types/portfolio.types';
import { certificationsApi } from '../services/api';

const defaultFallbackCerts: Certification[] = [
  {
    _id: '1',
    title: 'HTML Certificate',
    issuer: 'CodeChef',
    issueDate: '2023',
    credentialUrl: 'https://www.codechef.com/certificates',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '2',
    title: 'JavaScript Certificate',
    issuer: 'CodeChef',
    issueDate: '2023',
    credentialUrl: 'https://www.codechef.com/certificates',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '3',
    title: 'AWS Academy Cloud Architecting',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2024',
    credentialUrl: 'https://aws.amazon.com/training/awsacademy/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  }
];

export const CertificationCard: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const data = await certificationsApi.getAll();
      if (data && data.length > 0) {
        setCerts(data);
      } else {
        setCerts(defaultFallbackCerts);
      }
    } catch (err) {
      console.warn('Backend unavailable, using default certificates', err);
      setCerts(defaultFallbackCerts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="certifications" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Credentials</span>
          <h2 className="section-title fs-2">Certifications & Honors</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Recognized industry and platform certifications validating web development and cloud architectural expertise.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading certifications...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {certs.map((cert) => (
              <div key={cert._id} className="col-md-6 col-lg-4">
                <div className="portfolio-card h-100 p-4 d-flex flex-column shadow-sm border">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold">
                      <i className="bi bi-award-fill me-1"></i> {cert.issuer}
                    </span>
                    <span className="small text-muted fw-medium">
                      <i className="bi bi-calendar-event me-1"></i> {cert.issueDate}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-2">{cert.title}</h5>
                  <p className="text-muted small mb-4 flex-grow-1">
                    Verified technical qualification credential issued by <strong>{cert.issuer}</strong>.
                  </p>

                  <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className="small text-success fw-semibold d-flex align-items-center gap-1">
                      <i className="bi bi-patch-check-fill"></i> Verified
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                      >
                        Verify Credential <i className="bi bi-arrow-up-right"></i>
                      </a>
                    )}
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

export default CertificationCard;
