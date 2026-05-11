import { useState, useEffect, useRef } from "react";

const COLORS = {
  headerTop: "#1a3a6b",
  headerMain: "#1e4d8c",
  navBg: "#154a8a",
  navHover: "#0d3570",
  accent: "#c8102e",
  accentLight: "#e8173a",
  gold: "#d4a017",
  bodyBg: "#f5f5f0",
  white: "#ffffff",
  lightBlue: "#e8f0f8",
  borderBlue: "#b0c8e8",
  text: "#1a1a2e",
  textMuted: "#4a5568",
  footerBg: "#1a3a6b",
  footerText: "#c8d8f0",
  tableStripe: "#eef4fc",
  sectionBorder: "#1e4d8c",
};

const CATEGORIES = ["Barchasi", "Tabiiy fanlar", "Ijtimoiy fanlar", "Texnologiya", "San'at va madaniyat", "Tillar", "Tarix", "Iqtisodiyot"];

const VIDEOS = [
  { id: 1, title: "Python dasturlash tilining asoslari", category: "Texnologiya", author: "Prof. A. Nazarov", institution: "Toshkent DTexnika Unv.", date: "2026-02-15", duration: "2:15:30", views: 12400, level: "Boshlang'ich", format: "MP4", size: "1.2 GB", description: "Python dasturlash tilini noldan o'rganish kursi. O'zgaruvchilar, sikllar, funksiyalar va ob'ektga yo'naltirilgan dasturlash.", enrolled: true, progress: 65, lessons: 24 },
  { id: 2, title: "O'zbek adabiyoti tarixi (XIX-XX asr)", category: "Ijtimoiy fanlar", author: "Prof. M. Qodirov", institution: "O'zMU", date: "2026-01-20", duration: "4:30:00", views: 8900, level: "O'rta", format: "MP4", size: "2.1 GB", description: "O'zbek adabiyotining XIX-XX asrdagi rivojlanish bosqichlari, yirik adiblar ijodi va asarlarining tahlili.", enrolled: false, progress: 0, lessons: 36 },
  { id: 3, title: "Oliy matematika: Integral hisobi", category: "Tabiiy fanlar", author: "Dots. N. Rahimov", institution: "Toshkent DTexnika Unv.", date: "2025-12-10", duration: "5:45:00", views: 15600, level: "O'rta", format: "MP4", size: "3.0 GB", description: "Oliy matematik integral hisobi: aniq va noaniq integrallar, Riemann integrali, ilovalar.", enrolled: true, progress: 40, lessons: 48 },
  { id: 4, title: "O'zbekiston tarixi: Mustaqillik davri", category: "Tarix", author: "Prof. U. Mirzayev", institution: "Milliy Unversitet", date: "2025-11-05", duration: "3:20:00", views: 21300, level: "Boshlang'ich", format: "MP4", size: "1.8 GB", description: "O'zbekiston mustaqillikka erishishi, davlat qurish jarayoni va ijtimoiy-iqtisodiy islohotlar tarixi.", enrolled: true, progress: 90, lessons: 28 },
  { id: 5, title: "Ingliz tili: IELTS tayyorgarlik", category: "Tillar", author: "Dots. K. Hasanova", institution: "UZXUMO", date: "2026-03-01", duration: "6:00:00", views: 18500, level: "Yuqori", format: "MP4", size: "3.5 GB", description: "IELTS imtihoniga keng qamrovli tayyorgarlik. Speaking, Writing, Reading, Listening bo'limlari.", enrolled: false, progress: 0, lessons: 54 },
  { id: 6, title: "Iqtisodiyot nazariyasi asoslari", category: "Iqtisodiyot", author: "Prof. J. Karimov", institution: "TDIU", date: "2025-10-18", duration: "4:10:00", views: 9200, level: "Boshlang'ich", format: "MP4", size: "2.3 GB", description: "Makro va mikroiqtisodiyot asosiy tushunchalari, bozor mexanizmlari, talab va taklif nazariyasi.", enrolled: false, progress: 0, lessons: 32 },
  { id: 7, title: "Tasviriy san'at: Akvarell texnikasi", category: "San'at va madaniyat", author: "F. Rahimova", institution: "O'zDSAI", date: "2026-01-08", duration: "3:50:00", views: 6700, level: "Boshlang'ich", format: "MP4", size: "2.0 GB", description: "Akvarell bo'yoqlari bilan ishlash texnikasi, ranglar nazariyasi, naturmort va peyzaj chizish.", enrolled: false, progress: 0, lessons: 30 },
  { id: 8, title: "Kvant fizikasi va zamonaviy texnologiyalar", category: "Tabiiy fanlar", author: "Prof. S. Ergashev", institution: "O'zFA", date: "2025-09-25", duration: "5:20:00", views: 4800, level: "Yuqori", format: "MP4", size: "2.8 GB", description: "Kvant mexanikasi asoslari, fotonlar, elektronlar va zamonaviy elektronika texnologiyalari.", enrolled: false, progress: 0, lessons: 42 },
];

