import { getDb } from "./db.js";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    try {
        const sql = getDb();

        if (req.method === "GET") {
            const subjects = await sql`SELECT * FROM subjects ORDER BY created_at ASC`;
            return res.status(200).json(subjects);
        }

        if (req.method === "POST") {
            const { name } = req.body;
            if (!name || !name.trim()) return res.status(400).json({ error: "Fan nomi kiritilmagan" });
            const result = await sql`
        INSERT INTO subjects (name) VALUES (${name.trim()}) RETURNING *
      `;
            return res.status(201).json(result[0]);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: "ID kiritilmagan" });
            await sql`DELETE FROM subjects WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
