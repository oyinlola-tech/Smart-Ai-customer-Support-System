# Smart AI Customer Support System

A full-stack web application that integrates Groq AI to automate customer support, sales responses, product questions, and conversation summarization for small businesses.

## Tech Stack
- Backend: Node.js, Express, Groq API, Lowdb (JSON), Swagger, Helmet, CORS, Rate limiting
- Frontend: React, Tailwind CSS, Axios, React Router

## License
This project is proprietary and not free to use. See `LICENSE` for details.

## Security
Please review `SECURITY.md` for reporting vulnerabilities.

## Setup Instructions
Root (backend + frontend served by backend):
1. npm run install:all
2. npm run dev

Backend (only):
1. cd backend
2. Copy .env.example to .env and update the values.
3. npm install
4. npm start

Frontend (served by backend):
- Open `http://localhost:5000/`
- Client routes: `/chat`, `/sales`, `/intent`, `/product`, `/summary`

Backend runs on http://localhost:5000
Frontend is served by the backend on http://localhost:5000

## Environment Variables
Backend .env file:
- PORT=5000
- GROQ_API_KEY=your_groq_api_key_here
- GROQ_BASE_URL=https://api.groq.com/openai/v1
- MODEL=your_supported_groq_model

## Groq API Setup
- Create a Groq account and generate an API key.
- Add the key to .env under GROQ_API_KEY.

## Swagger
- Open http://localhost:5000/api/docs to test all endpoints.

## Testing Steps
1. Start the backend and frontend.
2. Open the dashboard and try each feature.
3. Check backend data/db.json for stored logs.

## Swagger
Open http://localhost:5000/api/docs to test all endpoints directly in Swagger UI.
