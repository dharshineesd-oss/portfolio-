export const sampleAdminUser = {
  name: 'Dharshinee SD (Admin)',
  email: 'admin@portfolio.com',
  password: 'admin123456',
  role: 'admin'
};

export const sampleProfile = {
  name: 'Dharshinee SD',
  title: 'B.Tech Information Technology Student',
  subtitle: 'Aspiring Full Stack Developer',
  shortBio:
    'I build modern, scalable web applications and craft high-performance digital experiences bridging frontend elegance with resilient backend architectures.',
  longBio:
    'Currently pursuing B.Tech in Information Technology at Anna University. Passionate about software engineering, data structures, cloud architectures, and leveraging generative AI to build intuitive solutions.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  location: 'Tamil Nadu, India',
  email: 'dharshineesd@gmail.com',
  phone: '+91 98765 43210',
  resumeUrl: '/resume.pdf',
  heroBg: '',
  ctaPrimaryText: 'View My Projects',
  ctaSecondaryText: 'Contact Me',
  careerObjective:
    'To secure a challenging role as a Full Stack Software Developer where I can apply my foundation in web technologies, clean coding standards, and collaborative mindset to build scalable digital solutions.',
  interests: [
    'Full Stack Web Development',
    'Cloud-Native Architectures',
    'Generative AI Applications',
    'Microservices & REST APIs',
    'UI/UX Design Systems'
  ],
  languages: ['English', 'Tamil'],
  stats: {
    projectsCount: 5,
    skillsCount: 12,
    certsCount: 3,
    expYears: '1+'
  }
};

export const sampleServices = [
  {
    name: 'Full Stack Web Development',
    icon: 'bi-laptop',
    description:
      'End-to-end web applications built using React, TypeScript, Node.js, Express, and MongoDB with modern responsive design.',
    price: 'Custom',
    features: ['Custom SPA / SSR Development', 'Responsive Bootstrap Layouts', 'RESTful API Integration', 'State Management'],
    sortOrder: 1,
    active: true
  },
  {
    name: 'RESTful API Engineering',
    icon: 'bi-hdd-network',
    description:
      'High-performance, secure backend REST APIs with JWT authentication, request validation, and comprehensive Swagger documentation.',
    price: 'Custom',
    features: ['Swagger / OpenAPI Docs', 'JWT Authentication & Security', 'Centralized Error Handling', 'MongoDB Optimization'],
    sortOrder: 2,
    active: true
  },
  {
    name: 'Frontend UI/UX Implementation',
    icon: 'bi-palette',
    description:
      'Translating Figma and visual concepts into pixel-perfect, accessible, mobile-first web components using Bootstrap 5 and modern CSS.',
    price: 'Custom',
    features: ['Mobile-first Responsive Design', 'Interactive UI Components', 'Accessibility (a11y) Standards', 'Performance Optimization'],
    sortOrder: 3,
    active: true
  },
  {
    name: 'GenAI & Cloud Integration',
    icon: 'bi-cpu',
    description:
      'Integrating generative AI LLM models (OpenAI, Gemini) and deploying cloud-native architectures on AWS and modern hosting platforms.',
    price: 'Custom',
    features: ['Generative AI Prompts & Pipelines', 'AWS Academy Cloud Arch', 'CI/CD Pipeline Setup', 'Secure Secrets Management'],
    sortOrder: 4,
    active: true
  }
];

export const sampleAchievements = [
  {
    title: 'Smart India Hackathon Finalist',
    description: 'Developed an automated health management prototype selected among top college innovations nationwide.',
    date: '2024',
    organization: 'Ministry of Education / AICTE',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    url: '',
    sortOrder: 1
  },
  {
    title: 'Academic Excellence Award',
    description: 'Secured top department rank in Object-Oriented Software Design & Database Management Systems.',
    date: '2023',
    organization: 'Anna University Department of IT',
    image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80',
    url: '',
    sortOrder: 2
  },
  {
    title: 'CodeChef Certified Gold Badge',
    description: 'Solved over 150+ data structures and algorithmic challenges in Java and JavaScript.',
    date: '2023',
    organization: 'CodeChef',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
    url: 'https://codechef.com',
    sortOrder: 3
  }
];

