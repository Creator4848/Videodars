import { useState, useEffect, useRef } from "react";
import AuthModal from "./AuthModal";
import AdminPanel from "./AdminPanel";

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

const TRANSLATIONS = {
  uz: {
    title: "O'quv videodarslar kutubxonasi",
    subtitle: "Sifatli ta'lim resurslari markazi",
    virtual_assistant: "Virtual Yordamchi",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    nav_home: "Bosh sahifa",
    nav_catalog: "Video darsliklar",
    nav_my_room: "Mening o'quv zalim",
    nav_about: "Kutubxona haqida",
    nav_contact: "Bog'lanish",
    welcome: "O'quv videodarslar kutubxonasiga xush kelibsiz",
    banner_text: "Yetakchi mutaxassislar va o'qituvchilar tomonidan tayyorlangan yuqori sifatli video darsliklardan foydalaning.",
    view_catalog: "Video Darsliklarni Ko'rish",
    ask_help: "Yordam so'rash",
    stat_videos: "Video darsliklar",
    stat_users: "Foydalanuvchilar",
    stat_hours: "O'quv soatlari",
    stat_inst: "Muassasalar",
    new_lessons: "📌 Yangi qo'shilgan darsliklar",
    view_all: "Barchasi →",
    news_announcements: "📢 Yangiliklar va E'lonlar",
    quick_links: "⚡ Tezkor Havolalar",
    ai_promo_title: "Virtual Yordamchi",
    ai_promo_text: "Sun'iy intellekt yordamida kurs tanlang, o'quv rejangizni tuzing.",
    apply: "Murojaat qilish",
    search_all: "Umumiy qidiruv",
    search_title: "Sarlavha",
    search_author: "Muallif",
    search_cat: "Kategoriya",
    search_placeholder: "Qidiruv...",
    cat_all: "Barchasi",
    cat_science: "Tabiiy fanlar",
    cat_social: "Ijtimoiy fanlar",
    cat_tech: "Texnologiya",
    cat_art: "San'at va madaniyat",
    cat_lang: "Tillar",
    cat_history: "Tarix",
    cat_economy: "Iqtisodiyot",
    footer_services: "Xizmatlar",
    footer_schedule: "Ish tartibi",
    footer_text: "Foydali va sifatli video darsliklar qidiruvi uchun qulay platforma.",
    footer_rights: "Barcha huquqlar himoyalangan."
  },
  ru: {
    title: "Библиотека учебных видеоуроков",
    subtitle: "Центр качественных образовательных ресурсов",
    virtual_assistant: "Виртуальный помощник",
    login: "Вход",
    register: "Регистрация",
    nav_home: "Главная",
    nav_catalog: "Видеоуроки",
    nav_my_room: "Мой учебный зал",
    nav_about: "О библиотеке",
    nav_contact: "Контакты",
    welcome: "Добро пожаловать в библиотеку учебных видеоуроков",
    banner_text: "Используйте высококачественные видеоуроки, подготовленные ведущими специалистами и преподавателями.",
    view_catalog: "Смотреть видеоуроки",
    ask_help: "Спросить помощь",
    stat_videos: "Видеоуроки",
    stat_users: "Пользователи",
    stat_hours: "Учебные часы",
    stat_inst: "Учреждения",
    new_lessons: "📌 Недавно добавленные уроки",
    view_all: "Все →",
    news_announcements: "📢 Новости и объявления",
    quick_links: "⚡ Быстрые ссылки",
    ai_promo_title: "Виртуальный помощник",
    ai_promo_text: "Выбирайте курсы и планируйте обучение с помощью ИИ.",
    apply: "Обратиться",
    search_all: "Общий поиск",
    search_title: "Заголовок",
    search_author: "Автор",
    search_cat: "Категория",
    search_placeholder: "Поиск...",
    cat_all: "Все",
    cat_science: "Естественные науки",
    cat_social: "Социальные науки",
    cat_tech: "Технологии",
    cat_art: "Искусство и культура",
    cat_lang: "Языки",
    cat_history: "История",
    cat_economy: "Экономика",
    footer_services: "Услуги",
    footer_schedule: "График работы",
    footer_text: "Удобная платформа для поиска полезных и качественных видеоуроков.",
    footer_rights: "Все права защищены."
  },
  en: {
    title: "Educational Video Lessons Library",
    subtitle: "Quality Educational Resources Center",
    virtual_assistant: "Virtual Assistant",
    login: "Login",
    register: "Register",
    nav_home: "Home",
    nav_catalog: "Video Lessons",
    nav_my_room: "My Study Hall",
    nav_about: "About Library",
    nav_contact: "Contact",
    welcome: "Welcome to the Educational Video Lessons Library",
    banner_text: "Use high-quality video lessons prepared by leading experts and teachers.",
    view_catalog: "View Video Lessons",
    ask_help: "Ask for Help",
    stat_videos: "Video Lessons",
    stat_users: "Users",
    stat_hours: "Study Hours",
    stat_inst: "Institutions",
    new_lessons: "📌 Recently Added Lessons",
    view_all: "All →",
    news_announcements: "📢 News and Announcements",
    quick_links: "⚡ Quick Links",
    ai_promo_title: "Virtual Assistant",
    ai_promo_text: "Choose courses and plan your studies with the help of AI.",
    apply: "Apply",
    search_all: "General Search",
    search_title: "Title",
    search_author: "Author",
    search_cat: "Category",
    search_placeholder: "Search...",
    cat_all: "All",
    cat_science: "Natural Sciences",
    cat_social: "Social Sciences",
    cat_tech: "Technology",
    cat_art: "Art and Culture",
    cat_lang: "Languages",
    cat_history: "History",
    cat_economy: "Economy",
    footer_services: "Services",
    footer_schedule: "Work Schedule",
    footer_text: "Convenient platform for finding useful and quality video lessons.",
    footer_rights: "All rights reserved."
  }
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

function VideoModal({ video, onClose, onEnroll, lang, t }) {
  const CATEGORY_MAP = {
    "Tabiiy fanlar": t("cat_science"),
    "Ijtimoiy fanlar": t("cat_social"),
    "Texnologiya": t("cat_tech"),
    "San'at va madaniyat": t("cat_art"),
    "Tillar": t("cat_lang"),
    "Tarix": t("cat_history"),
    "Iqtisodiyot": t("cat_economy")
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(4px)" }}>
      <div style={{ background: COLORS.white, border: `2px solid ${COLORS.headerMain}`, borderRadius: 12, width: "min(900px, 100%)", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
        {/* Modal header */}
        <div style={{ background: COLORS.headerMain, color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 18 }}>{lang === "uz" ? "Video Darslik Ma'lumotlari" : lang === "ru" ? "Информация о видеоуроке" : "Video Lesson Information"}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        {/* Red title bar */}
        <div style={{ background: COLORS.accent, color: "#fff", padding: "16px 24px" }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{video.title}</div>
        </div>
        <div style={{ padding: 32 }}>
          {/* Video details table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32, border: `1px solid ${COLORS.borderBlue}` }}>
            <tbody>
              {[
                [lang === "uz" ? "Muallif" : lang === "ru" ? "Автор" : "Author", video.author],
                [lang === "uz" ? "Muassasa" : lang === "ru" ? "Учреждение" : "Institution", video.institution],
                [t("search_cat"), CATEGORY_MAP[video.category] || video.category],
                [lang === "uz" ? "Daraja" : lang === "ru" ? "Уровень" : "Level", video.level],
                [lang === "uz" ? "Davomiyligi" : lang === "ru" ? "Длительность" : "Duration", video.duration],
                [lang === "uz" ? "Darslar soni" : lang === "ru" ? "Кол-во уроков" : "Number of Lessons", video.lessons + (lang === "uz" ? " ta" : "")],
                ["Format", video.format],
                [lang === "uz" ? "Hajm" : lang === "ru" ? "Размер" : "Size", video.size],
                [lang === "uz" ? "Qo'shilgan sana" : lang === "ru" ? "Дата добавления" : "Date Added", video.date],
                [lang === "uz" ? "Ko'rilgan" : lang === "ru" ? "Просмотры" : "Views", video.views.toLocaleString() + (lang === "uz" ? " marta" : "")],
              ].map(([k, v], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? COLORS.tableStripe : COLORS.white }}>
                  <td style={{ padding: "12px 20px", fontWeight: 700, color: COLORS.headerMain, fontSize: 15, width: 220, borderRight: `1px solid ${COLORS.borderBlue}` }}>{k}</td>
                  <td style={{ padding: "12px 20px", fontSize: 15, color: COLORS.text, fontWeight: 500 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* YouTube Embed */}
          {video.youtube_id && (
            <div style={{ marginBottom: 32, borderRadius: 10, overflow: "hidden", border: `2px solid ${COLORS.borderBlue}`, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
              <iframe
                width="100%" height="380"
                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>
          )}
          {/* Description */}
          <div style={{ background: COLORS.lightBlue, border: `2px solid ${COLORS.borderBlue}`, borderRadius: 8, padding: 24, marginBottom: 32 }}>
            <div style={{ fontWeight: 800, color: COLORS.headerMain, marginBottom: 12, fontSize: 16 }}>{lang === "uz" ? "Tavsif:" : lang === "ru" ? "Описание:" : "Description:"}</div>
            <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.8, margin: 0, fontWeight: 500 }}>{video.description}</p>
          </div>
          {/* Progress if enrolled */}
          {video.enrolled && (
            <div style={{ background: "#e8f5e9", border: "2px solid #c8e6c9", borderRadius: 8, padding: 24, marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ color: "#2e7d32", fontWeight: 800, fontSize: 16 }}>{lang === "uz" ? "Sizning davomatingiz" : lang === "ru" ? "Ваш прогресс" : "Your Progress"}</span>
                <span style={{ color: "#2e7d32", fontWeight: 900, fontSize: 18 }}>{video.progress}%</span>
              </div>
              <div style={{ background: "#c8e6c9", borderRadius: 4, height: 12 }}>
                <div style={{ background: "#2e7d32", height: "100%", borderRadius: 4, width: `${video.progress}%` }} />
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
            <button onClick={onClose} style={{ background: COLORS.white, border: `2px solid ${COLORS.borderBlue}`, color: COLORS.textMuted, borderRadius: 4, padding: "12px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>{lang === "uz" ? "Yopish" : lang === "ru" ? "Закрыть" : "Close"}</button>
            {video.enrolled
              ? <button style={{ background: "#2e7d32", color: "#fff", border: "none", borderRadius: 4, padding: "12px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(46,125,50,0.3)" }}>▶ {lang === "uz" ? "Davom ettirish" : lang === "ru" ? "Продолжить" : "Continue"}</button>
              : <button onClick={() => { onEnroll(video.id); onClose(); }} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 4, padding: "12px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(30,77,140,0.3)" }}>{t("register")}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIModal({ onClose, lang, t }) {
  const greeting = lang === "uz" ? "Assalomu alaykum! O'quv videodarslar kutubxonasiga xush kelibsiz. Sizga qanday yordam bera olaman?" : lang === "ru" ? "Здравствуйте! Добро пожаловать в библиотеку видеоуроков. Чем я могу вам помочь?" : "Hello! Welcome to the Video Lessons Library. How can I help you?";

  const [messages, setMessages] = useState([{ role: "assistant", text: greeting }]);
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
      const systemPrompt = `Sen O'quv videodarslar kutubxonasining virtual yordamchisisan. Hozirgi tanlangan til: ${lang}. Shu tilda xushmuomala va rasmiy tarzda javob ber. Platformada texnologiya, matematika, tarix, til, iqtisodiyot, san'at, tabiiy fanlar kurslari mavjud.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [...hist, { role: "user", content: msg }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Error occurred.";
      setMessages(p => [...p, { role: "assistant", text }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", text: lang === "uz" ? "Tarmoq xatosi. Iltimos qayta urinib ko'ring." : "Network error. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
      <div style={{ background: COLORS.white, border: `2px solid ${COLORS.headerMain}`, borderRadius: 12, width: "min(560px, 95vw)", height: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
        <div style={{ background: COLORS.headerMain, color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 16 }}>🤖 {t("virtual_assistant")}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && <span style={{ fontSize: 24, marginRight: 12, alignSelf: "flex-end" }}>🏛️</span>}
              <div style={{ maxWidth: "85%", background: m.role === "user" ? COLORS.headerMain : COLORS.lightBlue, color: m.role === "user" ? "#fff" : COLORS.text, border: m.role === "user" ? "none" : `1px solid ${COLORS.borderBlue}`, borderRadius: 8, padding: "14px 20px", fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{m.text}</div>
            </div>
          ))}
          {loading && <div style={{ display: "flex" }}><span style={{ fontSize: 24, marginRight: 12 }}>🏛️</span><div style={{ background: COLORS.lightBlue, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, padding: "14px 20px", fontSize: 15, color: COLORS.textMuted, fontWeight: 500 }}>{lang === "uz" ? "Javob tayyorlanmoqda..." : "Thinking..."}</div></div>}
          <div ref={endRef} />
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.borderBlue}`, padding: 20, display: "flex", gap: 12, background: COLORS.tableStripe }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={lang === "uz" ? "Savolingizni yozing..." : lang === "ru" ? "Введите вопрос..." : "Ask a question..."} style={{ flex: 1, border: `2px solid ${COLORS.borderBlue}`, borderRadius: 6, padding: "12px 16px", fontSize: 15, outline: "none", fontWeight: 500 }} />
          <button onClick={send} disabled={loading} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 6, padding: "12px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>{lang === "uz" ? "Yuborish" : lang === "ru" ? "Отправить" : "Send"}</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("uz");
  const t = (key) => TRANSLATIONS[lang][key] || key;

  // AUTH STATE
  const [currentUser, setCurrentUser] = useState(() => {
    try { const s = localStorage.getItem("videolib_user"); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState("login");
  const [pendingVideo, setPendingVideo] = useState(null);

  // DB VIDEOS & SUBJECTS
  const [dbVideos, setDbVideos] = useState([]);
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/videos").then(r => r.ok ? r.json() : []).then(data => { setDbVideos(data); setDbLoaded(true); }).catch(() => setDbLoaded(true));
  }, []);

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    localStorage.setItem("videolib_user", JSON.stringify(user));
    setShowAuthModal(false);
    if (pendingVideo) { setSelectedVideo(pendingVideo); setPendingVideo(null); }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("videolib_user");
    if (activeTab === "admin") setActiveTab("main");
  }

  function handleVideoClick(video) {
    if (!currentUser) {
      setPendingVideo(video);
      setAuthInitialTab("login");
      setShowAuthModal(true);
    } else {
      setSelectedVideo(video);
    }
  }

  // Merge static + DB videos (DB videos shown in catalog when loaded)
  const allVideos = dbLoaded && dbVideos.length > 0 ? dbVideos.map(v => ({ ...v, youtube_id: v.youtube_id || "" })) : VIDEOS;

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
    { id: "main", label: t("nav_home") },
    { id: "catalog", label: t("nav_catalog") },
    { id: "my", label: t("nav_my_room") },
    { id: "about", label: t("nav_about") },
    { id: "contact", label: t("nav_contact") },
    ...(currentUser?.role === "admin" ? [{ id: "admin", label: "⚙️ Admin" }] : []),
  ];

  const CATEGORY_MAP = {
    "Barchasi": t("cat_all"),
    "Tabiiy fanlar": t("cat_science"),
    "Ijtimoiy fanlar": t("cat_social"),
    "Texnologiya": t("cat_tech"),
    "San'at va madaniyat": t("cat_art"),
    "Tillar": t("cat_lang"),
    "Tarix": t("cat_history"),
    "Iqtisodiyot": t("cat_economy")
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bodyBg, fontFamily: "'Inter', sans-serif", color: COLORS.text, fontSize: 16 }}>

      {/* TOP BAR */}
      <div style={{ background: COLORS.headerTop, color: "#c8d8f0", fontSize: 14, padding: "8px 0", borderBottom: "1px solid #0d2a52" }}>
        <div style={{ width: "100%", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
          <span style={{ fontWeight: 600 }}>{t("title")}</span>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} onClick={() => setShowAI(true)}>🤖 {t("virtual_assistant")}</span>
            {currentUser ? (
              <>
                <span style={{ fontWeight: 700, color: "#fff" }}>👤 {currentUser.fullName || currentUser.full_name}</span>
                {currentUser.role === "admin" && <span style={{ background: "#d4a017", color: "#000", borderRadius: 3, padding: "1px 8px", fontSize: 12, fontWeight: 800 }}>ADMIN</span>}
                <span style={{ cursor: "pointer", color: "#ffcdd2" }} onClick={logout}>Chiqish</span>
              </>
            ) : (
              <>
                <span style={{ cursor: "pointer" }} onClick={() => { setAuthInitialTab("login"); setShowAuthModal(true); }}>{t("login")}</span>
                <span style={{ cursor: "pointer" }} onClick={() => { setAuthInitialTab("register"); setShowAuthModal(true); }}>{t("register")}</span>
              </>
            )}
            <div style={{ display: "flex", gap: 10, background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 4 }}>
              <span onClick={() => setLang("uz")} style={{ cursor: "pointer", fontWeight: lang === "uz" ? 700 : 400, color: lang === "uz" ? "#fff" : "inherit" }}>O'z</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span onClick={() => setLang("ru")} style={{ cursor: "pointer", fontWeight: lang === "ru" ? 700 : 400, color: lang === "ru" ? "#fff" : "inherit" }}>Ру</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span onClick={() => setLang("en")} style={{ cursor: "pointer", fontWeight: lang === "en" ? 700 : 400, color: lang === "en" ? "#fff" : "inherit" }}>En</span>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header style={{ background: COLORS.headerMain, borderBottom: `4px solid ${COLORS.accent}` }}>
        <div style={{ width: "100%", padding: "24px 40px", display: "flex", alignItems: "center", gap: 24, boxSizing: "border-box" }}>
          <div style={{ width: 80, height: 80, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0, border: "4px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>🎓</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: "-0.5px" }}>{t("title")}</h1>
            <div style={{ color: "#b8d0f0", fontSize: 16, marginTop: 6, fontWeight: 500, opacity: 0.9 }}>{t("subtitle")}</div>
          </div>
          {/* Search */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 6, overflow: "hidden", width: 480, height: 48, background: "#fff" }}>
              <select style={{ background: COLORS.lightBlue, color: COLORS.headerMain, border: "none", padding: "0 16px", fontSize: 14, cursor: "pointer", outline: "none", fontWeight: 600, borderRight: `1px solid ${COLORS.borderBlue}` }}>
                <option>{t("search_all")}</option>
                <option>{t("search_title")}</option>
                <option>{t("search_author")}</option>
                <option>{t("search_cat")}</option>
              </select>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("search_placeholder")} style={{ flex: 1, border: "none", padding: "0 16px", fontSize: 15, outline: "none" }} />
              <button onClick={() => setActiveTab("catalog")} style={{ background: COLORS.accent, color: "#fff", border: "none", padding: "0 20px", cursor: "pointer", fontSize: 18, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.accentLight}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.accent}>🔍</button>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav style={{ background: COLORS.navBg, borderBottom: `1px solid ${COLORS.navHover}`, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ width: "100%", padding: "0 40px", display: "flex", boxSizing: "border-box" }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ background: activeTab === item.id ? COLORS.accent : "none", color: "#fff", border: "none", padding: "16px 28px", fontSize: 16, cursor: "pointer", fontFamily: "inherit", borderRight: "1px solid rgba(255,255,255,0.1)", fontWeight: activeTab === item.id ? 700 : 500, transition: "all 0.2s", letterSpacing: "0.3px" }}
              onMouseEnter={e => { if (activeTab !== item.id) e.currentTarget.style.background = COLORS.navHover; }}
              onMouseLeave={e => { if (activeTab !== item.id) e.currentTarget.style.background = "none"; }}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "10px 0" }}>
        <div style={{ width: "100%", padding: "0 40px", fontSize: 14, color: COLORS.textMuted, boxSizing: "border-box", fontWeight: 500 }}>
          🏠 <span style={{ color: COLORS.headerMain, cursor: "pointer" }} onClick={() => setActiveTab("main")}>{t("nav_home")}</span>
          {activeTab !== "main" && <> <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span> <span style={{ color: COLORS.headerMain }}>{NAV.find(n => n.id === activeTab)?.label}</span></>}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ width: "100%", padding: "32px 40px", boxSizing: "border-box" }}>

        {/* ===== BOSH SAHIFA ===== */}
        {activeTab === "main" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
            <div>
              {/* Banner */}
              <div style={{ background: `linear-gradient(135deg, ${COLORS.headerMain}, ${COLORS.navBg})`, color: "#fff", borderRadius: 8, padding: "48px 56px", marginBottom: 32, border: `1px solid ${COLORS.borderBlue}`, position: "relative", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                <div style={{ position: "absolute", right: -30, top: -30, fontSize: 180, opacity: 0.1 }}>🎬</div>
                <h2 style={{ fontSize: 42, fontWeight: 800, margin: "0 0 20px", lineHeight: 1.2 }}>{t("welcome")}</h2>
                <p style={{ color: "#b8d0f0", fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: "800px" }}>{t("banner_text")}</p>
                <div style={{ display: "flex", gap: 16 }}>
                  <button onClick={() => setActiveTab("catalog")} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 4, padding: "14px 32px", fontSize: 18, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(200,16,46,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>{t("view_catalog")}</button>
                  <button onClick={() => setShowAI(true)} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 4, padding: "14px 28px", fontSize: 18, cursor: "pointer", fontWeight: 600 }}>🤖 {t("ask_help")}</button>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
                {[
                  { key: "stat_videos", value: "1,250+", icon: "🎬" },
                  { key: "stat_users", value: "48,300+", icon: "👥" },
                  { key: "stat_hours", value: "3,600+", icon: "⏱" },
                  { key: "stat_inst", value: "120+", icon: "🏛️" },
                ].map((s, i) => (
                  <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderTop: `4px solid ${COLORS.headerMain}`, borderRadius: 8, padding: "24px 20px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.headerMain, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t(s.key)}</div>
                  </div>
                ))}
              </div>

              {/* New Lessons Table */}
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", marginBottom: 32, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ background: COLORS.headerMain, color: "#fff", padding: "16px 24px", fontSize: 18, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{t("new_lessons")}</span>
                  <button onClick={() => setActiveTab("catalog")} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 4, padding: "6px 16px", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>{t("view_all")}</button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: COLORS.lightBlue, borderBottom: `2px solid ${COLORS.borderBlue}` }}>
                      {["#", t("search_title"), t("search_cat"), t("search_author"), t("date") || "Sana"].map((h, i) => (
                        <th key={i} style={{ padding: "14px 24px", textAlign: "left", fontSize: 14, color: COLORS.headerMain, fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VIDEOS.slice(0, 5).map((v, i) => (
                      <tr key={v.id} style={{ background: i % 2 === 0 ? COLORS.white : COLORS.tableStripe, cursor: "pointer", borderBottom: `1px solid ${COLORS.borderBlue}` }}
                        onClick={() => handleVideoClick(v)}
                        onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? COLORS.white : COLORS.tableStripe}>
                        <td style={{ padding: "14px 24px", fontSize: 15, color: COLORS.textMuted }}>{i + 1}</td>
                        <td style={{ padding: "14px 24px", fontSize: 16, color: COLORS.headerMain, fontWeight: 700 }}>{v.title}</td>
                        <td style={{ padding: "14px 24px" }}><CategoryTag cat={CATEGORY_MAP[v.category] || v.category} /></td>
                        <td style={{ padding: "14px 24px", fontSize: 15, color: COLORS.textMuted, fontWeight: 500 }}>{v.author}</td>
                        <td style={{ padding: "14px 24px", fontSize: 14, color: COLORS.textMuted }}>{v.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div>
              {/* Notices */}
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", marginBottom: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ background: COLORS.accent, color: "#fff", padding: "14px 20px", fontSize: 16, fontWeight: 700 }}>{t("news_announcements")}</div>
                <div style={{ padding: 16 }}>
                  {NOTICES.map((n, i) => (
                    <div key={n.id} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: i < NOTICES.length - 1 ? `1px solid ${COLORS.borderBlue}` : "none" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
                        <span style={{ background: n.type === "E'lon" ? "#fff3e0" : "#e3f2fd", color: n.type === "E'lon" ? "#e65100" : "#1565c0", border: `1px solid ${n.type === "E'lon" ? "#ffb74d" : "#90caf9"}`, borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>{n.type === "E'lon" ? (lang === "uz" ? "E'lon" : lang === "ru" ? "Объявление" : "Notice") : (lang === "uz" ? "Yangilik" : lang === "ru" ? "Новости" : "News")}</span>
                        <span style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 500 }}>{n.date}</span>
                      </div>
                      <div style={{ fontSize: 15, color: COLORS.headerMain, lineHeight: 1.5, cursor: "pointer", fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"} onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>{n.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", marginBottom: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ background: COLORS.headerMain, color: "#fff", padding: "14px 20px", fontSize: 16, fontWeight: 700 }}>{t("quick_links")}</div>
                <div style={{ padding: 12 }}>
                  {[
                    lang === "uz" ? "Elektron katalog" : lang === "ru" ? "Электронный каталог" : "Electronic Catalog",
                    lang === "uz" ? "Ilmiy ishlar bo'yicha qidiruv" : lang === "ru" ? "Поиск научных работ" : "Search Scientific Papers",
                    lang === "uz" ? "Yangi kelib tushgan darsliklar" : lang === "ru" ? "Новые поступления" : "New Arrivals",
                    lang === "uz" ? "Ommabop darsliklar" : lang === "ru" ? "Популярные учебники" : "Popular Textbooks",
                    lang === "uz" ? "Sertifikatlar" : lang === "ru" ? "Сертификаты" : "Certificates",
                    lang === "uz" ? "Muallif bo'lish" : lang === "ru" ? "Стать автором" : "Become an Author"
                  ].map((link, i) => (
                    <div key={i} style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.borderBlue}`, fontSize: 14, color: COLORS.headerMain, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontWeight: 500 }}
                      onMouseEnter={e => e.currentTarget.style.background = COLORS.lightBlue}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <span style={{ color: COLORS.accent, fontWeight: 700 }}>›</span> {link}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI assistant promo */}
              <div style={{ background: COLORS.lightBlue, border: `3px solid ${COLORS.borderBlue}`, borderRadius: 8, padding: "24px 20px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🤖</div>
                <div style={{ fontWeight: 800, color: COLORS.headerMain, marginBottom: 10, fontSize: 18 }}>{t("ai_promo_title")}</div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>{t("ai_promo_text")}</div>
                <button onClick={() => setShowAI(true)} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 4, padding: "12px 24px", fontSize: 15, cursor: "pointer", width: "100%", fontWeight: 700, boxShadow: "0 4px 12px rgba(30,77,140,0.2)" }}>{t("apply")}</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {activeTab === "catalog" && (
          <div>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "16px 24px", fontSize: 18, fontWeight: 700 }}>
                🎬 {lang === "uz" ? "Video darsliklar katalogi" : lang === "ru" ? "Каталог видеоуроков" : "Video Lessons Catalog"} — {filtered.length} {lang === "uz" ? "ta material topildi" : lang === "ru" ? "материалов найдено" : "items found"}
              </div>

              {/* Filters */}
              <div style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "16px 24px", display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <label style={{ fontSize: 14, color: COLORS.textMuted, marginRight: 8, fontWeight: 600 }}>{t("search_cat")}:</label>
                  <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} style={{ border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "8px 16px", fontSize: 15, color: COLORS.text, outline: "none", fontWeight: 500 }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_MAP[c]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 14, color: COLORS.textMuted, marginRight: 8, fontWeight: 600 }}>{lang === "uz" ? "Saralash" : lang === "ru" ? "Сортировка" : "Sort"}:</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "8px 16px", fontSize: 15, color: COLORS.text, outline: "none", fontWeight: 500 }}>
                    <option value="date">{lang === "uz" ? "Sana bo'yicha" : lang === "ru" ? "По дате" : "By Date"}</option>
                    <option value="views">{lang === "uz" ? "Ommaboplik" : lang === "ru" ? "По популярности" : "By Popularity"}</option>
                    <option value="title">{lang === "uz" ? "Nom bo'yicha" : lang === "ru" ? "По названию" : "By Title"}</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", gap: 12, maxWidth: "100%" }}>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("search_placeholder")} style={{ flex: 1, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "8px 16px", fontSize: 15, outline: "none" }} />
                  <button style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 4, padding: "8px 24px", cursor: "pointer", fontSize: 16, fontWeight: 600 }}>🔍</button>
                </div>
              </div>

              {/* Category pills */}
              <div style={{ borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "12px 24px", display: "flex", gap: 10, overflowX: "auto", background: COLORS.white }}>
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setActiveCategory(c)} style={{ background: activeCategory === c ? COLORS.headerMain : COLORS.white, color: activeCategory === c ? "#fff" : COLORS.headerMain, border: `2px solid ${activeCategory === c ? COLORS.headerMain : COLORS.borderBlue}`, borderRadius: 20, padding: "6px 20px", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", fontWeight: 600, transition: "all 0.2s" }}>{CATEGORY_MAP[c]}</button>
                ))}
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: COLORS.tableStripe, borderBottom: `2px solid ${COLORS.borderBlue}` }}>
                      {["#", lang === "uz" ? "Sarlavha / Muallif" : lang === "ru" ? "Заголовок / Автор" : "Title / Author", t("search_cat"), lang === "uz" ? "Daraja" : lang === "ru" ? "Уровень" : "Level", lang === "uz" ? "Davomiyligi" : lang === "ru" ? "Длительность" : "Duration", lang === "uz" ? "Ko'rishlar" : lang === "ru" ? "Просмотры" : "Views", lang === "uz" ? "Sana" : lang === "ru" ? "Дата" : "Date", lang === "uz" ? "Amal" : lang === "ru" ? "Действие" : "Action"].map((h, i) => (
                        <th key={i} style={{ padding: "16px 24px", textAlign: i === 0 || i > 2 ? "center" : "left", fontSize: 14, color: COLORS.headerMain, fontWeight: 700, whiteSpace: "nowrap", borderRight: `1px solid ${COLORS.borderBlue}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v, i) => (
                      <tr key={v.id} style={{ background: i % 2 === 0 ? COLORS.white : COLORS.tableStripe, cursor: "pointer", borderBottom: `1px solid ${COLORS.borderBlue}` }}
                        onClick={() => handleVideoClick(v)}
                        onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? COLORS.white : COLORS.tableStripe}>
                        <td style={{ padding: "14px 24px", fontSize: 15, color: COLORS.textMuted, textAlign: "center" }}>{i + 1}</td>
                        <td style={{ padding: "14px 24px" }}>
                          <div style={{ fontWeight: 700, color: COLORS.headerMain, fontSize: 16 }}>{v.title}</div>
                          <div style={{ fontSize: 14, color: COLORS.textMuted }}>{v.author}</div>
                        </td>
                        <td style={{ padding: "14px 24px" }}><CategoryTag cat={CATEGORY_MAP[v.category] || v.category} /></td>
                        <td style={{ padding: "14px 24px", textAlign: "center" }}><LevelBadge level={v.level} /></td>
                        <td style={{ padding: "14px 24px", textAlign: "center", fontSize: 15, color: COLORS.textMuted }}>{v.duration}</td>
                        <td style={{ padding: "14px 24px", textAlign: "center", fontSize: 15, color: COLORS.textMuted }}>{v.views.toLocaleString()}</td>
                        <td style={{ padding: "14px 24px", textAlign: "center", fontSize: 14, color: COLORS.textMuted }}>{v.date}</td>
                        <td style={{ padding: "14px 24px", textAlign: "center" }}>
                          <button style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{lang === "uz" ? "Ko'rish" : lang === "ru" ? "Смотреть" : "View"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ padding: 64, textAlign: "center", color: COLORS.textMuted }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>{lang === "uz" ? "Qidiruv natijasi topilmadi" : lang === "ru" ? "Результаты не найдены" : "No results found"}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== MY COURSES ===== */}
        {activeTab === "my" && (
          <div>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "16px 24px", fontSize: 18, fontWeight: 700 }}>📖 {t("nav_my_room")}</div>
              {enrolled.length === 0 ? (
                <div style={{ padding: 80, textAlign: "center" }}>
                  <div style={{ fontSize: 80, marginBottom: 24 }}>📚</div>
                  <div style={{ color: COLORS.headerMain, fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{lang === "uz" ? "Siz hali hech qaysi kursga yozilmagansiz" : lang === "ru" ? "Вы еще не записались ни на один курс" : "You haven't enrolled in any courses yet"}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 16, marginBottom: 32 }}>{lang === "uz" ? "Katalogga o'tib kurs tanlang" : lang === "ru" ? "Перейдите в каталог, чтобы выбрать курс" : "Go to the catalog to choose a course"}</div>
                  <button onClick={() => setActiveTab("catalog")} style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 4, padding: "14px 40px", fontSize: 18, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(30,77,140,0.2)" }}>{lang === "uz" ? "Katalogga o'tish" : lang === "ru" ? "Перейти в каталог" : "Go to Catalog"}</button>
                </div>
              ) : (
                <div>
                  {/* Summary */}
                  <div style={{ background: COLORS.lightBlue, borderBottom: `1px solid ${COLORS.borderBlue}`, padding: "20px 24px", display: "flex", gap: 40 }}>
                    {[
                      [lang === "uz" ? "Kurslar" : lang === "ru" ? "Курсы" : "Courses", enrolled.length],
                      [lang === "uz" ? "Bajarilgan darslar" : lang === "ru" ? "Завершенные уроки" : "Completed Lessons", enrolled.reduce((a, v) => a + Math.round(v.lessons * v.progress / 100), 0)],
                      [lang === "uz" ? "O'rtacha progress" : lang === "ru" ? "Средний прогресс" : "Average Progress", Math.round(enrolled.reduce((a, v) => a + v.progress, 0) / enrolled.length) + "%"]
                    ].map(([k, v]) => (
                      <div key={k}><span style={{ fontWeight: 800, color: COLORS.headerMain, fontSize: 24 }}>{v}</span> <span style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", marginLeft: 8 }}>{k}</span></div>
                    ))}
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: COLORS.tableStripe, borderBottom: `2px solid ${COLORS.borderBlue}` }}>
                        {["#", lang === "uz" ? "Kurs nomi" : lang === "ru" ? "Название курса" : "Course Name", t("search_cat"), lang === "uz" ? "Darslar" : lang === "ru" ? "Уроки" : "Lessons", lang === "uz" ? "Davom (%)" : lang === "ru" ? "Прогресс (%)" : "Progress (%)"].map((h, i) => (
                          <th key={i} style={{ padding: "14px 24px", textAlign: "left", fontSize: 14, color: COLORS.headerMain, fontWeight: 700 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enrolled.map((v, i) => (
                        <tr key={v.id} style={{ background: i % 2 === 0 ? COLORS.white : COLORS.tableStripe, borderBottom: `1px solid ${COLORS.borderBlue}`, cursor: "pointer" }} onClick={() => setSelectedVideo(v)}
                          onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? COLORS.white : COLORS.tableStripe}>
                          <td style={{ padding: "14px 24px", fontSize: 15, color: COLORS.textMuted }}>{i + 1}</td>
                          <td style={{ padding: "14px 24px" }}>
                            <div style={{ fontWeight: 700, color: COLORS.headerMain, fontSize: 16 }}>{v.title}</div>
                            <div style={{ fontSize: 14, color: COLORS.textMuted }}>{v.author}</div>
                          </td>
                          <td style={{ padding: "14px 24px" }}><CategoryTag cat={CATEGORY_MAP[v.category] || v.category} /></td>
                          <td style={{ padding: "14px 24px", fontSize: 15, color: COLORS.textMuted, fontWeight: 600 }}>{Math.round(v.lessons * v.progress / 100)}/{v.lessons}</td>
                          <td style={{ padding: "14px 24px", width: 240 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{ flex: 1, background: COLORS.borderBlue, borderRadius: 4, height: 10 }}>
                                <div style={{ background: v.progress === 100 ? "#2e7d32" : COLORS.headerMain, height: "100%", borderRadius: 4, width: `${v.progress}%` }} />
                              </div>
                              <span style={{ fontSize: 14, color: v.progress === 100 ? "#2e7d32" : COLORS.headerMain, fontWeight: 800, minWidth: 40 }}>{v.progress}%</span>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "16px 24px", fontSize: 18, fontWeight: 700 }}>{t("nav_about")}</div>
              <div style={{ padding: 32, lineHeight: 1.8, fontSize: 16, color: COLORS.text }}>
                <p><strong style={{ color: COLORS.headerMain, fontSize: 20 }}>{t("title")}</strong> — {lang === "uz" ? "yetakchi olimlar va o'qituvchilar tomonidan yaratilgan video darsliklarni bir joyda jamlagan raqamli platformadir." : lang === "ru" ? "цифровая платформа, объединяющая видеоуроки, созданные ведущими учеными и преподавателями." : "is a digital platform that brings together video lessons created by leading scientists and teachers."}</p>
                <div style={{ background: COLORS.lightBlue, border: `2px solid ${COLORS.borderBlue}`, borderRadius: 8, padding: 24, margin: "24px 0" }}>
                  <strong style={{ color: COLORS.headerMain, fontSize: 18 }}>{lang === "uz" ? "Maqsad va vazifalar:" : lang === "ru" ? "Цели и задачи:" : "Goals and Tasks:"}</strong>
                  <ul style={{ margin: "16px 0 0", paddingLeft: 24 }}>
                    {[
                      lang === "uz" ? "Sifatli video darsliklarni keng ommaga yetkazish" : lang === "ru" ? "Доставка качественных видеоуроков широкой публике" : "Delivering quality video lessons to the general public",
                      lang === "uz" ? "Ilmiy va ta'limiy resurslarni raqamlashtirish" : lang === "ru" ? "Цифровизация научных и образовательных ресурсов" : "Digitization of scientific and educational resources",
                      lang === "uz" ? "Masofaviy ta'lim imkoniyatlarini kengaytirish" : lang === "ru" ? "Расширение возможностей дистанционного обучения" : "Expanding distance learning opportunities",
                      lang === "uz" ? "Milliy intellektual salohiyatni mustahkamlash" : lang === "ru" ? "Укрепление национального интеллектуального потенциала" : "Strengthening national intellectual potential"
                    ].map((item, i) => <li key={i} style={{ marginBottom: 10, fontSize: 15, fontWeight: 500 }}>{item}</li>)}
                  </ul>
                </div>
                <p>{lang === "uz" ? "Barcha foydalanuvchilar uchun" : lang === "ru" ? "Для всех пользователей" : "For all users"} <strong>{lang === "uz" ? "bepul ro'yxatdan o'tish" : lang === "ru" ? "бесплатная регистрация" : "free registration"}</strong> {lang === "uz" ? "va" : lang === "ru" ? "и" : "and"} <strong>{lang === "uz" ? "onlayn kirish" : lang === "ru" ? "онлайн доступ" : "online access"}</strong> {lang === "uz" ? "imkoniyati mavjud." : lang === "ru" ? "доступны." : "are available."}</p>
              </div>
            </div>
            <div>
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", marginBottom: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ background: COLORS.accent, color: "#fff", padding: "14px 20px", fontSize: 16, fontWeight: 700 }}>📍 {lang === "uz" ? "Aloqa ma'lumotlari" : lang === "ru" ? "Контактная информация" : "Contact Information"}</div>
                <div style={{ padding: 20 }}>
                  {[
                    ["📞", lang === "uz" ? "Telefon" : lang === "ru" ? "Телефон" : "Phone", "(+99871) 232-83-94"],
                    ["📧", "Email", "video@natlib.uz"],
                    ["📍", lang === "uz" ? "Manzil" : lang === "ru" ? "Адрес" : "Address", lang === "uz" ? "Toshkent, Navoiy ko'chasi, 1" : "Ташкент, ул. Навои, 1"],
                    ["🕐", lang === "uz" ? "Ish vaqti" : lang === "ru" ? "Рабочее время" : "Work Hours", "08:00 – 18:00"],
                    ["🌐", "Web", "video.natlib.uz"]
                  ].map(([icon, k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 14, marginBottom: 16, fontSize: 14 }}>
                      <span style={{ fontSize: 20 }}>{icon}</span>
                      <div><div style={{ fontWeight: 700, color: COLORS.headerMain, fontSize: 13, textTransform: "uppercase" }}>{k}</div><div style={{ color: COLORS.text, fontWeight: 500 }}>{v}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ADMIN ===== */}
        {activeTab === "admin" && currentUser?.role === "admin" && (
          <AdminPanel onLogout={logout} />
        )}

        {/* ===== CONTACT ===== */}
        {activeTab === "contact" && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderBlue}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div style={{ background: COLORS.headerMain, color: "#fff", padding: "20px 32px", fontSize: 20, fontWeight: 700 }}>✉️ {lang === "uz" ? "Murojaat Shakli" : lang === "ru" ? "Форма обращения" : "Contact Form"}</div>
              <div style={{ padding: 40 }}>
                {[
                  [lang === "uz" ? "Ism Familiya" : lang === "ru" ? "Имя Фамилия" : "Full Name", "text", lang === "uz" ? "To'liq ismingiz" : "Ваше полное имя"],
                  [lang === "uz" ? "Elektron pochta" : lang === "ru" ? "Электронная почта" : "Email", "email", "email@example.com"],
                  [lang === "uz" ? "Mavzu" : lang === "ru" ? "Тема" : "Subject", "text", lang === "uz" ? "Murojaat mavzusi" : "Тема обращения"]
                ].map(([label, type, ph]) => (
                  <div key={label} style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: COLORS.headerMain, marginBottom: 8 }}>{label} <span style={{ color: COLORS.accent }}>*</span></label>
                    <input type={type} placeholder={ph} style={{ width: "100%", border: `2px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = COLORS.headerMain} onBlur={e => e.target.style.borderColor = COLORS.borderBlue} />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: COLORS.headerMain, marginBottom: 8 }}>{lang === "uz" ? "Xabar" : lang === "ru" ? "Сообщение" : "Message"} <span style={{ color: COLORS.accent }}>*</span></label>
                  <textarea rows={6} placeholder={lang === "uz" ? "Xabaringizni yozing..." : "Напишите ваше сообщение..."} style={{ width: "100%", border: `2px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box", resize: "vertical", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = COLORS.headerMain} onBlur={e => e.target.style.borderColor = COLORS.borderBlue} />
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <button style={{ background: COLORS.headerMain, color: "#fff", border: "none", borderRadius: 4, padding: "14px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{lang === "uz" ? "Yuborish" : lang === "ru" ? "Отправить" : "Send"}</button>
                  <button style={{ background: COLORS.white, color: COLORS.textMuted, border: `2px solid ${COLORS.borderBlue}`, borderRadius: 4, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>{lang === "uz" ? "Tozalash" : lang === "ru" ? "Очистить" : "Clear"}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: COLORS.footerBg, color: COLORS.footerText, marginTop: 64 }}>
        {/* Links bar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "24px 0" }}>
          <div style={{ width: "100%", padding: "0 40px", display: "flex", gap: 32, flexWrap: "wrap", fontSize: 14, boxSizing: "border-box", fontWeight: 500 }}>
            {[
              lang === "uz" ? "Ta'lim portal" : "Образовательный портал",
              lang === "uz" ? "Foydali resurslar" : "Полезные ресурсы",
              lang === "uz" ? "Hamkorlarimiz" : "Наши партнеры",
              lang === "uz" ? "O'quv qo'llanmalar" : "Учебные пособия",
              lang === "uz" ? "Interaktiv darslar" : "Интерактивные уроки"
            ].map((link, i) => (
              <span key={i} style={{ cursor: "pointer", color: COLORS.footerText, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = COLORS.footerText}>{link}</span>
            ))}
          </div>
        </div>
        {/* Main footer */}
        <div style={{ width: "100%", padding: "48px 40px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, boxSizing: "border-box" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "2px solid #fff" }}>🎓</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{t("title")}</div>
                <div style={{ fontSize: 12, color: "#7a9cc8", fontWeight: 500 }}>{t("subtitle")}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#7a9cc8", lineHeight: 1.7, margin: 0, maxWidth: "400px" }}>{t("footer_text")}</p>
            <div style={{ marginTop: 24, fontSize: 14, color: "#7a9cc8" }}>
              <div style={{ marginBottom: 6 }}>📞 (+99871) 232-83-94</div>
              <div>📧 video@kutubxona.uz</div>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 20, fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>{t("footer_services")}</div>
            {[
              lang === "uz" ? "Video Darsliklar Katalogi" : "Каталог видеоуроков",
              lang === "uz" ? "Ilmiy ishlar bazasi" : "База научных работ",
              lang === "uz" ? "Onlayn ro'yxatdan o'tish" : "Онлайн регистрация",
              lang === "uz" ? "Elektron buyurtma" : "Электронный заказ",
              lang === "uz" ? "Sertifikatlar" : "Сертификаты"
            ].map((link, i) => (
              <div key={i} style={{ fontSize: 14, color: "#7a9cc8", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#7a9cc8"}>› {link}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 20, fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>{t("footer_schedule")}</div>
            <div style={{ fontSize: 14, color: "#7a9cc8", lineHeight: 2.2 }}>
              <div>{lang === "uz" ? "Dushanba – Juma" : "Понедельник – Пятница"}: 08:00 – 18:00</div>
              <div>{lang === "uz" ? "Shanba" : "Суббота"}: 09:00 – 17:00</div>
              <div>{lang === "uz" ? "Yakshanba" : "Воскресенье"}: {lang === "uz" ? "Dam olish kuni" : "Выходной"}</div>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
              {["📘", "🐦", "📸", "✈️", "▶️"].map((icon, i) => (
                <span key={i} style={{ fontSize: 24, cursor: "pointer", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}>{icon}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 40px", textAlign: "center", fontSize: 13, color: "#7a9cc8", fontWeight: 500 }}>
          © 2026 {t("title")}. {t("footer_rights")}
        </div>
      </footer>

      {/* MODALS */}
      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} onEnroll={enroll} lang={lang} t={t} />}
      {showAI && <AIModal onClose={() => setShowAI(false)} lang={lang} t={t} />}
      {showAuthModal && (
        <AuthModal
          onClose={() => { setShowAuthModal(false); setPendingVideo(null); }}
          onSuccess={handleLoginSuccess}
          initialTab={authInitialTab}
        />
      )}

      {/* Floating AI */}
      {!showAI && (
        <button onClick={() => setShowAI(true)} style={{ position: "fixed", bottom: 32, right: 32, background: COLORS.headerMain, color: "#fff", border: `3px solid ${COLORS.gold}`, borderRadius: "50%", width: 64, height: 64, fontSize: 32, cursor: "pointer", zIndex: 500, boxShadow: "0 12px 32px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(5deg)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)"; }}>🤖</button>
      )}
    </div>
  );
}
