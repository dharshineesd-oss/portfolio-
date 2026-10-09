import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light text-center p-4">
      <div>
        <h1 className="display-1 fw-bold text-gradient">404</h1>
        <h2 className="fw-bold mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">The page or resource you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn btn-brand-primary">
          <i className="bi bi-house-door-fill me-1"></i> Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
