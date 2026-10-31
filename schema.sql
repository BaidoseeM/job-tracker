CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Applied',
  applied_date DATE DEFAULT CURRENT_DATE,
  job_link TEXT,
  location TEXT,
  remote BOOLEAN DEFAULT false,
  salary INTEGER,
  notes TEXT
);