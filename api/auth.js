import { getDb } from "./db.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { action } = req.query;
    const body = req.body;

    try {
        const sql = getDb();

        if (action === "login") {
            const { email, password } = body;
            if (!email || !password) return res.status(400).json({ error: "Email va parol kiritilmagan" });

            const users = await sql`SELECT * FROM users WHERE email = ${email}`;
            if (users.length === 0) return res.status(401).json({ error: "Email yoki parol noto'g'ri" });

            const user = users[0];
            const match = await bcrypt.compare(password, user.password_hash);
            if (!match) return res.status(401).json({ error: "Email yoki parol noto'g'ri" });

            return res.status(200).json({
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role,
                isBlocked: user.is_blocked
            });
        }

        if (action === "register") {
            const { fullName, email, password } = body;
            if (!fullName || !email || !password) return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });
            if (password.length < 6) return res.status(400).json({ error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" });

            const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
            if (existing.length > 0) return res.status(409).json({ error: "Bu email allaqachon ro'yxatdan o'tgan" });

            const hash = await bcrypt.hash(password, 10);
            const result = await sql`
        INSERT INTO users (full_name, email, password_hash, role)
        VALUES (${fullName}, ${email}, ${hash}, 'user')
        RETURNING id, full_name, email, role
      `;
            const user = result[0];
            return res.status(201).json({
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role
            });
        }

        return res.status(400).json({ error: "Noma'lum action" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
