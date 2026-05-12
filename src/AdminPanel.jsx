import { useState, useEffect } from "react";

const C = {
    headerMain: "#1e4d8c", accent: "#5e5088", gold: "#d4a017",
    lightBlue: "#e8f0f8", borderBlue: "#b0c8e8", white: "#ffffff",
    tableStripe: "#eef4fc", text: "#1a1a2e", textMuted: "#4a5568",
    green: "#2e7d32", greenLight: "#e8f5e9",
};

function extractYtId(url) {
    if (!url) return "";
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : url;
}

function AddEditVideoModal({ subjects, videoToEdit, onClose, onSave }) {
    const [form, setForm] = useState({ 
        title: videoToEdit?.title || "", 
        subject_id: videoToEdit?.subject_id || "", 
        author: videoToEdit?.author || "", 
        youtubeUrl: videoToEdit?.youtube_id ? `https://youtu.be/${videoToEdit.youtube_id}` : "", 
        level: videoToEdit?.level || "Boshlang'ich", 
        description: videoToEdit?.description || "" 
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

    async function submit(e) {
        e.preventDefault();
        const errs = {};
        if (!form.title.trim()) errs.title = "Sarlavha kiritilmagan";
        if (!form.subject_id) errs.subject_id = "Fan tanlanmagan";
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        try {
            const method = videoToEdit ? "PUT" : "POST";
            const body = videoToEdit ? { ...form, id: videoToEdit.id } : form;
            const r = await fetch("/api/videos", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await r.json();
            if (!r.ok) { setErrors({ submit: data.error }); return; }
            onSave(data, !!videoToEdit);
        } catch { setErrors({ submit: "Tarmoq xatosi" }); }
        finally { setSaving(false); }
    }

    const ytId = extractYtId(form.youtubeUrl);
    const inp = { width: "100%", border: `1px solid ${C.borderBlue}`, borderRadius: 5, padding: "9px 12px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
    const lbl = { display: "block", fontSize: 13, fontWeight: 700, color: C.headerMain, marginBottom: 5 };

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(3px)" }}>
            <div style={{ background: C.white, borderRadius: 10, width: "min(640px,98vw)", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.3)", border: `2px solid ${C.headerMain}` }}>
                <div style={{ background: C.headerMain, color: "#fff", padding: "14px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 17 }}>{videoToEdit ? "Videoni Tahrirlash" : "Yangi Video Qo'shish"}</span>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>✕</button>
                </div>
                <form onSubmit={submit} style={{ padding: 24, display: "grid", gap: 16 }}>
                    <div>
                        <label style={lbl}>Sarlavha *</label>
                        <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="Video dars sarlavhasi" style={inp} />
                        {errors.title && <div style={{ color: C.accent, fontSize: 12, marginTop: 4 }}>{errors.title}</div>}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <div>
                            <label style={lbl}>Fan *</label>
                            <select value={form.subject_id} onChange={e => upd("subject_id", e.target.value)} style={{ ...inp, paddingRight: 24 }}>
                                <option value="">-- Fan tanlang --</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            {errors.subject_id && <div style={{ color: C.accent, fontSize: 12, marginTop: 4 }}>{errors.subject_id}</div>}
                        </div>
                        <div>
                            <label style={lbl}>Daraja</label>
                            <select value={form.level} onChange={e => upd("level", e.target.value)} style={inp}>
                                {["Boshlang'ich", "O'rta", "Yuqori"].map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={lbl}>Muallif</label>
                        <input value={form.author} onChange={e => upd("author", e.target.value)} placeholder="Prof. A. Nazarov" style={inp} />
                    </div>
                    <div>
                        <label style={lbl}>YouTube havolasi</label>
                        <input value={form.youtubeUrl} onChange={e => upd("youtubeUrl", e.target.value)} placeholder="https://youtu.be/... yoki https://youtube.com/watch?v=..." style={inp} />
                        {ytId && (
                            <div style={{ marginTop: 10, borderRadius: 6, overflow: "hidden", border: `1px solid ${C.borderBlue}` }}>
                                <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen title="preview" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label style={lbl}>Tavsif</label>
                        <textarea rows={3} value={form.description} onChange={e => upd("description", e.target.value)} placeholder="Video dars haqida qisqacha ma'lumot..." style={{ ...inp, resize: "vertical" }} />
                    </div>
                    {errors.submit && <div style={{ background: "#ffebee", border: `1px solid #ef9a9a`, borderRadius: 6, padding: "10px 14px", color: "#c62828", fontSize: 14, fontWeight: 600 }}>{errors.submit}</div>}
                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                        <button type="button" onClick={onClose} style={{ background: C.white, border: `2px solid ${C.borderBlue}`, color: C.textMuted, borderRadius: 5, padding: "10px 26px", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>Bekor qilish</button>
                        <button type="submit" disabled={saving} style={{ background: saving ? "#90a4ae" : C.headerMain, color: "#fff", border: "none", borderRadius: 5, padding: "10px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                            {saving ? "Saqlanmoqda..." : "Saqlash"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AdminPanel({ onLogout, onRefresh }) {
    const [subTab, setSubTab] = useState("videos");
    const [subjects, setSubjects] = useState([]);
    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [selSubject, setSelSubject] = useState("all");
    const [newSubjectName, setNewSubjectName] = useState("");
    const [showAddVideo, setShowAddVideo] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => { loadSubjects(); }, []);
    useEffect(() => { if (subTab === "users") loadUsers(); }, [subTab]);
    useEffect(() => { loadVideos(selSubject); }, [selSubject]);

    async function loadSubjects() {
        try { const d = await (await fetch("/api/subjects")).json(); setSubjects(d); } catch { }
    }
    async function loadVideos(sid) {
        setLoading(true);
        try { 
            const url = sid === "all" ? "/api/videos" : `/api/videos?subject_id=${sid}`;
            const d = await (await fetch(url)).json(); 
            setVideos(d); 
        } catch { } finally { setLoading(false); }
    }
    async function loadUsers() {
        try { const d = await (await fetch("/api/users")).json(); setUsers(d); } catch { }
    }

    async function addSubject() {
        if (!newSubjectName.trim()) return;
        const r = await fetch("/api/subjects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newSubjectName.trim() }) });
        const data = await r.json();
        if (r.ok) {
            setSubjects(p => [...p, data]);
            setNewSubjectName("");
            if (!selSubject) setSelSubject(data);
            flash("Fan qo'shildi ✓");
            if (onRefresh) onRefresh();
        }
    }

    async function deleteSubject(id) {
        if (!confirm("Fanni o'chirishni tasdiqlaysizmi? Unga tegishli barcha videolar ham o'chadi.")) return;
        const r = await fetch(`/api/subjects?id=${id}`, { method: "DELETE" });
        if (r.ok) {
            const updated = subjects.filter(s => s.id !== id);
            setSubjects(updated);
            if (selSubject === id) { setSelSubject("all"); }
            flash("Fan o'chirildi");
            if (onRefresh) onRefresh();
        }
    }

    async function deleteVideo(id) {
        if (!confirm("Videoni o'chirishni tasdiqlaysizmi?")) return;
        const r = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
        if (r.ok) {
            setVideos(p => p.filter(v => v.id !== id));
            flash("Video o'chirildi");
            if (onRefresh) onRefresh();
        }
    }

    function flash(m) { setMsg(m); setTimeout(() => setMsg(""), 2500); }

    const subjectVideos = videos;

    const hdr = (txt) => (
        <div style={{ background: C.headerMain, color: "#fff", padding: "14px 20px", fontSize: 17, fontWeight: 700 }}>{txt}</div>
    );

    const tabBtn = (id, label) => (
        <button onClick={() => setSubTab(id)} style={{
            padding: "12px 28px", border: "none", cursor: "pointer", fontFamily: "inherit",
            fontSize: 15, fontWeight: subTab === id ? 800 : 500,
            background: subTab === id ? C.accent : "#f0f4f8", color: subTab === id ? "#fff" : C.textMuted,
            borderBottom: subTab === id ? `3px solid ${C.accent}` : `3px solid transparent`, transition: "all .2s"
        }}>{label}</button>
    );

    return (
        <div>
            {/* Admin sub-tabs */}
            <div style={{ background: C.white, border: `1px solid ${C.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.07)", marginBottom: 24 }}>
                <div style={{ background: `linear-gradient(135deg,${C.headerMain},#0d3570)`, color: "#fff", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 900, fontSize: 20 }}>Admin Panel</span>
                    <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Chiqish</button>
                </div>
                <div style={{ display: "flex", borderBottom: `2px solid ${C.borderBlue}` }}>
                    {tabBtn("videos", "Videodarslar")}
                    {tabBtn("users", "Foydalanuvchilar")}
                </div>
            </div>

            {/* ... rest of the component ... */}
            {msg && <div style={{ background: C.greenLight, border: `1px solid #a5d6a7`, borderRadius: 6, padding: "10px 18px", color: C.green, fontWeight: 700, marginBottom: 16 }}>{msg}</div>}

            {/* ===== VIDEOS TAB ===== */}
            {subTab === "videos" && (
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, alignItems: "start" }}>
                    {/* Subjects sidebar */}
                    <div style={{ background: C.white, border: `1px solid ${C.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        {hdr("Fanlar")}
                        <div style={{ padding: 14, borderBottom: `1px solid ${C.borderBlue}` }}>
                            <div style={{ display: "flex", gap: 8 }}>
                                <input value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)}
                                    placeholder="Yangi fan nomi" onKeyDown={e => e.key === "Enter" && addSubject()}
                                    style={{ flex: 1, border: `1px solid ${C.borderBlue}`, borderRadius: 5, padding: "8px 10px", fontSize: 14, outline: "none" }} />
                                <button onClick={addSubject} style={{ background: C.headerMain, color: "#fff", border: "none", borderRadius: 5, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>+</button>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setSelSubject("all")} style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.borderBlue}`, cursor: "pointer", background: selSubject === "all" ? C.lightBlue : C.white, borderLeft: selSubject === "all" ? `4px solid ${C.headerMain}` : "4px solid transparent" }}
                                onMouseEnter={e => { if (selSubject !== "all") e.currentTarget.style.background = C.tableStripe; }}
                                onMouseLeave={e => { if (selSubject !== "all") e.currentTarget.style.background = C.white; }}>
                                <span style={{ fontWeight: selSubject === "all" ? 700 : 500, fontSize: 14, color: C.text }}>Barcha videolar</span>
                            </div>
                            {subjects.map(s => (
                                <div key={s.id} onClick={() => setSelSubject(s.id)} style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.borderBlue}`, cursor: "pointer", background: selSubject === s.id ? C.lightBlue : C.white, borderLeft: selSubject === s.id ? `4px solid ${C.headerMain}` : "4px solid transparent" }}
                                    onMouseEnter={e => { if (selSubject !== s.id) e.currentTarget.style.background = C.tableStripe; }}
                                    onMouseLeave={e => { if (selSubject !== s.id) e.currentTarget.style.background = C.white; }}>
                                    <span style={{ fontWeight: selSubject === s.id ? 700 : 500, fontSize: 14, color: C.text }}>{s.name}</span>
                                    <button onClick={ev => { ev.stopPropagation(); deleteSubject(s.id); }} style={{ background: "#ffebee", border: "none", borderRadius: 4, width: 26, height: 26, cursor: "pointer", color: C.accent, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Videos panel */}
                    <div style={{ background: C.white, border: `1px solid ${C.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        <div style={{ background: C.headerMain, color: "#fff", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: 700, fontSize: 17 }}>{selSubject === "all" ? "Barcha videolar" : (subjects.find(s => s.id === selSubject)?.name || "Fanlar")}</span>
                            <button onClick={() => setShowAddVideo(true)} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 5, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>+ Video qo'shish</button>
                        </div>
                        {loading ? (
                            <div style={{ padding: 40, textAlign: "center", color: C.textMuted }}>⏳ Yuklanmoqda...</div>
                        ) : subjectVideos.length === 0 ? (
                            <div style={{ padding: 64, textAlign: "center", color: C.textMuted }}>
                                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Bu fanda hali videolar yo'q</div>
                                <button onClick={() => setShowAddVideo(true)} style={{ background: C.headerMain, color: "#fff", border: "none", borderRadius: 5, padding: "10px 24px", cursor: "pointer", fontWeight: 700 }}>+ Birinchi videoni qo'shing</button>
                            </div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ background: C.tableStripe, borderBottom: `2px solid ${C.borderBlue}` }}>
                                            {["#", "Sarlavha", "Muallif", "Fan", "YouTube", "Amallar"].map((h, i) => (
                                                <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: C.headerMain, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjectVideos.map((v, i) => (
                                            <tr key={v.id} style={{ background: i % 2 === 0 ? C.white : C.tableStripe, borderBottom: `1px solid ${C.borderBlue}` }}>
                                                <td style={{ padding: "12px 16px", fontSize: 13, color: C.textMuted }}>{i + 1}</td>
                                                <td style={{ padding: "12px 16px" }}>
                                                    <div style={{ fontWeight: 700, color: C.headerMain, fontSize: 14 }}>{v.title}</div>
                                                    {v.description && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{v.description.slice(0, 60)}{v.description.length > 60 ? "..." : ""}</div>}
                                                </td>
                                                <td style={{ padding: "12px 16px", fontSize: 13, color: C.textMuted, whiteSpace: "nowrap" }}>{v.author || "—"}</td>
                                                <td style={{ padding: "12px 16px", fontSize: 13, color: C.textMuted }}>
                                                    {v.subject_name || (subjects.find(s => s.id === v.subject_id)?.name || "—")}
                                                </td>
                                                <td style={{ padding: "12px 16px" }}>
                                                    {v.youtube_id ? (
                                                        <a href={`https://youtu.be/${v.youtube_id}`} target="_blank" rel="noreferrer" style={{ color: C.headerMain, fontSize: 12, fontWeight: 600 }}>Ko'rish</a>
                                                    ) : <span style={{ color: C.textMuted, fontSize: 12 }}>—</span>}
                                                </td>
                                                <td style={{ padding: "12px 16px" }}>
                                                    <div style={{ display: "flex", gap: 8 }}>
                                                        <button onClick={() => setEditingVideo(v)} style={{ background: "#e3f2fd", border: "1px solid #90caf9", borderRadius: 4, padding: "5px 12px", cursor: "pointer", color: "#1565c0", fontWeight: 700, fontSize: 13 }}>Tahrirlash</button>
                                                        <button onClick={() => deleteVideo(v.id)} style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 4, padding: "5px 12px", cursor: "pointer", color: "#c62828", fontWeight: 700, fontSize: 13 }}>O'chirish</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ===== USERS TAB ===== */}
            {subTab === "users" && (
                <div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
                        {[
                            ["Jami foydalanuvchilar", users.length, C.headerMain],
                            ["Faol foydalanuvchilar", users.filter(u => !u.is_blocked).length, C.green],
                            ["Adminlar", users.filter(u => u.role === "admin").length, C.accent],
                        ].map(([label, val, color]) => (
                            <div key={label} style={{ background: C.white, border: `1px solid ${C.borderBlue}`, borderTop: `4px solid ${color}`, borderRadius: 8, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color }}>{val}</div>
                                <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600, marginTop: 4 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: C.white, border: `1px solid ${C.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        {hdr("Ro'yxatdan o'tgan foydalanuvchilar")}
                        {users.length === 0 ? (
                            <div style={{ padding: 48, textAlign: "center", color: C.textMuted }}>
                                <div style={{ fontSize: 16 }}>Hali foydalanuvchilar yo'q</div>
                            </div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ background: C.tableStripe, borderBottom: `2px solid ${C.borderBlue}` }}>
                                            {["#", "Ism Familiya", "Email", "Rol", "Ro'yxat sanasi", "Holat"].map((h, i) => (
                                                <th key={i} style={{ padding: "13px 18px", textAlign: "left", fontSize: 13, color: C.headerMain, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, i) => (
                                            <tr key={u.id} style={{ background: i % 2 === 0 ? C.white : C.tableStripe, borderBottom: `1px solid ${C.borderBlue}` }}>
                                                <td style={{ padding: "12px 18px", color: C.textMuted, fontSize: 14 }}>{i + 1}</td>
                                                <td style={{ padding: "12px 18px", fontWeight: 700, color: C.text, fontSize: 14 }}>{u.full_name}</td>
                                                <td style={{ padding: "12px 18px", color: C.textMuted, fontSize: 14 }}>{u.email}</td>
                                                <td style={{ padding: "12px 18px" }}>
                                                    <span style={{ background: u.role === "admin" ? "#fff3e0" : "#e3f2fd", color: u.role === "admin" ? "#e65100" : "#1565c0", border: `1px solid ${u.role === "admin" ? "#ffb74d" : "#90caf9"}`, borderRadius: 3, padding: "2px 10px", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{u.role === "admin" ? "Admin" : "Foydalanuvchi"}</span>
                                                </td>
                                                <td style={{ padding: "12px 18px", fontSize: 13, color: C.textMuted }}>{new Date(u.created_at).toLocaleDateString("uz-UZ")}</td>
                                                <td style={{ padding: "12px 18px" }}>
                                                    <span style={{ background: u.is_blocked ? "#ffebee" : C.greenLight, color: u.is_blocked ? "#c62828" : C.green, border: `1px solid ${u.is_blocked ? "#ef9a9a" : "#a5d6a7"}`, borderRadius: 3, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{u.is_blocked ? "Bloklangan" : "Faol"}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {(showAddVideo || editingVideo) && <AddEditVideoModal subjects={subjects} videoToEdit={editingVideo} onClose={() => { setShowAddVideo(false); setEditingVideo(null); }} onSave={(v, isEdit) => { 
                if (isEdit) {
                    setVideos(p => p.map(vd => vd.id === v.id ? v : vd));
                } else {
                    setVideos(p => [v, ...p]); 
                }
                setShowAddVideo(false); 
                setEditingVideo(null);
                flash(isEdit ? "Video tahrirlandi" : "Video qo'shildi"); 
                if (onRefresh) onRefresh(); 
            }} />}
        </div>
    );
}
