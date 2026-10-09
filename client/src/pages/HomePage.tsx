import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import CertificationCard from '../components/CertificationCard';
import Experience from '../components/Experience';
import ResumeSection from '../components/ResumeSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 10. Responsive Navbar */}
      <Navbar />

      <main className="flex-grow-1">
        {/* 1. Home / Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Education Section */}
        <Education />

        {/* 6. Certifications Section */}
        <CertificationCard />

        {/* 7. Experience / Internship Section */}
        <Experience />

        {/* 8. Resume Download / View Section */}
        <ResumeSection />

        {/* 9. Contact Form Section */}
        <ContactForm />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
