<div align="center">
  <img src="frontend/public/vite.svg" alt="Project Logo" width="120" />
  <h1>AI‑Powered Resume Screener</h1>
  <p><strong>Upload resumes, parse skills, match to job descriptions, and export reports.</strong></p>
  <p>
    <a href="#getting-started">Getting Started</a> ·
    <a href="#features">Features</a> ·
    <a href="#project-structure">Project Structure</a> ·
    <a href="#api">API</a> ·
    <a href="#screenshots">Screenshots</a> ·
    <a href="#roadmap">Roadmap</a> ·
    <a href="#contributing">Contributing</a>
  </p>
  <p>
    <a href="https://github.com/CuriousNidhi/AI-Powered-Resume-Screener/actions/workflows/ci.yml">
      <img alt="CI" src="https://github.com/CuriousNidhi/AI-Powered-Resume-Screener/actions/workflows/ci.yml/badge.svg" />
    </a>
    <a href="LICENSE">
      <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
    </a>
  </p>
</div>

![Java](https://img.shields.io/badge/Java-17-007396?logo=openjdk&style=flat) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&style=flat) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&style=flat) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&style=flat) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&style=flat) ![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&style=flat)

Modern, full‑stack application that parses resumes, extracts skills from job descriptions, computes a match score, and generates a PDF report to streamline hiring workflows.

---

## ✨ Features

- 🧾 Resume upload (PDF/DOCX) with Affinda integration (optional) or built‑in dummy parser
- 🧠 Skill extraction from resumes and job descriptions
- 🎯 Match scoring with matched/missing skills visualization
- 🧾 Exportable PDF match report
- 🔐 Basic authentication pages (Sign In / Sign Up)
- 🎨 Responsive React + Tailwind UI

---

## 🧰 Tech Stack

- Backend: Java 17, Spring Boot, MongoDB
- Frontend: React + Vite (TypeScript), Tailwind CSS
- AI/NLP: Affinda (optional) with curated dummy fallback

---

## 📁 Project Structure

```
backend/
  src/main/java/com/ai/resumescreener/...   Spring Boot services, controllers, repos
  src/main/resources/application.properties  Configuration (MongoDB, parser)
frontend/
  src/                                      React app (pages, components)
  public/                                   Static assets
  ss/                                       Screenshots used in README
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17
- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017`

### Backend (Spring Boot)

1) Configure MongoDB and parser in `backend/src/main/resources/application.properties`:

```
spring.data.mongodb.uri=mongodb://localhost:27017/resume_screener
parser.provider=dummy # set to 'affinda' to enable API
parser.affinda.apiKey=YOUR_AFFINDA_API_KEY
```

2) Run the backend:

```
cd backend
./mvnw spring-boot:run
```

### Frontend (React)

1) Install and run dev server:

```
cd frontend
npm install
npm run dev
```

2) Navigate to the app (usually `http://localhost:5173`).

---

## 🔄 Typical Flow

1. Upload a resume → parsed via Affinda (if configured) or dummy extractor → saved to MongoDB.
2. Paste a job description → skills are extracted → saved to MongoDB.
3. Compute match → view score with matched and missing skills → download PDF report.

---

## 🔌 API

Base URL: `http://localhost:8080/api`

- POST `/resume/upload` (multipart `file`)
- POST `/job/description` `{ title?, text }`
- POST `/match` `{ resumeId, jobId }`
- POST `/match/report` `{ resumeId, jobId }` → PDF

Example:

```bash
curl -X POST http://localhost:8080/api/job/description \
  -H "Content-Type: application/json" \
  -d '{"title":"Backend Engineer","text":"We need Java, Spring Boot, MongoDB"}'
```

---

## 🖼 Screenshots

<p align="center">
  <img src="frontend/ss/Screenshot%202025-09-07%20011337.png" width="360" alt="Home" />
  <img src="frontend/ss/Screenshot%202025-09-07%20011634.png" width="360" alt="Upload & Processing" />
</p>
<p align="center">
  <img src="frontend/ss/Screenshot%202025-09-07%20012949.png" width="360" alt="Results" />
  <img src="frontend/ss/Screenshot%202025-09-07%20014839.png" width="360" alt="Templates" />
</p>

More images are available in `frontend/ss/`.

---

## 🗺 Roadmap

- [ ] Enable Affinda by default with environment config helpers
- [ ] Enhanced analytics and visualization for match scoring
- [ ] Docker setup for backend + frontend
- [ ] Cloud deployment (Render/Fly/Heroku/AWS)
- [ ] Role‑based access and improved auth flows
- [ ] Integration tests and E2E tests

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome"`
4. Push: `git push origin feat/awesome`
5. Open a Pull Request

Coding style: keep components modular, use semantic HTML, and ensure accessible aria attributes.

---

## 📄 License

Licensed under the MIT License. See `LICENSE` for details.

---

## 🙌 Acknowledgements

- Spring Boot, React, Vite, and Tailwind teams
- Affinda (optional parser) and the open‑source community
