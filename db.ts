import pg from "pg";

export const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "job_tracker",
});

