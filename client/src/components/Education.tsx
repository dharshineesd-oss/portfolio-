import React, { useEffect, useState } from 'react';
import { Education as EducationType } from '../types/portfolio.types';
import { educationApi } from '../services/api';

const defaultFallbackEducation: EducationType[] = [
  {
    _id: '1',
    institution: 'Anna University',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Information Technology',
    startYear: '2022',
    endYear: '2026',
    description:
      'Core coursework: Data Structures, Algorithms, Object-Oriented Software Design, Database Systems, Web Technology, Cloud Computing, and Computer Networks. Consistently active in technical hackathons and academic coding challenges.'
  },
  {
    _id: '2',
    institution: 'Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC)',
    field: 'Computer Science & Mathematics',
    startYear: '2020',
    endYear: '2022',
    description:
      'Completed secondary education with distinction in Mathematics and Computer Science fundamentals.'
  }
];

export const Education: React.FC = () => {
  const [educationList, setEducationList] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const data = await educationApi.getAll();
      if (data && data.length > 0) {
        setEducationList(data);
      } else {
        setEducationList(defaultFallbackEducation);
      }
    } catch (err) {
      console.warn('Backend unavailable, using default education data', err);
      setEducationList(defaultFallbackEducation);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="education" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title fs-2">Education & Qualifications</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            My educational milestones, technical coursework, and academic credentials.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading education...</span>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="timeline">
                {educationList.map((item) => (
                  <div key={item._id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="portfolio-card p-4 shadow-sm bg-white">
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                        <div>
                          <span className="badge bg-primary text-white mb-2">
                            {item.startYear} – {item.endYear}
                          </span>
                          <h4 className="fw-bold text-dark mb-1">{item.degree}</h4>
                          <h5 className="h6 text-primary fw-semibold mb-0">
                            <i className="bi bi-mortarboard-fill me-1"></i> {item.field}
                          </h5>
                        </div>
                        <div className="text-lg-end">
                          <span className="badge bg-light text-secondary border px-3 py-2 fw-medium fs-7">
                            <i className="bi bi-building me-1"></i> {item.institution}
                          </span>
                        </div>
                      </div>

                      {item.description && (
                        <p className="text-muted small mt-3 mb-0" style={{ lineHeight: '1.7' }}>
                          {item.description}
                        </p>
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

export default Education;
