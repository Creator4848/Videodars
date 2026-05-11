import { useState } from "react";

const C = {
    headerMain: "#1e4d8c",
    accent: "#c8102e",
    lightBlue: "#e8f0f8",
    borderBlue: "#b0c8e8",
    text: "#1a1a2e",
    textMuted: "#4a5568",
    white: "#ffffff",
    tableStripe: "#eef4fc",
};

export default function AuthModal({ onClose, onSuccess, initialTab = "login" }) {
    const [tab, setTab] = useState(initialTab);
    const [form, setForm] = useState({ fullName: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function upd(k, v) { setForm(p => ({ ...p, [k]: v })); setError(""); }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            const action = tab === "login" ? "login" : "register";
            const body = tab === "login"
                ? { email: form.email, password: form.password }
                : { fullName: form.fullName, email: form.email, password: form.password };

            const r = await fetch(`/api/auth?action=${action}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await r.json();
            if (!r.ok) { setError(data.error || "Xato yuz berdi"); return; }
            localStorage.setItem("videolib_user", JSON.stringify(data));
            onSuccess(data);
        } catch {
            setError("Tarmoq xatosi. Qayta urinib ko'ring.");
        } finally { setLoading(false); }
    }

    const inp = { width: "100%", border: `2px solid ${C.borderBlue}`, borderRadius: 6, padding: "11px 14px", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
    const tabStyle = (active) => ({
        flex: 1, padding: "13px", border: "none", cursor: "pointer", fontFamily: "inherit",
        fontSize: 15, fontWeight: active ? 700 : 500, background: active ? C.headerMain : C.lightBlue,
        color: active ? "#fff" : C.textMuted, transition: "all .2s"
    });

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
            <div style={{ background: C.white, borderRadius: 12, width: "min(440px,96vw)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)", overflow: "hidden", border: `2px solid ${C.headerMain}` }}>
                {/* Header */}
                <div style={{ background: C.headerMain, color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 18 }}>🎓 O'quv Videodarslar</span>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>✕</button>
                </div>
                {/* Tabs */}
                <div style={{ display: "flex" }}>
                    <button style={tabStyle(tab === "login")} onClick={() => { setTab("login"); setError(""); }}>Kirish</button>
                    <button style={tabStyle(tab === "register")} onClick={() => { setTab("register"); setError(""); }}>Ro'yxatdan o'tish</button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: "28px 28px 24px" }}>
                    {tab === "register" && (
                        <div style={{ marginBottom: 18 }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.headerMain, marginBottom: 6 }}>Ism Familiya *</label>
                            <input value={form.fullName} onChange={e => upd("fullName", e.target.value)} placeholder="To'liq ismingiz" style={inp} required />
                        </div>
                    )}
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.headerMain, marginBottom: 6 }}>Email *</label>
                        <input type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="email@example.com" style={inp} required />
                    </div>
                    <div style={{ marginBottom: 22 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.headerMain, marginBottom: 6 }}>Parol *</label>
                        <input type="password" value={form.password} onChange={e => upd("password", e.target.value)} placeholder="Parolni kiriting" style={inp} required />
                    </div>
                    {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 6, padding: "10px 14px", color: "#c62828", fontSize: 14, marginBottom: 16, fontWeight: 600 }}>⚠️ {error}</div>}
                    <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "#90a4ae" : C.headerMain, color: "#fff", border: "none", borderRadius: 6, padding: "13px", fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", transition: "all .2s" }}>
                        {loading ? "⏳ Kuting..." : tab === "login" ? "🔐 Kirish" : "✅ Ro'yxatdan o'tish"}
                    </button>
                    {tab === "login" && (
                        <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: C.textMuted }}>
                            Akkauntingiz yo'qmi? <span onClick={() => setTab("register")} style={{ color: C.headerMain, cursor: "pointer", fontWeight: 700 }}>Ro'yxatdan o'ting</span>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
