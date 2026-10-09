import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="position-relative pt-5 pb-5 bg-gradient-hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container pt-5">
        <div className="row align-items-center g-5">
          {/* Text Content */}
          <div className="col-lg-7 text-center text-lg-start">
            <div className="hero-badge-pill mb-3">
              <span className="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true" style={{ width: '8px', height: '8px' }}></span>
              Available for Full Stack Roles & Internships
            </div>

            <h1 className="display-4 fw-bolder mb-2 section-title">
              Hi, I'm <span className="text-gradient">Dharshinee SD</span>
            </h1>

            <h2 className="h4 text-primary fw-semibold mb-1">
              B.Tech Information Technology Student
            </h2>
            <h3 className="h5 text-muted fw-normal mb-4">
              Aspiring Full Stack Developer
            </h3>

            <p className="lead text-secondary mb-4 fs-6" style={{ maxWidth: '580px', lineHeight: '1.7' }}>
              I am passionate about architecting scalable full-stack web applications, designing intuitive user experiences,
              and solving real-world challenges through clean code and modern technologies.
            </p>

            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-4">
              <a href="#projects" className="btn btn-brand-primary d-inline-flex align-items-center gap-2">
                <i className="bi bi-grid-3x3-gap-fill"></i> View My Projects
              </a>
              <a href="#contact" className="btn btn-brand-outline d-inline-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill"></i> Contact Me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark d-inline-flex align-items-center gap-2 rounded-3"
              >
                <i className="bi bi-file-earmark-arrow-down-fill"></i> Download Resume
              </a>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-2 border-top border-light">
              <span className="small text-muted fw-semibold me-2 d-inline-block mb-2">Core Stack:</span>
              <div className="d-inline-flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap 5'].map((tech) => (
                  <span key={tech} className="badge-tech">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Profile / Illustration Area */}
          <div className="col-lg-5 text-center">
            <div className="hero-avatar-wrapper">
              <div className="avatar-glow"></div>
              {/* Professional Developer Vector Illustration Avatar */}
              <div
                className="avatar-img d-flex flex-column align-items-center justify-content-center bg-white p-4"
                style={{
                  border: '6px solid #ffffff',
                  boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)'
                }}
              >
                <div
                  className="rounded-circle bg-gradient-brand text-white d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '130px', height: '130px', fontSize: '3.5rem' }}
                >
                  <i className="bi bi-laptop"></i>
                </div>
                <h5 className="fw-bold mb-0 text-dark">Dharshinee SD</h5>
                <span className="badge bg-primary-subtle text-primary mt-2 px-3 py-1 rounded-pill">
                  IT Undergrad & Developer
                </span>
                <div className="d-flex gap-2 mt-3 text-muted">
                  <span title="Tamil Nadu, India"><i className="bi bi-geo-alt-fill text-danger me-1"></i>India</span>
                  <span>•</span>
                  <span><i className="bi bi-mortarboard-fill text-primary me-1"></i>Anna University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
