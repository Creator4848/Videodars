import { getDb } from "./db.js";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();

    try {
        const sql = getDb();
        await sql`ALTER TABLE videos ADD COLUMN IF NOT EXISTS direction VARCHAR(255) DEFAULT ''`;
        return res.status(200).json({ success: true, message: "Migration bajarildi: direction ustuni qo'shildi" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
