# AGENTS.md

## Structure
- `backend/` - NestJS API (port 3000), MySQL via TypeORM
- `frontend/` - Ionic web components (vanilla JS, NOT React/Vue), Vite

For detailed instructions, see:
- `backend/AGENTS.md` - backend commands, setup, and architecture
- `frontend/AGENTS.md` - frontend commands, setup, and architecture

## Quick Reference
- Backend: `cd backend` then `npm run start:dev`
- Frontend: `cd frontend` then `npm run dev`
- Database: MySQL `quero_cafe_bar`, requires `.env` in `backend/`
- XAMPP/MySQL must be running locally
