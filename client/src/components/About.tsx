import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">About Me</span>
          <h2 className="section-title fs-2">Get to Know Dharshinee SD</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h3 className="h4 fw-bold mb-3 text-dark">
              Aspiring Full Stack Developer with an Engineering Mindset
            </h3>
            <p className="text-muted" style={{ lineHeight: '1.8' }}>
              Hello! I am <strong>Dharshinee SD</strong>, currently pursuing my Bachelor of Technology (B.Tech) in
              <strong> Information Technology</strong> at Anna University. I have a genuine enthusiasm for software engineering,
              database design, and crafting interactive, high-performance web applications.
            </p>
            <p className="text-muted" style={{ lineHeight: '1.8' }}>
              My journey into programming began with building algorithmic logic in Java and scripting frontends with HTML, CSS,
              and JavaScript. Over the years, I have expanded into modern full-stack development, creating dynamic user interfaces
              with <strong>React & TypeScript</strong> and resilient backends powered by <strong>Node.js, Express, and MongoDB</strong>.
            </p>

            <div className="p-4 rounded-3 bg-light border border-slate-border mb-4">
              <h5 className="fw-bold text-primary mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-compass-fill"></i> Career Objective
              </h5>
              <p className="text-secondary mb-0 small" style={{ lineHeight: '1.7' }}>
                To secure a challenging role as a Full Stack Software Developer where I can apply my foundation in web technologies,
                clean coding standards, and collaborative mindset to build scalable digital solutions that create real customer value.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              {/* Feature Box 1 */}
              <div className="col-sm-6">
                <div className="p-3 rounded-3 border bg-light h-100">
                  <div className="d-flex align-items-center gap-2 text-primary fw-bold mb-2">
                    <i className="bi bi-layers-fill fs-4"></i>
                    <span>Full Stack Development</span>
                  </div>
                  <p className="text-muted small mb-0">
                    Designing responsive frontends and RESTful API backends with end-to-end data integrity.
                  </p>
                </div>
              </div>

              {/* Feature Box 2 */}
              <div className="col-sm-6">
                <div className="p-3 rounded-3 border bg-light h-100">
                  <div className="d-flex align-items-center gap-2 text-info fw-bold mb-2">
                    <i className="bi bi-cloud-check-fill fs-4"></i>
                    <span>Cloud & Databases</span>
                  </div>
                  <p className="text-muted small mb-0">
                    Proficient in MongoDB document modeling, cloud architectures (AWS Academy), and optimized querying.
                  </p>
                </div>
              </div>

              {/* Feature Box 3 */}
              <div className="col-sm-6">
                <div className="p-3 rounded-3 border bg-light h-100">
                  <div className="d-flex align-items-center gap-2 text-success fw-bold mb-2">
                    <i className="bi bi-robot fs-4"></i>
                    <span>Generative AI & Tech</span>
                  </div>
                  <p className="text-muted small mb-0">
                    Integrating generative AI models and intelligent prompts to enhance application capabilities.
                  </p>
                </div>
              </div>

              {/* Feature Box 4 */}
              <div className="col-sm-6">
                <div className="p-3 rounded-3 border bg-light h-100">
                  <div className="d-flex align-items-center gap-2 text-warning fw-bold mb-2">
                    <i className="bi bi-patch-check-fill fs-4"></i>
                    <span>Code Quality & Git</span>
                  </div>
                  <p className="text-muted small mb-0">
                    Practicing modular code structure, version control with Git/GitHub, and Swagger API documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="row text-center g-2 mt-3">
              <div className="col-4">
                <div className="p-3 border rounded-3 bg-white shadow-sm">
                  <span className="fs-3 fw-bolder text-primary">5+</span>
                  <p className="text-muted mb-0 small fw-semibold">Web Projects</p>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 border rounded-3 bg-white shadow-sm">
                  <span className="fs-3 fw-bolder text-info">12+</span>
                  <p className="text-muted mb-0 small fw-semibold">Tech Skills</p>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 border rounded-3 bg-white shadow-sm">
                  <span className="fs-3 fw-bolder text-success">3+</span>
                  <p className="text-muted mb-0 small fw-semibold">Certifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
