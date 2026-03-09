# SignalScope

A full-stack platform for monitoring emerging news topics and exploring related coverage in real time.

SignalScope collects articles from RSS feeds, extracts topics, tracks topic momentum, and provides a clean dashboard for exploring news signals.

---

# Screenshots

## Dashboard

<p align="center">
<img src="assets/dashboard.png" width="90%">
</p>

## Login

<p align="center">
<img src="assets/login.png" width="90%">
</p>

## Topic & Detail

<p align="center">
<img src="assets/topics_details.png" width="90%">
</p>

## Alerts Center

<p align="center">
<img src="assets/alerts.png" width="90%">
</p>

## Articles Feed

<p align="center">
<img src="assets/articles.png" width="90%">
</p>

---

# Features

- RSS news ingestion
- Topic detection from articles
- Trending topic ranking
- Topic exploration with related articles
- Latest article feed
- User authentication (JWT)
- Saved topics
- Topic alerts
- Cached API responses

---

# Architecture

RSS Feeds
↓
Article Ingestion
↓
Topic Detection
↓
Trend Scoring
↓
Django REST API
↓
React Dashboard

---

# Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL / SQLite
- Redis
- Celery
- Docker

### Frontend
- React
- Axios
- TailwindCSS

---

# API Endpoints

### Topics

GET /api/signals/topics/
GET /api/signals/topics/<topic_name>/

### Articles

GET /api/news/articles/

### Authentication

POST /api/auth/login/
POST /api/auth/register/

### Saved Topics

GET /api/auth/saved-topics/
POST /api/auth/saved-topics/
DELETE /api/auth/saved-topics//

### Alerts

GET /api/alerts/
PATCH /api/alerts//

---

# Running the Project

Clone the repository:

git clone https://github.com/Mirzaei44/signalscope.git
cd signalscope

Install backend dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py migrate

Start backend:

python manage.py runserver

Frontend:

cd frontend
npm install
npm run dev

---

# Project Structure

signalscope
│
├── accounts
├── alerts
├── ingestion
├── news
├── signals
│
├── frontend
│
├── assets
│
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── README.md

---

# Purpose

SignalScope explores how automated news ingestion and topic detection can power a lightweight news intelligence dashboard.

The project demonstrates backend architecture, API design, background processing, and frontend integration.