export const sampleTestimonials = [
  {
    name: 'Dr. R. Ramanathan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    jobTitle: 'Professor & Head of Department',
    company: 'Anna University',
    content:
      'Dharshinee demonstrates an exceptional grasp of full-stack engineering fundamentals. Her dedication to clean code, modular architecture, and solving real-world challenges is outstanding.',
    rating: 5,
    website: 'https://annauniv.edu',
    sortOrder: 1,
    active: true
  },
  {
    name: 'Priya Sundaram',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    jobTitle: 'Senior Engineering Lead',
    company: 'Tech Innovators Studio',
    content:
      'During her internship, Dharshinee consistently delivered robust React components and seamless Express APIs ahead of schedule. She communicates effectively and solves problems with poise.',
    rating: 5,
    website: 'https://linkedin.com',
    sortOrder: 2,
    active: true
  },
  {
    name: 'Karthik V.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    jobTitle: 'Hackathon Teammate & Peer',
    company: 'Developer Student Club',
    content:
      'Collaborating with Dharshinee on hackathons was an absolute pleasure. Her full-stack capabilities turned complex backend logic into smooth user experiences effortlessly.',
    rating: 5,
    website: '',
    sortOrder: 3,
    active: true
  }
];

export const sampleBlogPosts = [
  {
    title: 'Building Scalable Full-Stack Web Applications with React & Node.js',
    slug: 'building-scalable-full-stack-web-applications',
    excerpt: 'Key architectural patterns for decoupling React frontends and Express backends with MongoDB.',
    content: `
<h2>Introduction</h2>
<p>Modern web engineering demands high performance, scalable architectures, and clean separation of concerns. In this article, we examine best practices when structuring a production-ready application using React, TypeScript, Express, and MongoDB.</p>

<h3>1. Clear Architectural Layering</h3>
<p>Avoid coupling your database queries directly inside route definitions. Instead, organize your backend into:</p>
<ul>
  <li><strong>Controllers:</strong> Handle HTTP request/response validation.</li>
  <li><strong>Services:</strong> Encapsulate reusable domain business logic.</li>
  <li><strong>Models:</strong> Define typed Mongoose schemas.</li>
</ul>

<h3>2. Leveraging TypeScript Across the Stack</h3>
<p>Shared interface definitions between the client and server drastically reduce runtime bugs, ensuring API contract reliability.</p>

<h3>Conclusion</h3>
<p>By enforcing clean code boundaries, your codebase remains maintainable, scalable, and easy to test.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'Express', 'Architecture', 'TypeScript'],
    author: 'Dharshinee SD',
    status: 'published',
    publishedAt: new Date(),
    seoTitle: 'Building Scalable Full-Stack Web Applications | Dharshinee SD',
    seoDescription: 'Learn key architectural patterns for building full-stack web applications with React, Node.js, and MongoDB.'
  },
  {
    title: 'Integrating Generative AI into Everyday Web Applications',
    slug: 'integrating-generative-ai-into-web-apps',
    excerpt: 'How developers can harness modern LLM APIs to create dynamic storytelling and automated content systems.',
    content: `
<h2>The Generative AI Revolution</h2>
<p>Generative AI is no longer confined to research laboratories. Front-end and full-stack developers can seamlessly leverage models like Gemini and GPT to elevate user experiences.</p>

<h3>Practical Applications</h3>
<ul>
  <li><strong>Personalized Health Assistants:</strong> Context-aware medication and habit alerts.</li>
  <li><strong>Interactive Story Generators:</strong> Dynamic branching storybooks built on prompt chains.</li>
  <li><strong>Smart Code & Form Helpers:</strong> Real-time automated input suggestions.</li>
</ul>

<h3>Key Considerations</h3>
<p>Always sanitize prompts, maintain rate limiting, and protect your API keys inside environment variables on your backend server.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'Generative AI',
    tags: ['GenAI', 'LLM', 'Web Apps', 'Innovation'],
    author: 'Dharshinee SD',
    status: 'published',
    publishedAt: new Date(),
    seoTitle: 'Integrating Generative AI into Everyday Web Apps | Dharshinee SD',
    seoDescription: 'Discover practical techniques for integrating generative AI into web applications.'
  }
];

export const sampleSiteSettings = {
  theme: {
    primaryColor: '#4f46e5',
    secondaryColor: '#06b6d4',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '0.75rem',
    darkMode: false
  },
  seo: {
    siteTitle: 'Dharshinee SD – Personal Portfolio CMS',
    metaDescription:
      'Dynamic personal portfolio CMS of Dharshinee SD (B.Tech IT Student & Aspiring Full Stack Developer) featuring projects, skills, certifications, articles, and services.',
    keywords: ['Dharshinee SD', 'Full Stack Developer', 'React', 'TypeScript', 'Node.js', 'Portfolio CMS', 'Anna University'],
    ogTitle: 'Dharshinee SD – Personal Portfolio',
    ogDescription: 'Explore full-stack web projects, skills, services, and certifications by Dharshinee SD.',
    ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    canonicalUrl: 'http://localhost:5173'
  },
  socialLinks: {
    github: 'https://github.com/dharshineesd',
    linkedin: 'https://linkedin.com/in/dharshineesd',
    email: 'dharshineesd@gmail.com',
    twitter: '',
    instagram: ''
  },
  contactInfo: {
    email: 'dharshineesd@gmail.com',
    phone: '+91 98765 43210',
    location: 'Tamil Nadu, India',
    officeAddress: 'Anna University Campus, Chennai, Tamil Nadu, India',
    googleMapsEmbed: ''
  },
  enabledSections: {
    about: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    services: true,
    certifications: true,
    achievements: true,
    testimonials: true,
    blog: true,
    resume: true,
    contact: true
  }
};

