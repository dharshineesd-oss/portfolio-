import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-footer pt-5 pb-4">
      <div className="container">
        <div className="row g-4 justify-content-between align-items-center mb-4">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
              <span className="badge bg-gradient-brand text-white p-2 rounded-3">
                <i className="bi bi-code-slash"></i>
              </span>
              <h4 className="fw-bold text-white mb-0">Dharshinee SD</h4>
            </div>
            <p className="text-white-50 small mb-0" style={{ maxWidth: '400px' }}>
              B.Tech Information Technology Student at Anna University. Aspiring Full Stack Developer passionate about crafting modern web applications.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <a
                href="https://github.com/dharshineesd"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub Profile"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/dharshineesd"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="LinkedIn Profile"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="mailto:dharshineesd@gmail.com"
                className="social-icon-btn"
                title="Send Direct Email"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
              <button
                onClick={scrollToTop}
                className="social-icon-btn border-0"
                title="Scroll back to top"
              >
                <i className="bi bi-arrow-up"></i>
              </button>
            </div>
            <div className="text-white-50 small">
              Available for Full-time roles & Internships
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <div className="row align-items-center justify-content-between pt-2">
          <div className="col-md-6 text-center text-md-start text-white-50 small">
            &copy; {currentYear} <strong>Dharshinee SD</strong>. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end text-white-50 small mt-2 mt-md-0">
            Built with React, TypeScript, Bootstrap 5, Express.js & MongoDB
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
