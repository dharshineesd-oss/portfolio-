import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsNavCollapsed(true);
    if (location.pathname !== '/') {
      return; // Will navigate via Link
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top portfolio-navbar ${isScrolled ? 'shadow-sm py-2' : 'py-3'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/" onClick={() => handleNavClick('home')}>
          <span className="badge bg-gradient-brand text-white p-2 rounded-3">
            <i className="bi bi-code-slash fs-6"></i>
          </span>
          <span className="fs-5 text-dark">
            Dharshinee <span className="text-gradient">SD</span>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-controls="portfolioNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2 text-dark"></i>
        </button>

        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="portfolioNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
            <li className="nav-nav-item">
              <a className="nav-link" href="/#home" onClick={() => handleNavClick('home')}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about" onClick={() => handleNavClick('about')}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#skills" onClick={() => handleNavClick('skills')}>
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#projects" onClick={() => handleNavClick('projects')}>
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#education" onClick={() => handleNavClick('education')}>
                Education
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#certifications" onClick={() => handleNavClick('certifications')}>
                Certifications
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#experience" onClick={() => handleNavClick('experience')}>
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contact" onClick={() => handleNavClick('contact')}>
                Contact
              </a>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-brand-outline d-inline-flex align-items-center gap-1"
              >
                <i className="bi bi-file-earmark-arrow-down"></i> Resume
              </a>
            </li>
            <li className="nav-item ms-lg-1 mt-2 mt-lg-0">
              <Link
                to="/admin"
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 border-0"
                title="Admin Dashboard"
                onClick={() => setIsNavCollapsed(true)}
              >
                <i className="bi bi-shield-lock"></i> Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
