import { getDb } from "./db.js";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const sql = getDb();
        const users = await sql`
      SELECT id, full_name, email, role, created_at, is_blocked
      FROM users
      ORDER BY created_at DESC
    `;
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
