# Daycare Management Portal

Management portal built for the **Indiana State University Early Childhood Education Center** — replacing manual paperwork with a centralized web app for staff and families.

## What it does

- **Children** — register children, view the roster.
- **Enrollments** — enroll children in programs (infant, toddler, preschool), track status.
- **Schedule** — weekly schedule view of activities per program.

Staff use it for enrollment, scheduling, and day-to-day communication instead of paper forms.

## Project structure

```
├── backend/
│   ├── app.py             # Flask REST API (children, enrollments, schedule)
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        └── App.jsx        # roster, enrollment form, schedule views
```

## Tech stack

- **Backend:** Flask (Python), MongoDB (pymongo)
- **Frontend:** React + Vite

## How to run

```bash
# Backend (needs MongoDB on localhost:27017)
cd backend
pip install -r requirements.txt
python app.py   # serves API on http://localhost:5000

# Frontend
cd frontend
npm install
npm run dev     # opens on http://localhost:5173
```
