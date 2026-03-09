SignalScope

A full-stack platform for monitoring emerging news topics and exploring related coverage in real time.

SignalScope collects news from multiple RSS feeds, extracts topics from articles, tracks topic momentum, and presents the results in a clean dashboard designed for quick exploration.

The platform combines automated news ingestion, topic detection, trend scoring, and a modern frontend interface to create a lightweight news intelligence system.

⸻

## Screenshots

<p align="center">
  <img src="assets/dashboard.png" alt="Dashboard" width="90%">
</p>
<p align="center"><em>Main dashboard showing trending topics and live article feed.</em></p>

---

<p align="center">
  <img src="assets/login.png" alt="Login Page" width="90%">
</p>
<p align="center"><em>User authentication interface.</em></p>

---

<p align="center">
  <img src="assets/topics_details.png" alt="Topic Detail" width="90%">
</p>
<p align="center"><em>Topic exploration with related articles.</em></p>

---

<p align="center">
  <img src="assets/alerts.png" alt="Alerts Center" width="90%">
</p>
<p align="center"><em>Alert center showing user notifications.</em></p>

---

<p align="center">
  <img src="assets/articles.png" alt="Latest Articles Feed" width="90%">
</p>
<p align="center"><em>Latest articles aggregated from monitored sources.</em></p>

Features

Live News Aggregation

The system collects articles from external RSS feeds and stores them in the database with metadata such as title, publication time, source, and image.

Topic Detection

Topics are extracted from incoming articles and grouped to identify emerging themes across multiple news sources.

Trending Topic Ranking

Each topic is assigned a trend score based on article frequency and recency. Topics are ranked to highlight the most active stories.

Topic Exploration

Users can select a topic to view related articles and follow coverage across sources.

Latest Article Feed

A continuously updated feed of the most recent articles across all monitored sources.

User Authentication

Secure login system using JWT authentication. Users can access personalized features once logged in.

Saved Topics

Users can bookmark topics they want to follow later.

Alerts

Users receive alerts when monitored topics become active or trending.

Caching

Frequently requested endpoints are cached to improve performance and reduce database load.

⸻

System Overview

SignalScope consists of three main layers:

1. News Ingestion

RSS feeds are periodically fetched and stored as articles.

2. Topic Processing

Articles are analyzed to extract and group topics. Topics accumulate articles and are ranked by activity.

3. API + Frontend

The Django REST API exposes the data, and the React dashboard provides an interface for exploring topics and articles.

⸻

Architecture

RSS Feeds
    │
    ▼
Article Ingestion
    │
    ▼
Topic Extraction
    │
    ▼
Trend Scoring
    │
    ▼
Django REST API
    │
    ▼
React Dashboard


⸻

Technology Stack

Backend
	•	Python
	•	Django
	•	Django REST Framework
	•	JWT Authentication
	•	PostgreSQL / SQLite
	•	RSS parsing
	•	Django caching

Frontend
	•	React
	•	React Router
	•	Axios
	•	TailwindCSS

Infrastructure
	•	Docker
	•	Docker Compose

⸻

API Overview

Topics

GET /api/signals/topics/

Returns trending topics ranked by activity.

GET /api/signals/topics/<topic_name>/

Returns detailed information about a specific topic including related articles.

⸻

Articles

GET /api/news/articles/

Returns the latest ingested articles.

⸻

Authentication

POST /api/auth/login/
POST /api/auth/register/

JWT tokens are used for authenticated endpoints.

⸻

Saved Topics

GET /api/auth/saved-topics/
POST /api/auth/saved-topics/
DELETE /api/auth/saved-topics/<id>/


⸻

Alerts

GET /api/alerts/
PATCH /api/alerts/<id>/

Alerts notify users about important topic activity.

⸻

Running the Project

Clone the repository

git clone https://github.com/yourusername/signalscope.git
cd signalscope


⸻

Backend setup

Create a virtual environment:

python -m venv venv
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py migrate

Start the backend:

python manage.py runserver


⸻

Frontend setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm start


⸻

Environment Variables

Create a .env file if needed.

Example:

SECRET_KEY=your_secret_key
DEBUG=True


⸻

Project Structure

signalscope/
│
├── accounts/
├── alerts/
├── news/
├── signals/
│
├── frontend/
│
├── docker-compose.yml
├── requirements.txt
└── README.md


⸻

Possible Future Improvements

Some ideas for extending the platform:
	•	WebSocket real-time alerts
	•	Advanced topic extraction using NLP
	•	Topic clustering and entity recognition
	•	Email notifications
	•	User dashboards for tracked topics
	•	Scheduled ingestion workers

⸻

Purpose

SignalScope was built as a full-stack project exploring how automated news ingestion and topic detection can power a lightweight intelligence dashboard.

The project demonstrates backend architecture, API design, data processing, and frontend integration within a single system.