const STATS = [
  { label: "Video darsliklar", value: "1,250+", icon: "🎬" },
  { label: "Ro'yxatdan o'tgan foydalanuvchilar", value: "48,300+", icon: "👥" },
  { label: "O'quv soatlari", value: "3,600+", icon: "⏱" },
  { label: "Muassasalar", value: "120+", icon: "🏛️" },
];

const NOTICES = [
  { id: 1, type: "E'lon", title: "2026-yil 15-mayda \"Raqamli ta'lim\" mavzusida onlayn konferensiya bo'lib o'tadi", date: "10.05.2026" },
  { id: 2, type: "Yangilik", title: "Yangi 85 ta video darslik fondimizga qo'shildi – Iqtisodiyot yo'nalishi", date: "08.05.2026" },
  { id: 3, type: "E'lon", title: "Foydalanuvchilar uchun yangi shaxsiy kabinet funksiyalari ishga tushirildi", date: "05.05.2026" },
  { id: 4, type: "Yangilik", title: "\"Texnologiya\" bo'limi yangi kurslar bilan to'ldirildi", date: "01.05.2026" },
];

function LevelBadge({ level }) {
  const map = { "Boshlang'ich": ["#2e7d32", "#e8f5e9"], "O'rta": ["#1565c0", "#e3f2fd"], "Yuqori": ["#c62828", "#ffebee"] };
  const [color, bg] = map[level] || ["#555", "#eee"];
  return <span style={{ background: bg, color, border: `1px solid ${color}44`, borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{level}</span>;
}

function CategoryTag({ cat }) {
  return <span style={{ background: COLORS.lightBlue, color: COLORS.headerMain, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "2px 8px", fontSize: 11 }}>{cat}</span>;
}

function VideoRow({ video, onClick, idx }) {
  return (
    <tr style={{ background: idx % 2 === 0 ? COLORS.white : COLORS.tableStripe, cursor: "pointer" }}
      onMouseEnter={e => e.currentTarget.style.background = "#dbeafe"}
      onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? COLORS.white : COLORS.tableStripe}
      onClick={() => onClick(video)}>
      <td style={{ padding: "10px 14px", fontSize: 13, color: COLORS.textMuted, textAlign: "center", width: 40 }}>{idx + 1}</td>
      <td style={{ padding: "10px 14px" }}>
        <div style={{ fontWeight: 600, color: COLORS.headerMain, fontSize: 14, marginBottom: 3 }}>{video.title}</div>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>{video.author} — {video.institution}</div>
      </td>
      <td style={{ padding: "10px 14px", textAlign: "center" }}><CategoryTag cat={video.category} /></td>
      <td style={{ padding: "10px 14px", textAlign: "center" }}><LevelBadge level={video.level} /></td>
      <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 13, color: COLORS.textMuted }}>{video.duration}</td>
      <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 13, color: COLORS.textMuted }}>{video.views.toLocaleString()}</td>
      <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 12, color: COLORS.textMuted }}>{video.date}</td>
      <td style={{ padding: "10px 14px", textAlign: "center" }}>
        {video.enrolled
          ? <span style={{ color: "#2e7d32", fontSize: 12, fontWeight: 600 }}>✓ Yozilgan</span>
          : <button style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>Ko'rish</button>}
      </td>
    </tr>
  );
}

