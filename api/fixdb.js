import { getDb } from "./db.js";

export default async function handler(req, res) {
    try {
        const sql = getDb();
        const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'users'`;
        
        const colNames = cols.map(c => c.column_name);
        
        if (!colNames.includes('full_name')) {
            if (colNames.includes('fullname')) {
                await sql`ALTER TABLE users RENAME COLUMN fullname TO full_name`;
            } else {
                await sql`ALTER TABLE users ADD COLUMN full_name VARCHAR(255) DEFAULT 'User'`;
            }
        }
        if (!colNames.includes('is_blocked')) {
            await sql`ALTER TABLE users ADD COLUMN is_blocked BOOLEAN DEFAULT FALSE`;
        }
        
        return res.status(200).json({ success: true, oldColumns: colNames, fixed: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
