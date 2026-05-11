import { getDb } from "./db.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const sql = getDb();

    // Drop existing tables to ensure clean schema (WARNING: destroys data)
    await sql`DROP TABLE IF EXISTS videos`;
    await sql`DROP TABLE IF EXISTS subjects`;
    await sql`DROP TABLE IF EXISTS users`;

    // Create users table
    await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        is_blocked BOOLEAN DEFAULT FALSE
      )
    `;

    // Create subjects table
    await sql`
      CREATE TABLE subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create videos table
    await sql`
      CREATE TABLE videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
        author VARCHAR(255) DEFAULT '',
        youtube_id VARCHAR(100) DEFAULT '',
        level VARCHAR(50) DEFAULT 'Boshlang''ich',
        description TEXT DEFAULT '',
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Seed admin user
    const adminExists = await sql`SELECT id FROM users WHERE email = 'admin@admin.com'`;
    if (adminExists.length === 0) {
      const hash = await bcrypt.hash("123123*", 10);
      await sql`
        INSERT INTO users (full_name, email, password_hash, role)
        VALUES ('Administrator', 'admin@admin.com', ${hash}, 'admin')
      `;
    }

    return res.status(200).json({ success: true, message: "Database initialized successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