function VideoModal({ video, onClose, onEnroll }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: COLORS.white, border: `2px solid ${COLORS.headerMain}`, borderRadius: 4, width: "min(800px, 100%)", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        {/* Modal header */}
        <div style={{ background: COLORS.headerMain, color: "#fff", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Video Darslik Ma'lumotlari</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        {/* Red title bar */}
        <div style={{ background: COLORS.accent, color: "#fff", padding: "10px 20px" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{video.title}</div>
        </div>
        <div style={{ padding: 24 }}>
          {/* Video details table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
            <tbody>
              {[
                ["Muallif", video.author],
                ["Muassasa", video.institution],
                ["Kategoriya", video.category],
                ["Daraja", video.level],
                ["Davomiyligi", video.duration],
                ["Darslar soni", video.lessons + " ta"],
                ["Format", video.format],
                ["Hajm", video.size],
                ["Qo'shilgan sana", video.date],
                ["Ko'rilgan", video.views.toLocaleString() + " marta"],
              ].map(([k, v], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? COLORS.tableStripe : COLORS.white }}>
                  <td style={{ padding: "8px 14px", fontWeight: 600, color: COLORS.headerMain, fontSize: 13, width: 180, borderRight: `1px solid ${COLORS.borderBlue}` }}>{k}</td>
                  <td style={{ padding: "8px 14px", fontSize: 13, color: COLORS.text }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Description */}
          <div style={{ background: COLORS.lightBlue, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: 14, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, color: COLORS.headerMain, marginBottom: 6, fontSize: 13 }}>Tavsif:</div>
            <p style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{video.description}</p>
          </div>
          {/* Progress if enrolled */}
          {video.enrolled && (
            <div style={{ background: "#e8f5e9", border: "1px solid #c8e6c9", borderRadius: 4, padding: 14, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#2e7d32", fontWeight: 600, fontSize: 13 }}>Sizning davomatingiz</span>
                <span style={{ color: "#2e7d32", fontWeight: 700 }}>{video.progress}%</span>
              </div>
              <div style={{ background: "#c8e6c9", borderRadius: 2, height: 8 }}>
                <div style={{ background: "#2e7d32", height: "100%", borderRadius: 2, width: `${video.progress}%` }} />
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={onClose} style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, color: COLORS.textMuted, borderRadius: 3, padding: "8px 20px", fontSize: 13, cursor: "pointer" }}>Yopish</button>
            {video.enrolled
              ? <button style={{ background: "#2e7d32", color: "#fff", border: "none", borderRadius: 3, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>▶ Davom ettirish</button>
              : <button onClick={() => { onEnroll(video.id); onClose(); }} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Ro'yxatdan o'tish</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIModal({ onClose }) {
  const [messages, setMessages] = useState([{ role: "assistant", text: "Assalomu alaykum! O'quv videodarslar kutubxonasiga xush kelibsiz. Sizga qanday yordam bera olaman?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    setMessages(p => [...p, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const hist = messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Sen O'quv videodarslar kutubxonasining virtual yordamchisisisan. O'zbek tilida xushmuomala va rasmiy tarzda javob ber. Kurs tanlash, mavzular bo'yicha yo'riqnoma berish, o'quv rejalari tuzish bo'yicha yordam ko'rsat. Platformada texnologiya, matematika, tarix, til, iqtisodiyot, san'at, tabiiy fanlar kurslari mavjud.",
          messages: [...hist, { role: "user", content: msg }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Xatolik yuz berdi.";
      setMessages(p => [...p, { role: "assistant", text }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", text: "Tarmoq xatosi. Iltimos qayta urinib ko'ring." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: COLORS.white, border: `2px solid ${COLORS.headerMain}`, borderRadius: 4, width: "min(520px, 95vw)", maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ background: COLORS.headerMain, color: "#fff", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>🤖 Virtual Yordamchi — AI Xizmati</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && <span style={{ fontSize: 18, marginRight: 8, alignSelf: "flex-end" }}>🏛️</span>}
              <div style={{ maxWidth: "78%", background: m.role === "user" ? COLORS.headerMain : COLORS.lightBlue, color: m.role === "user" ? "#fff" : COLORS.text, border: m.role === "user" ? "none" : `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "10px 14px", fontSize: 13, lineHeight: 1.6 }}>{m.text}</div>
            </div>
          ))}
          {loading && <div style={{ display: "flex" }}><span style={{ fontSize: 18, marginRight: 8 }}>🏛️</span><div style={{ background: COLORS.lightBlue, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "10px 14px", fontSize: 13, color: COLORS.textMuted }}>Javob tayyorlanmoqda...</div></div>}
          <div ref={endRef} />
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.borderBlue}`, padding: 12, display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Savolingizni yozing..." style={{ flex: 1, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "8px 12px", fontSize: 13, outline: "none" }} />
          <button onClick={send} disabled={loading} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Yuborish</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [videos, setVideos] = useState(VIDEOS);
  const [activeTab, setActiveTab] = useState("main");
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [mobileMenu, setMobileMenu] = useState(false);

  function enroll(id) { setVideos(prev => prev.map(v => v.id === id ? { ...v, enrolled: true } : v)); }

  const filtered = videos
    .filter(v => activeCategory === "Barchasi" || v.category === activeCategory)
    .filter(v => v.title.toLowerCase().includes(search.toLowerCase()) || v.author.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "date" ? b.date.localeCompare(a.date) : sortBy === "views" ? b.views - a.views : a.title.localeCompare(b.title));

  const enrolled = videos.filter(v => v.enrolled);

  const NAV = [
    { id: "main", label: "Bosh sahifa" },
    { id: "catalog", label: "Video darsliklar" },
    { id: "my", label: "Mening o'quv zalim" },
    { id: "about", label: "Kutubxona haqida" },
    { id: "contact", label: "Bog'lanish" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bodyBg, fontFamily: "'Times New Roman', Georgia, serif", color: COLORS.text }}>

      {/* TOP BAR */}
      <div style={{ background: COLORS.headerTop, color: "#c8d8f0", fontSize: 12, padding: "4px 0", borderBottom: "1px solid #0d2a52" }}>
        <div style={{ width: "100%", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
          <span>O'quv Videodarslar Kutubxonasi</span>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ cursor: "pointer" }} onClick={() => setShowAI(true)}>🤖 Virtual Yordamchi</span>
            <span>Kirish</span>
            <span>Ro'yxatdan o'tish</span>
            <span>O'z | Ру | En</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header style={{ background: COLORS.headerMain, borderBottom: `3px solid ${COLORS.accent}` }}>
        <div style={{ width: "100%", padding: "16px 32px", display: "flex", alignItems: "center", gap: 20, boxSizing: "border-box" }}>
          <div style={{ width: 64, height: 64, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, border: "3px solid #fff" }}>🎓</div>
          <div>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>O'quv Videodarslar Kutubxonasi</h1>
            <div style={{ color: "#b8d0f0", fontSize: 13, marginTop: 4 }}>Sifatli ta'lim resurslari markazi</div>
          </div>
          {/* Search */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 3, overflow: "hidden", maxWidth: 360, width: "100%" }}>
              <select style={{ background: COLORS.navBg, color: "#fff", border: "none", padding: "8px 8px", fontSize: 12, cursor: "pointer", outline: "none" }}>
                <option>Umumiy qidiruv</option>
                <option>Sarlavha</option>
                <option>Muallif</option>
                <option>Kategoriya</option>
              </select>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidiruv..." style={{ flex: 1, background: "#fff", border: "none", padding: "8px 10px", fontSize: 13, outline: "none" }} />
              <button onClick={() => setActiveTab("catalog")} style={{ background: COLORS.accent, color: "#fff", border: "none", padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>🔍</button>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav style={{ background: COLORS.navBg, borderBottom: `1px solid ${COLORS.navHover}` }}>
        <div style={{ width: "100%", padding: "0 32px", display: "flex", boxSizing: "border-box" }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ background: activeTab === item.id ? COLORS.accent : "none", color: "#fff", border: "none", padding: "12px 20px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", borderRight: "1px solid rgba(255,255,255,0.1)", fontWeight: activeTab === item.id ? 700 : 400, transition: "background 0.15s" }}
              onMouseEnter={e => { if (activeTab !== item.id) e.currentTarget.style.background = COLORS.navHover; }}
              onMouseLeave={e => { if (activeTab !== item.id) e.currentTarget.style.background = "none"; }}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "6px 0" }}>
        <div style={{ width: "100%", padding: "0 32px", fontSize: 12, color: COLORS.textMuted, boxSizing: "border-box" }}>
          🏠 <span style={{ color: COLORS.headerMain, cursor: "pointer" }} onClick={() => setActiveTab("main")}>Bosh sahifa</span>
          {activeTab !== "main" && <> &gt; <span style={{ color: COLORS.headerMain }}>{NAV.find(n => n.id === activeTab)?.label}</span></>}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ width: "100%", padding: "20px 32px", boxSizing: "border-box" }}>

        {/* ===== BOSH SAHIFA ===== */}
        {activeTab === "main" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
            <div>
              {/* Banner */}
              <div style={{ background: `linear-gradient(135deg, ${COLORS.headerMain}, ${COLORS.navBg})`, color: "#fff", borderRadius: 4, padding: "28px 32px", marginBottom: 20, border: `1px solid ${COLORS.borderBlue}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -20, top: -20, fontSize: 140, opacity: 0.07 }}>🎬</div>
                <div style={{ color: COLORS.gold, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>O'QUV VIDEODARSLAR PLATFORMASI</div>
                <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.3 }}>O'quv Videodarslar Kutubxonasiga<br />Xush Kelibsiz</h2>
                <p style={{ color: "#b8d0f0", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>O'zbekistonning yetakchi olimlar va o'qituvchilari tomonidan tayyorlangan yuqori sifatli video darsliklardan foydalaning.</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setActiveTab("catalog")} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 3, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Video Darsliklarni Ko'rish</button>
                  <button onClick={() => setShowAI(true)} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 3, padding: "10px 20px", fontSize: 14, cursor: "pointer" }}>🤖 Yordam so'rash</button>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderTop: `3px solid ${COLORS.headerMain}`, borderRadius: 4, padding: "16px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.headerMain, marginBottom: 2 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Yangi qo'shilganlar table */}
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ background: COLORS.headerMain, color: "#fff", padding: "10px 16px", fontSize: 14, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>📌 Yangi qo'shilgan darsliklar</span>
                  <button onClick={() => setActiveTab("catalog")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 3, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>Barchasi →</button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}` }}>
                      {["#", "Nomi", "Kategoriya", "Muallif", "Sana"].map(h => (
                        <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontSize: 12, color: COLORS.headerMain, fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VIDEOS.slice(0, 5).map((v, i) => (
                      <tr key={v.id} style={{ background: i % 2 === 0 ? COLORS.white : COLORS.tableStripe, cursor: "pointer", borderBottom: `1px solid ${COLORS.borderBlue}` }}
                        onClick={() => setSelectedVideo(v)}
                        onMouseEnter={e => e.currentTarget.style.background = "#dbeafe"}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? COLORS.white : COLORS.tableStripe}>
                        <td style={{ padding: "8px 14px", fontSize: 13, color: COLORS.textMuted }}>{i + 1}</td>
                        <td style={{ padding: "8px 14px", fontSize: 13, color: COLORS.headerMain, fontWeight: 600 }}>{v.title}</td>
                        <td style={{ padding: "8px 14px" }}><CategoryTag cat={v.category} /></td>
                        <td style={{ padding: "8px 14px", fontSize: 13, color: COLORS.textMuted }}>{v.author}</td>
                        <td style={{ padding: "8px 14px", fontSize: 12, color: COLORS.textMuted }}>{v.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div>
              {/* Notices */}
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ background: COLORS.accent, color: "#fff", padding: "10px 14px", fontSize: 13, fontWeight: 700 }}>📢 Yangiliklar va E'lonlar</div>
                <div style={{ padding: 12 }}>
                  {NOTICES.map((n, i) => (
                    <div key={n.id} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: i < NOTICES.length - 1 ? `1px solid ${COLORS.borderBlue}` : "none" }}>
                      <div style={{ display: "flex", gap: 6, marginBottom: 4, alignItems: "center" }}>
                        <span style={{ background: n.type === "E'lon" ? "#fff3e0" : "#e3f2fd", color: n.type === "E'lon" ? "#e65100" : "#1565c0", border: `1px solid ${n.type === "E'lon" ? "#ffb74d" : "#90caf9"}`, borderRadius: 2, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>{n.type}</span>
                        <span style={{ color: COLORS.textMuted, fontSize: 11 }}>{n.date}</span>
                      </div>
                      <div style={{ fontSize: 13, color: COLORS.headerMain, lineHeight: 1.5, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"} onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>{n.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ background: COLORS.headerMain, color: "#fff", padding: "10px 14px", fontSize: 13, fontWeight: 700 }}>⚡ Tezkor Havolalar</div>
                <div style={{ padding: 8 }}>
                  {["Elektron katalog", "Ilmiy ishlar bo'yicha qidiruv", "Yangi kelib tushgan darsliklar", "Ommabop darsliklar", "Sertifikatlar", "Muallif bo'lish"].map((link, i) => (
                    <div key={i} style={{ padding: "7px 10px", borderBottom: `1px solid ${COLORS.borderBlue}`, fontSize: 13, color: COLORS.headerMain, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                      onMouseEnter={e => e.currentTarget.style.background = COLORS.lightBlue}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <span style={{ color: COLORS.accent }}>›</span> {link}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI assistant promo */}
              <div style={{ background: COLORS.lightBlue, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
                <div style={{ fontWeight: 700, color: COLORS.headerMain, marginBottom: 6, fontSize: 14 }}>Virtual Yordamchi</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 10 }}>Sun'iy intellekt yordamida kurs tanlang, o'quv rejangizni tuzing.</div>
                <button onClick={() => setShowAI(true)} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "8px 16px", fontSize: 13, cursor: "pointer", width: "100%", fontWeight: 600 }}>Murojaat qilish</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {activeTab === "catalog" && (
          <div>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "12px 20px", fontSize: 15, fontWeight: 700 }}>
                🎬 Video Darsliklar Katologu — {filtered.length} ta material topildi
              </div>

              {/* Filters */}
              <div style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "12px 16px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <label style={{ fontSize: 12, color: COLORS.textMuted, marginRight: 6 }}>Kategoriya:</label>
                  <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} style={{ border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "5px 10px", fontSize: 13, color: COLORS.text }}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: COLORS.textMuted, marginRight: 6 }}>Saralash:</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "5px 10px", fontSize: 13, color: COLORS.text }}>
                    <option value="date">Sana bo'yicha</option>
                    <option value="views">Ommaboplik</option>
                    <option value="title">Nom bo'yicha</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", gap: 6, maxWidth: 300 }}>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidiruv..." style={{ flex: 1, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "5px 10px", fontSize: 13 }} />
                  <button style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "5px 12px", cursor: "pointer", fontSize: 13 }}>🔍</button>
                </div>
              </div>

              {/* Category pills */}
              <div style={{ borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "8px 16px", display: "flex", gap: 6, overflowX: "auto" }}>
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setActiveCategory(c)} style={{ background: activeCategory === c ? COLORS.headerMain : COLORS.white, color: activeCategory === c ? "#fff" : COLORS.headerMain, border: `1px solid ${activeCategory === c ? COLORS.headerMain : COLORS.borderBlue}`, borderRadius: 3, padding: "4px 12px", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>{c}</button>
                ))}
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: COLORS.tableStripe, borderBottom: `2px solid ${COLORS.borderBlue}` }}>
                      {["#", "Sarlavha / Muallif", "Kategoriya", "Daraja", "Davomiyligi", "Ko'rishlar", "Sana", "Amal"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: h === "#" || h === "Amal" || h === "Ko'rishlar" || h === "Daraja" || h === "Davomiyligi" || h === "Sana" ? "center" : "left", fontSize: 12, color: COLORS.headerMain, fontWeight: 700, whiteSpace: "nowrap", borderRight: `1px solid ${COLORS.borderBlue}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v, i) => <VideoRow key={v.id} video={v} onClick={setSelectedVideo} idx={i} />)}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ padding: 40, textAlign: "center", color: COLORS.textMuted }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                    <div>Qidiruv natijasi topilmadi</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== MY COURSES ===== */}
        {activeTab === "my" && (
          <div>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "12px 20px", fontSize: 15, fontWeight: 700 }}>📖 Mening O'quv Zalim</div>
              {enrolled.length === 0 ? (
                <div style={{ padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                  <div style={{ color: COLORS.headerMain, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Siz hali hech qaysi kursga yozilmagansiz</div>
                  <div style={{ color: COLORS.textMuted, marginBottom: 20 }}>Katalogga o'tib kurs tanlang</div>
                  <button onClick={() => setActiveTab("catalog")} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Katalogga o'tish</button>
                </div>
              ) : (
                <div>
                  {/* Summary */}
                  <div style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "12px 20px", display: "flex", gap: 24 }}>
                    {[["Kurslar", enrolled.length], ["Bajarilgan darslar", enrolled.reduce((a, v) => a + Math.round(v.lessons * v.progress / 100), 0)], ["O'rtacha progress", Math.round(enrolled.reduce((a, v) => a + v.progress, 0) / enrolled.length) + "%"]].map(([k, v]) => (
                      <div key={k}><span style={{ fontWeight: 700, color: COLORS.headerMain, fontSize: 16 }}>{v}</span> <span style={{ fontSize: 12, color: COLORS.textMuted }}>{k}</span></div>
                    ))}
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: COLORS.tableStripe, borderBottom: `1px solid ${COLORS.borderBlue}` }}>
                        {["#", "Kurs nomi", "Kategoriya", "Darslar", "Davom (%)"].map(h => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, color: COLORS.headerMain, fontWeight: 700 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enrolled.map((v, i) => (
                        <tr key={v.id} style={{ background: i % 2 === 0 ? COLORS.white : COLORS.tableStripe, borderBottom: `1px solid ${COLORS.borderBlue}`, cursor: "pointer" }} onClick={() => setSelectedVideo(v)}
                          onMouseEnter={e => e.currentTarget.style.background = "#dbeafe"}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? COLORS.white : COLORS.tableStripe}>
                          <td style={{ padding: "10px 14px", fontSize: 13, color: COLORS.textMuted }}>{i + 1}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <div style={{ fontWeight: 600, color: COLORS.headerMain, fontSize: 14 }}>{v.title}</div>
                            <div style={{ fontSize: 12, color: COLORS.textMuted }}>{v.author}</div>
                          </td>
                          <td style={{ padding: "10px 14px" }}><CategoryTag cat={v.category} /></td>
                          <td style={{ padding: "10px 14px", fontSize: 13, color: COLORS.textMuted }}>{Math.round(v.lessons * v.progress / 100)}/{v.lessons}</td>
                          <td style={{ padding: "10px 14px", width: 200 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1, background: COLORS.borderBlue, borderRadius: 2, height: 8 }}>
                                <div style={{ background: v.progress === 100 ? "#2e7d32" : COLORS.headerMain, height: "100%", borderRadius: 2, width: `${v.progress}%` }} />
                              </div>
                              <span style={{ fontSize: 12, color: v.progress === 100 ? "#2e7d32" : COLORS.headerMain, fontWeight: 700, minWidth: 32 }}>{v.progress}%</span>
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

        {/* ===== ABOUT ===== */}
        {activeTab === "about" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "12px 20px", fontSize: 15, fontWeight: 700 }}>Kutubxona Haqida</div>
              <div style={{ padding: 24, lineHeight: 1.8, fontSize: 14, color: COLORS.text }}>
                <p><strong>O'quv Videodarslar Kutubxonasi</strong> — yetakchi olimlar va o'qituvchilari tomonidan yaratilgan video darsliklarni bir joyda jamlagan platformadir.</p>
                <p>Kutubxona oliy ta'lim muassasalari, akademik institutlar va ilmiy markazlar bilan hamkorlikda ish olib boradi.</p>
                <div style={{ background: COLORS.lightBlue, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: 14, margin: "16px 0" }}>
                  <strong style={{ color: COLORS.headerMain }}>Maqsad va vazifalar:</strong>
                  <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                    {["Sifatli video darsliklarni keng ommaga yetkazish", "Ilmiy va ta'limiy resurslarni raqamlashtirish", "Masofaviy ta'lim imkoniyatlarini kengaytirish", "Milliy intellektual salohiyatni mustahkamlash"].map((item, i) => <li key={i} style={{ marginBottom: 4, fontSize: 13 }}>{item}</li>)}
                  </ul>
                </div>
                <p>Barcha foydalanuvchilar uchun <strong>bepul ro'yxatdan o'tish</strong> va <strong>onlayn kirishimkoniyati</strong> mavjud.</p>
              </div>
            </div>
            <div>
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ background: COLORS.accent, color: "#fff", padding: "10px 14px", fontSize: 13, fontWeight: 700 }}>📍 Aloqa ma'lumotlari</div>
                <div style={{ padding: 14 }}>
                  {[["📞", "Telefon", "(+99871) 232-83-94"], ["📧", "Elektron pochta", "video@natlib.uz"], ["📍", "Manzil", "Toshkent, Navoiy ko'chasi, 1"], ["🕐", "Ish vaqti", "Du-Ju: 08:00 – 18:00"], ["🌐", "Veb-sayt", "video.natlib.uz"]].map(([icon, k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13 }}>
                      <span>{icon}</span>
                      <div><div style={{ fontWeight: 600, color: COLORS.headerMain, fontSize: 12 }}>{k}</div><div style={{ color: COLORS.textMuted }}>{v}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACT ===== */}
        {activeTab === "contact" && (
          <div style={{ maxWidth: 640 }}>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "12px 20px", fontSize: 15, fontWeight: 700 }}>✉️ Murojaat Shakli</div>
              <div style={{ padding: 24 }}>
                {[["Ism Familiya", "text", "To'liq ismingiz"], ["Elektron pochta", "email", "email@example.com"], ["Mavzu", "text", "Murojaat mavzusi"]].map(([label, type, ph]) => (
                  <div key={label} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.headerMain, marginBottom: 4 }}>{label} <span style={{ color: COLORS.accent }}>*</span></label>
                    <input type={type} placeholder={ph} style={{ width: "100%", border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "9px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.headerMain, marginBottom: 4 }}>Xabar <span style={{ color: COLORS.accent }}>*</span></label>
                  <textarea rows={5} placeholder="Xabaringizni yozing..." style={{ width: "100%", border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "9px 12px", fontSize: 13, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 3, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Yuborish</button>
                  <button style={{ background: COLORS.white, color: COLORS.textMuted, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 3, padding: "10px 20px", fontSize: 14, cursor: "pointer" }}>Tozalash</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: COLORS.footerBg, color: COLORS.footerText, marginTop: 40 }}>
        {/* Links bar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "16px 0" }}>
          <div style={{ width: "100%", padding: "0 32px", display: "flex", gap: 24, flexWrap: "wrap", fontSize: 12, boxSizing: "border-box" }}>
            {["Ta'lim portal", "Foydali resurslar", "Hamkorlarimiz", "O'quv qo'llanmalar", "Interaktiv darslar"].map((link, i) => (
              <span key={i} style={{ cursor: "pointer", color: COLORS.footerText }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = COLORS.footerText}>{link}</span>
            ))}
          </div>
        </div>
        {/* Main footer */}
        <div style={{ width: "100%", padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, boxSizing: "border-box" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>O'quv Videodarslar</div>
                <div style={{ fontSize: 11, color: "#7a9cc8" }}>Kutubxonasi</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#7a9cc8", lineHeight: 1.7, margin: 0 }}>Barcha uchun ochiq sifatli o'quv videodarslar platformasi.</p>
            <div style={{ marginTop: 12, fontSize: 12, color: "#7a9cc8" }}>
              <div>📞 (+99871) 232-83-94</div>
              <div>📧 video@kutubxona.uz</div>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Xizmatlar</div>
            {["Video Darsliklar Katalogi", "Ilmiy ishlar bazasi", "Onlayn ro'yxatdan o'tish", "Elektron buyurtma", "Sertifikatlar"].map((link, i) => (
              <div key={i} style={{ fontSize: 12, color: "#7a9cc8", marginBottom: 6, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#7a9cc8"}>› {link}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Ish tartibi</div>
            <div style={{ fontSize: 12, color: "#7a9cc8", lineHeight: 2 }}>
              <div>Dushanba – Juma: 08:00 – 18:00</div>
              <div>Shanba: 09:00 – 17:00</div>
              <div>Yakshanba: Dam olish kuni</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              {["📘", "🐦", "📸", "✈️", "▶️"].map((icon, i) => (
                <span key={i} style={{ fontSize: 18, cursor: "pointer", opacity: 0.7 }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}>{icon}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px", textAlign: "center", fontSize: 11, color: "#7a9cc8" }}>
          © 2026 O'quv Videodarslar Kutubxonasi. Barcha huquqlar himoyalangan.
        </div>
      </footer>

      {/* MODALS */}
      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} onEnroll={enroll} />}
      {showAI && <AIModal onClose={() => setShowAI(false)} />}

      {/* Floating AI */}
      {!showAI && (
        <button onClick={() => setShowAI(true)} style={{ position: "fixed", bottom: 24, right: 24, background: COLORS.headerMain, color: "#fff", border: `2px solid ${COLORS.gold}`, borderRadius: "50%", width: 54, height: 54, fontSize: 22, cursor: "pointer", zIndex: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>🤖</button>
      )}
    </div>
  );
}
