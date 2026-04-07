# Smart AI Customer Support Backend

## Overview
Node.js + Express API that integrates Groq AI for customer support automation, intent detection, sales replies, product Q&A, and conversation summarization.

## Tech Stack
- Node.js
- Express
- Groq API (OpenAI compatible)
- Lowdb (JSON database)
- Swagger
- Helmet, CORS, Rate limiting

## Setup
1. Copy the env example file to .env and add your Groq API key.
2. Install dependencies: npm install
3. Start the server: npm start

## API Docs
Swagger UI is available at http://localhost:5000/api/docs

## Model Configuration
Set `MODEL` in your `.env` to a currently supported Groq model.

## Frontend
The static frontend is served by the backend at http://localhost:5000/
Client routes: /chat, /sales, /intent, /product, /summary

## WhatsApp Integration
1. Set `WA_ENABLED=true` in `.env`.
2. Set `WA_OWNER_NUMBER` in `.env` with your WhatsApp number (include country code).
3. Start the backend.
4. Call `POST /api/whatsapp/start` to generate a QR code in the terminal.
5. Scan the QR code using WhatsApp.
6. Send a message from the owner number to complete setup prompts.
