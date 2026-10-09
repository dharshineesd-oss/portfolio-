export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Dharshinee SD – Personal Portfolio REST API',
    version: '1.0.0',
    description:
      'Robust and fully-documented REST API powering the personal portfolio of Dharshinee SD (B.Tech Information Technology Student & Aspiring Full Stack Developer). Built with Express.js, TypeScript, and MongoDB Mongoose.',
    contact: {
      name: 'Dharshinee SD',
      email: 'dharshineesd@gmail.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server'
    }
  ],
  tags: [
    { name: 'Health', description: 'System health check' },
    { name: 'Projects', description: 'Portfolio project showcase and management' },
    { name: 'Skills', description: 'Technical skills and proficiencies' },
    { name: 'Education', description: 'Academic milestones and degrees' },
    { name: 'Certifications', description: 'Industry credentials and certifications' },
    { name: 'Experience', description: 'Work experience, internships, and training' },
    { name: 'Contact', description: 'Contact form submissions and inquiry management' }
  ],
  components: {
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation completed successfully' },
          data: { type: 'object' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Resource not found' },
          error: { type: 'string', example: 'Detailed error trace in development' }
        }
      },
      Project: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '659f1c7d8b9e4a001a1b2c3d' },
          title: { type: 'string', example: 'AgeWise' },
          description: {
            type: 'string',
            example: 'An AI-powered personalized senior care & wellness companion with medication alerts.'
          },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB']
          },
          githubUrl: { type: 'string', example: 'https://github.com/dharshineesd/agewise' },
          liveUrl: { type: 'string', example: 'https://agewise.demo.com' },
          image: { type: 'string', example: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      ProjectInput: {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: { type: 'string', example: 'TimeNow' },
          description: {
            type: 'string',
            example: 'A modern real-time productivity & task management web app.'
          },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'Bootstrap', 'Node.js']
          },
          githubUrl: { type: 'string', example: 'https://github.com/dharshineesd/timenow' },
          liveUrl: { type: 'string', example: 'https://timenow.demo.com' },
          image: { type: 'string', example: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d' }
        }
      },
      Skill: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '659f1c7d8b9e4a001a1b2c4e' },
          name: { type: 'string', example: 'React' },
          category: { type: 'string', example: 'Frontend' },
          level: { type: 'number', minimum: 0, maximum: 100, example: 90 }
        }
      },
      SkillInput: {
        type: 'object',
        required: ['name', 'category'],
        properties: {
          name: { type: 'string', example: 'TypeScript' },
          category: { type: 'string', example: 'Frontend' },
          level: { type: 'number', minimum: 0, maximum: 100, example: 85 }
        }
      },
      Education: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '659f1c7d8b9e4a001a1b2c5f' },
          institution: { type: 'string', example: 'Anna University' },
          degree: { type: 'string', example: 'Bachelor of Technology' },
          field: { type: 'string', example: 'Information Technology' },
          startYear: { type: 'string', example: '2022' },
          endYear: { type: 'string', example: '2026' },
          description: { type: 'string', example: 'Focusing on Data Structures, Web Development, and Cloud Computing.' }
        }
      },
      EducationInput: {
        type: 'object',
        required: ['institution', 'degree', 'field', 'startYear', 'endYear'],
        properties: {
          institution: { type: 'string', example: 'Anna University' },
          degree: { type: 'string', example: 'Bachelor of Technology' },
          field: { type: 'string', example: 'Information Technology' },
          startYear: { type: 'string', example: '2022' },
          endYear: { type: 'string', example: '2026' },
          description: { type: 'string', example: 'Specializing in Web Development & Cloud Systems.' }
        }
      },
      Certification: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '659f1c7d8b9e4a001a1b2c6a' },
          title: { type: 'string', example: 'AWS Academy Cloud Architecting' },
          issuer: { type: 'string', example: 'Amazon Web Services' },
          issueDate: { type: 'string', example: '2024' },
          credentialUrl: { type: 'string', example: 'https://aws.amazon.com/verification' },
          image: { type: 'string', example: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3' }
        }
      },
      CertificationInput: {
        type: 'object',
        required: ['title', 'issuer', 'issueDate'],
        properties: {
          title: { type: 'string', example: 'HTML Certificate' },
          issuer: { type: 'string', example: 'CodeChef' },
          issueDate: { type: 'string', example: '2023' },
          credentialUrl: { type: 'string', example: 'https://www.codechef.com/certificates' },
          image: { type: 'string', example: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766' }
        }
      },
      Experience: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '659f1c7d8b9e4a001a1b2c7b' },
          company: { type: 'string', example: 'Tech Innovators Studio' },
          position: { type: 'string', example: 'Web Development Intern' },
          startDate: { type: 'string', example: 'Jun 2024' },
          endDate: { type: 'string', example: 'Aug 2024' },
          description: { type: 'string', example: 'Developed reusable React components and integrated RESTful APIs.' },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'TypeScript', 'Bootstrap', 'Node.js']
          }
        }
      },
      ExperienceInput: {
        type: 'object',
        required: ['company', 'position', 'startDate'],
        properties: {
          company: { type: 'string', example: 'Tech Solutions Lab' },
          position: { type: 'string', example: 'Full Stack Trainee' },
          startDate: { type: 'string', example: 'Jan 2024' },
          endDate: { type: 'string', example: 'May 2024' },
          description: { type: 'string', example: 'Hands-on project work in MERN stack.' },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['MongoDB', 'Express', 'React', 'Node.js']
          }
        }
      },
      ContactMessage: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '659f1c7d8b9e4a001a1b2c8c' },
          name: { type: 'string', example: 'Alex Johnson' },
          email: { type: 'string', example: 'alex@example.com' },
          subject: { type: 'string', example: 'Project Collaboration Opportunity' },
          message: { type: 'string', example: 'Hi Dharshinee, I saw your portfolio and would like to discuss an opportunity!' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      ContactMessageInput: {
        type: 'object',
        required: ['name', 'email', 'subject', 'message'],
        properties: {
          name: { type: 'string', example: 'Jane Smith' },
          email: { type: 'string', example: 'janesmith@example.com' },
          subject: { type: 'string', example: 'Job Opportunity' },
          message: { type: 'string', example: 'We loved your projects and would like to interview you for a developer role.' }
        }
      }
    }
  },
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API and database health status',
        responses: {
          '200': {
            description: 'API is running and healthy',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        }
      }
    },
    '/api/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Get all portfolio projects (optional filter by technology)',
        parameters: [
          {
            name: 'technology',
            in: 'query',
            description: 'Filter projects by technology name (e.g., React, GenAI)',
            required: false,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Projects fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Projects fetched successfully' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Project' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Projects'],
        summary: 'Create a new project',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProjectInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Project created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Project created successfully' },
                    data: { $ref: '#/components/schemas/Project' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/projects/{id}': {
      get: {
        tags: ['Projects'],
        summary: 'Get single project by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'MongoDB ObjectId of the project',
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Project retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Project retrieved successfully' },
                    data: { $ref: '#/components/schemas/Project' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Project not found'
          }
        }
      },
      put: {
        tags: ['Projects'],
        summary: 'Update an existing project by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProjectInput' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Project updated successfully'
          },
          '404': {
            description: 'Project not found'
          }
        }
      },
      delete: {
        tags: ['Projects'],
        summary: 'Delete a project by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Project deleted successfully'
          },
          '404': {
            description: 'Project not found'
          }
        }
      }
    },
    '/api/skills': {
      get: {
        tags: ['Skills'],
        summary: 'Get all skills',
        responses: {
          '200': {
            description: 'Skills fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Skills fetched successfully' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Skill' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Skills'],
        summary: 'Create a new skill',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SkillInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Skill created successfully'
          }
        }
      }
    },
    '/api/skills/{id}': {
      put: {
        tags: ['Skills'],
        summary: 'Update a skill by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SkillInput' }
            }
          }
        },
        responses: {
          '200': { description: 'Skill updated successfully' },
          '404': { description: 'Skill not found' }
        }
      },
      delete: {
        tags: ['Skills'],
        summary: 'Delete a skill by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Skill deleted successfully' },
          '404': { description: 'Skill not found' }
        }
      }
    },
    '/api/education': {
      get: {
        tags: ['Education'],
        summary: 'Get all education history',
        responses: {
          '200': {
            description: 'Education records fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Education records fetched successfully' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Education' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Education'],
        summary: 'Create education record',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/EducationInput' }
            }
          }
        },
        responses: {
          '201': { description: 'Education created successfully' }
        }
      }
    },
    '/api/education/{id}': {
      put: {
        tags: ['Education'],
        summary: 'Update education record',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/EducationInput' }
            }
          }
        },
        responses: {
          '200': { description: 'Education updated successfully' },
          '404': { description: 'Education not found' }
        }
      },
      delete: {
        tags: ['Education'],
        summary: 'Delete education record',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Education deleted successfully' },
          '404': { description: 'Education not found' }
        }
      }
    },
    '/api/certifications': {
      get: {
        tags: ['Certifications'],
        summary: 'Get all certifications',
        responses: {
          '200': {
            description: 'Certifications fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Certifications fetched successfully' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Certification' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Certifications'],
        summary: 'Create a certification',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CertificationInput' }
            }
          }
        },
        responses: {
          '201': { description: 'Certification created successfully' }
        }
      }
    },
    '/api/certifications/{id}': {
      put: {
        tags: ['Certifications'],
        summary: 'Update certification by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CertificationInput' }
            }
          }
        },
        responses: {
          '200': { description: 'Certification updated successfully' },
          '404': { description: 'Certification not found' }
        }
      },
      delete: {
        tags: ['Certifications'],
        summary: 'Delete certification by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Certification deleted successfully' },
          '404': { description: 'Certification not found' }
        }
      }
    },
    '/api/experience': {
      get: {
        tags: ['Experience'],
        summary: 'Get all experience / internship entries',
        responses: {
          '200': {
            description: 'Experience records fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Experience records fetched successfully' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Experience' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Experience'],
        summary: 'Create experience entry',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ExperienceInput' }
            }
          }
        },
        responses: {
          '201': { description: 'Experience created successfully' }
        }
      }
    },
    '/api/experience/{id}': {
      put: {
        tags: ['Experience'],
        summary: 'Update experience by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ExperienceInput' }
            }
          }
        },
        responses: {
          '200': { description: 'Experience updated successfully' },
          '404': { description: 'Experience not found' }
        }
      },
      delete: {
        tags: ['Experience'],
        summary: 'Delete experience by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Experience deleted successfully' },
          '404': { description: 'Experience not found' }
        }
      }
    },
    '/api/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Submit a new contact message from portfolio website',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactMessageInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Message received and stored successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: {
                      type: 'string',
                      example: 'Thank you! Your message has been sent successfully.'
                    }
                  }
                }
              }
            }
          },
          '400': { description: 'Invalid input or missing fields' }
        }
      },
      get: {
        tags: ['Contact'],
        summary: 'Get all received contact messages (Admin access)',
        responses: {
          '200': {
            description: 'Contact messages fetched successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Contact messages fetched successfully' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/ContactMessage' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/contact/{id}': {
      delete: {
        tags: ['Contact'],
        summary: 'Delete contact message by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Contact message deleted successfully' },
          '404': { description: 'Message not found' }
        }
      }
    }
  }
};
