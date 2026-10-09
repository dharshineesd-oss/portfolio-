# Dharshinee SD – Personal Portfolio Web Application

A modern, responsive, and production-ready full-stack portfolio web application built for **Dharshinee SD**, a B.Tech Information Technology student at Anna University and aspiring Full Stack Developer.

This application is built with a decoupled architecture featuring a **React + TypeScript + Bootstrap 5** frontend and an **Express.js + TypeScript + MongoDB (Mongoose)** REST API backend, complete with interactive **Swagger / OpenAPI** documentation and a password-protected **Admin Management Dashboard**.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technologies Used](#technologies-used)
4. [Folder Structure](#folder-structure)
5. [Prerequisites](#prerequisites)
6. [MongoDB Setup](#mongodb-setup)
7. [Environment Variables](#environment-variables)
8. [Installation Steps](#installation-steps)
9. [Database Seeding](#database-seeding)
10. [Running the Application](#running-the-application)
11. [Swagger / OpenAPI Documentation](#swagger--openapi-documentation)
12. [REST API Endpoints Reference](#rest-api-endpoints-reference)
13. [Admin Dashboard](#admin-dashboard)
14. [Production Build](#production-build)

---

## 1. Project Overview

This full-stack web application is designed to showcase Dharshinee SD's engineering background, hands-on development projects, technical skills, academic history, certifications, and career interests.

- **Frontend Client:** Built using React 18, TypeScript, and Bootstrap 5 with responsive layouts, smooth scroll navigation, technology filtering, and instant feedback alerts.
- **Backend Server:** Built using Node.js, Express.js, TypeScript, and Mongoose, providing secured REST APIs with centralized error handling, request validation, and complete Swagger API documentation.
- **Database:** MongoDB stores dynamic portfolio items (projects, skills, education, certifications, experience, and received contact messages).

---

## 2. Key Features

- **Hero Section:** Elegant introduction featuring name, student title, aspiring developer badge, call-to-action buttons, and modern developer avatar.
- **About Section:** Background story, academic department at Anna University, career objectives, and technology focus areas.
- **Interactive Skills Grid:** Categorized skills (Frontend, Backend, Database, Languages, Tools) with proficiency percentages and smooth progress bars.
- **Filterable Projects Showcase:** Real-time technology filters (All, React, TypeScript, Node.js, Express, MongoDB, GenAI), live demo links, and GitHub repository shortcuts.
- **Education Timeline:** Clean milestone cards detailing academic credentials, years, and coursework.
- **Dynamic Certifications:** Validated certificates from CodeChef, AWS Academy, and more with verification links.
- **Experience / Internship Section:** Chronological experience timeline with an automatic empty-state card when seeking new opportunities.
- **Downloadable Resume:** Direct PDF resume download/preview from the client navigation and dedicated resume section.
- **Functional Contact Form:** Front-end form validation, asynchronous REST API submission, database persistence, and feedback notifications.
- **Admin Management Portal:** Dedicated dashboard at `/admin` protected with a passcode allowing full CRUD (Create, Read, Update, Delete) for projects, skills, education, certifications, experience, and reviewing contact messages.
- **Interactive Swagger UI:** Live interactive API sandbox at `http://localhost:5000/api-docs`.

---

## 3. Technologies Used

### Frontend (`/client`)
- **React 18** – Modern UI library with functional components and hooks
- **TypeScript** – Strict type checking and interface contracts
- **Bootstrap 5.3 & Bootstrap Icons** – Responsive grid, typography, cards, and icons
- **Vite** – Ultra-fast development and optimized production bundling
- **React Router 6** – Client-side routing (`/` and `/admin`)
- **Axios** – Centralized HTTP client with interceptors

### Backend (`/server`)
- **Node.js** – Server-side runtime environment
- **Express.js** – RESTful routing and middleware engine
- **TypeScript** – Type-safe backend code
- **MongoDB & Mongoose** – Document database and object data modeling
- **Swagger UI Express & OpenAPI 3.0** – Interactive API documentation
- **CORS & dotenv** – Cross-origin resource sharing and environment management

---

## 4. Folder Structure

```
Antigravity/
├── client/
│   ├── public/
│   │   ├── favicon.svg               # Portfolio brand icon
│   │   └── resume.pdf                # Placeholder resume document
│   ├── src/
│   │   ├── assets/                   # Images and static assets
│   │   ├── components/
│   │   │   ├── About.tsx             # About section
│   │   │   ├── CertificationCard.tsx # Certifications cards
│   │   │   ├── ContactForm.tsx       # Contact form & info
│   │   │   ├── Education.tsx         # Education timeline
│   │   │   ├── Experience.tsx        # Experience & internships
│   │   │   ├── Footer.tsx            # Footer & social links
│   │   │   ├── Hero.tsx              # Hero banner
│   │   │   ├── Navbar.tsx            # Responsive navigation
│   │   │   ├── ProjectCard.tsx       # Single project card
│   │   │   ├── Projects.tsx          # Filterable projects grid
│   │   │   ├── ResumeSection.tsx     # Resume download CTA
│   │   │   └── Skills.tsx            # Skills & progress bars
│   │   ├── pages/
│   │   │   ├── AdminDashboard.tsx    # CRUD Admin Portal
│   │   │   ├── HomePage.tsx          # Main single-page portfolio
│   │   │   └── NotFoundPage.tsx      # 404 Route
│   │   ├── services/
│   │   │   └── api.ts                # Central Axios client
│   │   ├── types/
│   │   │   └── portfolio.types.ts    # TypeScript data models
│   │   ├── App.tsx                   # Main router
│   │   ├── index.css                 # Custom styles & Bootstrap overrides
│   │   └── main.tsx                  # React entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                 # Mongoose connection
│   │   │   └── swagger.ts            # OpenAPI 3.0 specification
│   │   ├── controllers/
│   │   │   ├── certification.controller.ts
│   │   │   ├── contact.controller.ts
│   │   │   ├── education.controller.ts
│   │   │   ├── experience.controller.ts
│   │   │   ├── project.controller.ts
│   │   │   └── skill.controller.ts
│   │   ├── middleware/
│   │   │   ├── error.middleware.ts    # Centralized error & 404 handlers
│   │   │   └── validate.middleware.ts # MongoDB ObjectId & Auth checks
│   │   ├── models/
│   │   │   ├── Certification.ts
│   │   │   ├── ContactMessage.ts
│   │   │   ├── Education.ts
│   │   │   ├── Experience.ts
│   │   │   ├── Project.ts
│   │   │   └── Skill.ts
│   │   ├── routes/
│   │   │   ├── certification.routes.ts
│   │   │   ├── contact.routes.ts
│   │   │   ├── education.routes.ts
│   │   │   ├── experience.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   ├── index.ts
│   │   │   ├── project.routes.ts
│   │   │   └── skill.routes.ts
│   │   ├── services/
│   │   │   ├── certification.service.ts
│   │   │   ├── contact.service.ts
│   │   │   ├── education.service.ts
│   │   │   ├── experience.service.ts
│   │   │   ├── project.service.ts
│   │   │   └── skill.service.ts
│   │   ├── utils/
│   │   │   ├── response.util.ts      # Standard JSON response helpers
│   │   │   ├── seed.ts               # Database seeder script
│   │   │   └── seedData.ts           # Initial portfolio seed dataset
│   │   ├── app.ts                    # Express application setup
│   │   └── server.ts                 # Server entry point
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 5. Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance running on port 27017 or a MongoDB Atlas connection URI.

---

## 6. MongoDB Setup

### Option A: Local MongoDB (Recommended)
Make sure your local MongoDB service is running:
- **Windows**: Verify via PowerShell with `Get-Service -Name "*mongo*"` or start the service from Services (`MongoDB Server`).
- **Connection String**: `mongodb://127.0.0.1:27017/dharshinee_portfolio`

### Option B: MongoDB Atlas (Cloud)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Obtain your connection URI: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/dharshinee_portfolio?retryWrites=true&w=majority`.
3. Paste the connection string into `server/.env`.

---

## 7. Environment Variables

Create or review `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dharshinee_portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development
ADMIN_SECRET=portfolio-admin-secret-2026
```

Optional: In `client/` create `.env` if custom API URL is desired:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 8. Installation Steps

### Step 1: Install Server Dependencies
```bash
cd server
npm install
```

### Step 2: Install Client Dependencies
```bash
cd ../client
npm install
```

---

## 9. Database Seeding

Populate the database with sample projects (AgeWise, TimeNow, Cryptify, FeedBackFlow, GenAI Story Generator), skills, education records, certifications, and experience:

```bash
cd server
npm run seed
```

Output:
```
Connecting to MongoDB at: mongodb://127.0.0.1:27017/dharshinee_portfolio
MongoDB connected successfully. Starting database seeding...
Clearing old collections...
✓ Inserted 5 Projects
✓ Inserted 12 Skills
✓ Inserted 2 Education records
✓ Inserted 3 Certifications
✓ Inserted 2 Experience entries
==============================================
 Database seeding finished successfully!
==============================================
```

---

## 10. Running the Application

### Start the Backend Server (Port 5000)
Open a terminal in the `server` directory:
```bash
cd server
npm run dev
```
The server will start at:
- **API Base:** `http://localhost:5000/api`
- **Health Check:** `http://localhost:5000/api/health`
- **Swagger Documentation:** `http://localhost:5000/api-docs`

### Start the React Client (Port 5173)
Open a second terminal in the `client` directory:
```bash
cd client
npm run dev
```
The portfolio will be live at:
- **Public Portfolio:** `http://localhost:5173`
- **Admin Management Portal:** `http://localhost:5173/admin`

---

## 11. Swagger / OpenAPI Documentation

Interactive Swagger documentation is available at:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

Features in Swagger UI:
- Interactive **"Try it out"** feature for all routes
- Complete request bodies and JSON schema definitions
- Standard status codes (200, 201, 400, 404, 500)
- Example inputs and model structures

---

## 12. REST API Endpoints Reference

All API responses follow the standard format:
```json
{
  "success": true,
  "message": "Projects fetched successfully",
  "data": []
}
```

### Health Check
- `GET /api/health` – Returns server uptime and database connection status.

### Projects
- `GET /api/projects` – List all projects (supports query param `?technology=React`)
- `GET /api/projects/:id` – Retrieve a project by MongoDB ObjectId
- `POST /api/projects` – Create a new project
- `PUT /api/projects/:id` – Update an existing project
- `DELETE /api/projects/:id` – Delete a project

### Skills
- `GET /api/skills` – List all skills sorted by category
- `POST /api/skills` – Create a skill (`name`, `category`, `level`)
- `PUT /api/skills/:id` – Update a skill
- `DELETE /api/skills/:id` – Delete a skill

### Education
- `GET /api/education` – List education entries
- `POST /api/education` – Add an education milestone
- `PUT /api/education/:id` – Update an education milestone
- `DELETE /api/education/:id` – Delete an education milestone

### Certifications
- `GET /api/certifications` – List certifications
- `POST /api/certifications` – Add a certification
- `PUT /api/certifications/:id` – Update a certification
- `DELETE /api/certifications/:id` – Delete a certification

### Experience
- `GET /api/experience` – List internship and work experience
- `POST /api/experience` – Add experience entry
- `PUT /api/experience/:id` – Update experience entry
- `DELETE /api/experience/:id` – Delete experience entry

### Contact Form & Inquiries
- `POST /api/contact` – Submit contact message (`name`, `email`, `subject`, `message`)
- `GET /api/contact` – List all received messages (Admin)
- `DELETE /api/contact/:id` – Delete a message (Admin)

---

## 13. Admin Dashboard

Access the Admin Dashboard at:
👉 **`http://localhost:5173/admin`**

- **Passcode:** `portfolio-admin-secret-2026`
- **Features:**
  - Create, view, edit, and delete any Project, Skill, Education record, Certification, or Experience item.
  - View all user inquiries submitted through the contact form.
  - Delete inquiries after reviewing them.
  - One-click button to jump back to the live public portfolio.

---

## 14. Production Build

To build both client and server for production deployment:

### Build Backend
```bash
cd server
npm run build
npm start
```
Compiles TypeScript files into the `/dist` directory.

### Build Frontend
```bash
cd client
npm run build
npm run preview
```
Compiles static optimized bundles into the `/dist` directory ready for deployment on Vercel, Netlify, or Render.
