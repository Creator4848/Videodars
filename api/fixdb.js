import { getDb } from "./db.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    try {
        const sql = getDb();
        
        // Ensure admin@admin.com exists
        const adminExists = await sql`SELECT id FROM users WHERE email = 'admin@admin.com'`;
        if (adminExists.length === 0) {
            const hash = await bcrypt.hash("123123*", 10);
            await sql`
                INSERT INTO users (full_name, email, password_hash, role)
                VALUES ('Administrator', 'admin@admin.com', ${hash}, 'admin')
            `;
        } else {
            // update password just in case
            const hash = await bcrypt.hash("123123*", 10);
            await sql`
                UPDATE users SET password_hash = ${hash} WHERE email = 'admin@admin.com'
            `;
        }
        
        return res.status(200).json({ success: true, message: "Admin user admin@admin.com created/updated." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
