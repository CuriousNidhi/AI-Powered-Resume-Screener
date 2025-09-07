# AI-Powered Resume Screener
[![CI](https://github.com/CuriousNidhi/AI-Powered-Resume-Screener/actions/workflows/ci.yml/badge.svg)](https://github.com/CuriousNidhi/AI-Powered-Resume-Screener/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

### Stack
- Backend: Java 17, Spring Boot, MongoDB
- Frontend: React + Vite (TypeScript), Tailwind CSS
- AI/NLP: External Resume Parsing API (Affinda optional) with dummy fallback

### Prerequisites
- Java 17
- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017`

### Backend (Spring Boot)
1. Configure MongoDB and parser in `backend/src/main/resources/application.properties`:
```
spring.data.mongodb.uri=mongodb://localhost:27017/resume_screener
parser.provider=dummy # set to 'affinda' to enable API
parser.affinda.apiKey=YOUR_AFFINDA_API_KEY
```
2. Run:
```
cd backend
./mvnw spring-boot:run
```
- Endpoints:
  - POST `/api/resume/upload` (multipart `file`)
  - POST `/api/job/description` `{ title?, text }`
  - POST `/api/match` `{ resumeId, jobId }`
  - POST `/api/match/report` `{ resumeId, jobId }` -> PDF

### Frontend (React)
1. Install and run dev server:
```
cd frontend
npm install
npm run dev
```
2. Navigate to the app (usually `http://localhost:5173`).

### Flow
- Upload resume -> parsed via Affinda (if configured) or dummy extractor -> saved to Mongo.
- Paste job description -> extract skills -> saved to Mongo.
- Compute match -> see score and matched/missing skills -> download PDF.

### Notes
- Dummy parser extracts skills from raw text/filename using a curated list.
- Enable Affinda by setting `parser.provider=affinda` and providing `parser.affinda.apiKey`.
