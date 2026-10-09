import React, { useEffect, useState } from 'react';
import { Project } from '../types/portfolio.types';
import { projectsApi } from '../services/api';
import ProjectCard from './ProjectCard';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [selectedTech]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsApi.getAll(selectedTech === 'All' ? undefined : { technology: selectedTech });
      setProjects(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects from backend API. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = ['All', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'GenAI', 'Bootstrap'];

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title fs-2">Portfolio Projects</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '650px', margin: '0 auto' }}>
            A showcase of full-stack web applications, GenAI implementations, and developer tools built with modern technology stacks.
          </p>
        </div>

        {/* Tech Filter Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {filterOptions.map((tech) => (
            <button
              key={tech}
              className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading projects...</span>
            </div>
            <p className="text-muted mt-2 small">Fetching projects dynamically from REST API...</p>
          </div>
        ) : error ? (
          <div className="alert alert-warning text-center my-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-3 border">
            <i className="bi bi-folder-x fs-1 text-muted"></i>
            <h5 className="mt-3 text-dark fw-bold">No projects found</h5>
            <p className="text-muted small">No projects match the selected technology filter: "{selectedTech}".</p>
            <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedTech('All')}>
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((project) => (
              <div key={project._id} className="col-md-6 col-lg-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
