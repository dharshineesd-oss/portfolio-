import React, { useState } from 'react';
import { contactApi } from '../services/api';
import { ContactFormInput } from '../types/portfolio.types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const [validated, setValidated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);
    setFeedback(null);

    // Basic frontend validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFeedback({ type: 'danger', text: 'Please fill out all required fields before submitting.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFeedback({ type: 'danger', text: 'Please enter a valid email address (e.g., yourname@domain.com).' });
      return;
    }

    setLoading(true);

    try {
      const response = await contactApi.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      setFeedback({
        type: 'success',
        text: response.message || 'Thank you! Your message has been sent successfully. I will get back to you soon.'
      });

      // Clear the form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setValidated(false);
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || 'An error occurred while sending your message. Please try again later.';
      setFeedback({ type: 'danger', text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title fs-2">Let's Connect & Collaborate</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#4f46e5', borderRadius: '2px' }}></div>
          <p className="text-muted mt-3 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Have a project in mind, an internship opportunity, or want to discuss full-stack development? Send me a message!
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Left Column: Contact Information */}
          <div className="col-lg-5">
            <div className="contact-info-card h-100 shadow-sm d-flex flex-column justify-content-between">
              <div>
                <h4 className="fw-bold mb-3">Contact Information</h4>
                <p className="text-white-50 mb-4 small" style={{ lineHeight: '1.7' }}>
                  Feel free to reach out directly via email, connect on LinkedIn, or inspect my open-source code repositories on GitHub.
                </p>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <span className="text-white-50 small d-block">Name</span>
                    <strong className="fs-6">Dharshinee SD</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="bi bi-envelope-at-fill"></i>
                  </div>
                  <div>
                    <span className="text-white-50 small d-block">Email</span>
                    <a href="mailto:dharshineesd@gmail.com" className="text-white text-decoration-none fw-semibold">
                      dharshineesd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <span className="text-white-50 small d-block">Location</span>
                    <strong className="fs-6">Tamil Nadu, India</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="bi bi-mortarboard-fill"></i>
                  </div>
                  <div>
                    <span className="text-white-50 small d-block">College</span>
                    <strong className="fs-6">Anna University (IT Dept.)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-top border-secondary">
                <span className="text-white-50 small d-block mb-3">Connect with me online:</span>
                <div className="d-flex gap-3">
                  <a
                    href="https://github.com/dharshineesd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    title="GitHub"
                  >
                    <i className="bi bi-github"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/dharshineesd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    title="LinkedIn"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a
                    href="mailto:dharshineesd@gmail.com"
                    className="social-icon-btn"
                    title="Send Email"
                  >
                    <i className="bi bi-envelope-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-lg-7">
            <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm h-100">
              <h4 className="fw-bold text-dark mb-4">Send a Message</h4>

              {feedback && (
                <div className={`alert alert-${feedback.type} alert-dismissible fade show`} role="alert">
                  <i className={`bi ${feedback.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                  {feedback.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setFeedback(null)}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold text-dark small">
                      Your Full Name <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ${validated && !formData.name.trim() ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold text-dark small">
                      Your Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className={`form-control border-start-0 ${validated && !formData.email.trim() ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="subject" className="form-label fw-semibold text-dark small">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-chat-left-dots text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ${validated && !formData.subject.trim() ? 'is-invalid' : ''}`}
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Internship Opportunity / Collaboration"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold text-dark small">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${validated && !formData.message.trim() ? 'is-invalid' : ''}`}
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message or inquiry here..."
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-brand-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill"></i> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