export const sampleProjects = [
  {
    title: 'AgeWise',
    description:
      'An AI-powered personalized senior care & wellness companion web application with medication reminders, health tracking, and smart voice assistance.',
    fullDescription:
      'AgeWise is an accessible healthcare web application designed specifically for senior citizens. It features simplified high-contrast interfaces, recurring medication schedules, emergency SOS contacts, and voice-assisted interactions.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    category: 'Healthcare & AI',
    githubUrl: 'https://github.com/dharshineesd/agewise',
    liveUrl: 'https://agewise-preview.netlify.app',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    features: ['Real-time medication reminders', 'Speech-to-text navigation', 'Caregiver health dashboard', 'Emergency alert buttons'],
    featured: true,
    sortOrder: 1,
    active: true
  },
  {
    title: 'TimeNow',
    description:
      'A sleek, real-time productivity & task management application featuring Pomodoro timers, habit tracking, and detailed weekly progress analytics.',
    fullDescription:
      'TimeNow enables students and professionals to organize their daily workflows using Pomodoro interval timers, customizable task tags, kanban boards, and interactive progress graphs.',
    technologies: ['React', 'TypeScript', 'Bootstrap', 'Node.js', 'REST API'],
    category: 'Productivity',
    githubUrl: 'https://github.com/dharshineesd/timenow',
    liveUrl: 'https://timenow-tracker.vercel.app',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
    features: ['Configurable Pomodoro timers', 'Weekly productivity charts', 'Custom tags and priority levels'],
    featured: true,
    sortOrder: 2,
    active: true
  },
  {
    title: 'Cryptify',
    description:
      'Real-time cryptocurrency asset tracking dashboard with live price charts, portfolio balance calculation, and market trend indicators.',
    fullDescription:
      'Cryptify aggregates live cryptocurrency market data via CoinGecko REST APIs, rendering interactive price charts with Chart.js and calculating mock portfolio returns in real time.',
    technologies: ['React', 'JavaScript', 'Node.js', 'Bootstrap', 'REST API'],
    category: 'Finance & Web',
    githubUrl: 'https://github.com/dharshineesd/cryptify',
    liveUrl: 'https://cryptify-app.vercel.app',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    features: ['Live pricing websockets', 'Portfolio simulator', 'Interactive candlestick charts'],
    featured: false,
    sortOrder: 3,
    active: true
  },
  {
    title: 'FeedBackFlow',
    description:
      'Multi-channel customer feedback platform enabling automated survey generation, sentiment analysis, and interactive insight visualization for teams.',
    fullDescription:
      'FeedBackFlow lets businesses embed customized survey widgets into any website, automatically analyzes response sentiment using natural language processing, and aggregates actionable KPIs.',
    technologies: ['React', 'Express.js', 'MongoDB', 'Bootstrap'],
    category: 'SaaS & Analytics',
    githubUrl: 'https://github.com/dharshineesd/feedbackflow',
    liveUrl: 'https://feedbackflow.vercel.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: ['Embeddable feedback modals', 'Automated sentiment tagging', 'Exportable CSV analytics'],
    featured: false,
    sortOrder: 4,
    active: true
  },
  {
    title: 'Creative Story Generator using GenAI',
    description:
      'Generative AI interactive storytelling web application creating branching narratives, genre customization, and character dialogue in real time.',
    fullDescription:
      'Leveraging Google Gemini and OpenAI APIs, this application generates branching narrative storybooks where user choices dynamically influence subsequent chapters, illustrations, and plot conclusions.',
    technologies: ['React', 'TypeScript', 'Node.js', 'GenAI', 'Bootstrap'],
    category: 'Generative AI',
    githubUrl: 'https://github.com/dharshineesd/story-generator-genai',
    liveUrl: 'https://genai-storycraft.vercel.app',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    features: ['Dynamic branching plotlines', 'AI character dialogue engine', 'PDF book export feature'],
    featured: true,
    sortOrder: 5,
    active: true
  }
];

