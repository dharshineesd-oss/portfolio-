import React from 'react';
import { Project } from '../types/portfolio.types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="portfolio-card h-100 d-flex flex-column shadow-sm">
      <div className="project-img-container">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            // Fallback image if remote url fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div
          className="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 text-white"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          {project.technologies[0] || 'Web App'}
        </div>
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1">
        <h5 className="fw-bold text-dark mb-2">{project.title}</h5>
        <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: '1.6' }}>
          {project.description}
        </p>

        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="badge-tech">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-top d-flex gap-2 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-brand-primary flex-grow-1 d-inline-flex align-items-center justify-content-center gap-1"
            >
              <i className="bi bi-box-arrow-up-right"></i> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-dark d-inline-flex align-items-center justify-content-center gap-1 px-3"
              title="View Source on GitHub"
            >
              <i className="bi bi-github"></i> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
