import { getDb } from "./db.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    try {
        const sql = getDb();
        
        // Make old columns nullable so they don't break INSERT for registration
        try { await sql`ALTER TABLE users ALTER COLUMN name DROP NOT NULL`; } catch (e) { console.error(e); }
        try { await sql`ALTER TABLE users ALTER COLUMN username DROP NOT NULL`; } catch (e) { console.error(e); }
        try { await sql`ALTER TABLE users ALTER COLUMN phone DROP NOT NULL`; } catch (e) { console.error(e); }
        
        // Ensure admin@admin.com exists and has the correct password
        const adminExists = await sql`SELECT id FROM users WHERE email = 'admin@admin.com'`;
        const hash = await bcrypt.hash("123123*", 10);
        
        if (adminExists.length === 0) {
            await sql`
                INSERT INTO users (full_name, email, password_hash, role)
                VALUES ('Administrator', 'admin@admin.com', ${hash}, 'admin')
            `;
        } else {
            await sql`
                UPDATE users SET password_hash = ${hash}, role = 'admin' WHERE email = 'admin@admin.com'
            `;
        }

        return res.status(200).json({ success: true, message: "Registration fixed and Admin added." });
    } catch (err) {
        return res.status(500).json({ error: err.message, stack: err.stack });
    }
}
