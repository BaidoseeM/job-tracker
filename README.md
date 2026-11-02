# Job Application Tracker

A full-stack app for tracking job applications through every stage, from applied to offer.
Built with TypeScript, Express, and PostgreSQL.

## Tech Stack

- **Language:** TypeScript
- **Backend:** Node.js, Express (REST API)
- **Database:** PostgreSQL
- **Frontend:** React (Vite)

## Features

- Full CRUD REST API for job applications
- Relational PostgreSQL schema with foreign keys and constraints
- Parameterized SQL queries to prevent SQL injection
- Input validation and structured error handling (400 / 404 / 500)
- Typed database rows using TypeScript interfaces and union types
- Secrets stored in environment variables

## API Endpoints

| Method | Route               | Description            |
|--------|---------------------|------------------------|
| GET    | `/applications`     | Get all applications   |
| GET    | `/applications/:id` | Get one application    |
| POST   | `/applications`     | Create an application  |
| PATCH  | `/applications/:id` | Update the status      |
| DELETE | `/applications/:id` | Delete an application  |

## Getting Started

1. Clone the repo and install dependencies:
   ```
   git clone https://github.com/BaidoseeM/job-tracker.git
   cd job-tracker
   npm install
   ```
2. Create a PostgreSQL database called `job_tracker` and run `schema.sql` to create the tables.
3. Create a `.env` file:
   ```
   DB_PASSWORD=your_password
   ```
4. Start the server:
   ```
   npm run dev
   ```
5. In a second terminal, start the frontend:
   ```
   cd client
   npm install
   npm run dev
   ```
   Then open http://localhost:5173