export const sampleSkills = [
  // Frontend
  { name: 'HTML', category: 'Frontend', level: 95, yearsOfExperience: 3, icon: 'bi-filetype-html', sortOrder: 1, active: true },
  { name: 'CSS', category: 'Frontend', level: 90, yearsOfExperience: 3, icon: 'bi-filetype-css', sortOrder: 2, active: true },
  { name: 'JavaScript', category: 'Frontend', level: 92, yearsOfExperience: 3, icon: 'bi-filetype-js', sortOrder: 3, active: true },
  { name: 'TypeScript', category: 'Frontend', level: 86, yearsOfExperience: 2, icon: 'bi-filetype-tsx', sortOrder: 4, active: true },
  { name: 'React', category: 'Frontend', level: 88, yearsOfExperience: 2, icon: 'bi-atom', sortOrder: 5, active: true },
  { name: 'Bootstrap', category: 'Frontend', level: 92, yearsOfExperience: 3, icon: 'bi-bootstrap', sortOrder: 6, active: true },
  // Backend & Database
  { name: 'Node.js', category: 'Backend', level: 85, yearsOfExperience: 2, icon: 'bi-terminal', sortOrder: 7, active: true },
  { name: 'Express.js', category: 'Backend', level: 85, yearsOfExperience: 2, icon: 'bi-server', sortOrder: 8, active: true },
  { name: 'MongoDB', category: 'Database', level: 82, yearsOfExperience: 2, icon: 'bi-database', sortOrder: 9, active: true },
  { name: 'REST API', category: 'Backend', level: 90, yearsOfExperience: 2, icon: 'bi-hdd-network', sortOrder: 10, active: true },
  // Languages & Tools
  { name: 'Java', category: 'Languages', level: 80, yearsOfExperience: 2, icon: 'bi-filetype-java', sortOrder: 11, active: true },
  { name: 'Git/GitHub', category: 'Tools', level: 88, yearsOfExperience: 3, icon: 'bi-github', sortOrder: 12, active: true }
];

export const sampleEducation = [
  {
    institution: 'Anna University',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Information Technology',
    location: 'Chennai, Tamil Nadu',
    startYear: '2022',
    endYear: '2026',
    gradeGpa: '8.8 / 10 CGPA',
    description:
      'Relevant coursework includes Data Structures & Algorithms, Object-Oriented Software Design, Database Systems, Web Technology, Cloud Computing, and Computer Networks. Consistently maintaining strong academic standing and participating in technical symposiums.',
    sortOrder: 1
  },
  {
    institution: 'Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC)',
    field: 'Computer Science & Mathematics',
    location: 'Tamil Nadu, India',
    startYear: '2020',
    endYear: '2022',
    gradeGpa: '94.2%',
    description:
      'Graduated with distinction with core focus on Mathematics, Physics, Chemistry, and Computer Science. Recognized for excellence in computer programming competitions.',
    sortOrder: 2
  }
];

export const sampleCertifications = [
  {
    title: 'HTML Certificate',
    issuer: 'CodeChef',
    issueDate: '2023',
    credentialUrl: 'https://www.codechef.com/certificates',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Certified proficiency in HTML5 semantic document structures and web accessibility standards.',
    sortOrder: 1
  },
  {
    title: 'JavaScript Certificate',
    issuer: 'CodeChef',
    issueDate: '2023',
    credentialUrl: 'https://www.codechef.com/certificates',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
    description: 'Demonstrated mastery of ES6+ JavaScript, asynchronous operations, closures, and DOM manipulation.',
    sortOrder: 2
  },
  {
    title: 'AWS Academy Cloud Architecting',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2024',
    credentialUrl: 'https://aws.amazon.com/training/awsacademy/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Architecting resilient, cost-optimized, and secure cloud infrastructures using core AWS services.',
    sortOrder: 3
  }
];

export const sampleExperience = [
  {
    company: 'Tech Innovators Studio',
    position: 'Full Stack Web Developer Intern',
    location: 'Chennai, India',
    startDate: 'Jun 2024',
    endDate: 'Aug 2024',
    currentlyWorking: false,
    description:
      'Engineered responsive client dashboards with React and Bootstrap 5. Created secured REST APIs in Express.js with MongoDB to handle customer onboarding flows. Participated in daily stand-ups and code reviews.',
    responsibilities: [
      'Built reusable TypeScript UI components that boosted development speed by 20%',
      'Designed authenticated REST endpoints using JWT and Express validator',
      'Optimized MongoDB query aggregations for customer dashboard analytics'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap'],
    sortOrder: 1,
    active: true
  },
  {
    company: 'University Developer Club',
    position: 'Frontend Project Lead',
    location: 'Anna University',
    startDate: 'Jan 2024',
    endDate: 'May 2024',
    currentlyWorking: false,
    description:
      'Led a team of 4 student developers to build the official symposium registration web portal serving over 1,200 attendees. Reduced initial page loading time by 30% through asset optimizations.',
    responsibilities: [
      'Coordinated git workflow, pull requests, and weekly sprint planning',
      'Implemented responsive event registration forms with instant client validation'
    ],
    technologies: ['React', 'JavaScript', 'Bootstrap', 'Git'],
    sortOrder: 2,
    active: true
  }
];
