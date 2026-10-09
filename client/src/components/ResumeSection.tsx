import React from 'react';

export const ResumeSection: React.FC = () => {
  const resumePdfPath = '/resume.pdf';

  return (
    <section id="resume" className="py-5 bg-white border-top border-bottom">
      <div className="container">
        <div className="p-4 p-md-5 rounded-4 bg-gradient-brand text-white shadow">
          <div className="row align-items-center g-4">
            <div className="col-lg-8 text-center text-lg-start">
              <span className="badge bg-white text-primary fw-bold px-3 py-1 rounded-pill mb-3">
                <i className="bi bi-file-earmark-text-fill me-1"></i> Curriculum Vitae
              </span>
              <h2 className="display-6 fw-bold mb-2">Want to learn more about my background?</h2>
              <p className="lead mb-0 text-white-50 fs-6" style={{ maxWidth: '640px' }}>
                Download my comprehensive resume covering educational highlights, full-stack projects,
                technical skills, certifications, and academic achievements.
              </p>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <div className="d-flex flex-column flex-sm-row justify-content-lg-end gap-2">
                <a
                  href={resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light btn-lg fw-bold text-primary shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-eye-fill"></i> View Resume
                </a>
                <a
                  href={resumePdfPath}
                  download="Dharshinee_SD_Resume.pdf"
                  className="btn btn-outline-light btn-lg fw-bold d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-download"></i> Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
