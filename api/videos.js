import { getDb } from "./db.js";

function extractYoutubeId(url) {
    if (!url) return "";
    // Already just an ID
    if (!url.includes("/") && !url.includes(".")) return url;
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
        /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return url;
}

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    try {
        const sql = getDb();

        if (req.method === "GET") {
            const { subject_id } = req.query;
            let videos;
            if (subject_id) {
                videos = await sql`
          SELECT v.*, s.name as subject_name
          FROM videos v
          LEFT JOIN subjects s ON v.subject_id = s.id
          WHERE v.subject_id = ${subject_id}
          ORDER BY v.created_at DESC
        `;
            } else {
                videos = await sql`
          SELECT v.*, s.name as subject_name
          FROM videos v
          LEFT JOIN subjects s ON v.subject_id = s.id
          ORDER BY v.created_at DESC
        `;
            }
            return res.status(200).json(videos);
        }

        if (req.method === "POST") {
            const { title, subject_id, author, youtubeUrl, level, description } = req.body;
            if (!title || !subject_id) return res.status(400).json({ error: "Sarlavha va fan majburiy" });

            const youtubeId = extractYoutubeId(youtubeUrl || "");
            const result = await sql`
        INSERT INTO videos (title, subject_id, author, youtube_id, level, description)
        VALUES (${title}, ${subject_id}, ${author || ""}, ${youtubeId}, ${level || "Boshlang'ich"}, ${description || ""})
        RETURNING *
      `;
            return res.status(201).json(result[0]);
        }

        if (req.method === "PUT") {
            const { id, title, subject_id, author, youtubeUrl, level, description } = req.body;
            if (!id || !title || !subject_id) return res.status(400).json({ error: "ID, sarlavha va fan majburiy" });

            const youtubeId = extractYoutubeId(youtubeUrl || "");
            const result = await sql`
        UPDATE videos 
        SET title = ${title}, subject_id = ${subject_id}, author = ${author || ""}, youtube_id = ${youtubeId}, level = ${level || "Boshlang'ich"}, description = ${description || ""}
        WHERE id = ${id}
        RETURNING *
      `;
            if (!result || result.length === 0) return res.status(404).json({ error: "Video topilmadi" });
            return res.status(200).json(result[0]);
        }

        if (req.method === "DELETE") {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: "ID kiritilmagan" });
            await sql`DELETE FROM videos WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
