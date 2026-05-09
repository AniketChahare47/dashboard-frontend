import React, { useState } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SIDEBAR_WIDTH = 270;

const Home = () => {
  const [activeSection, setActiveSection] = useState("add");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [latestNote, setLatestNote] = useState(null);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "guest@email.com";

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className={`home-wrapper ${darkMode ? "dark" : "light"}`}>

      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        nav, header { display:none!important; }

body {
  margin:0;
  font-family: Inter, Segoe UI, sans-serif;
}

.home-wrapper {
  display:flex;
  height:100vh;
  overflow:hidden;
}

.home-wrapper.dark {
  background: linear-gradient(135deg,#667eea,#764ba2);
}

.home-wrapper.light {
  background: linear-gradient(135deg,#f8fafc,#e2e8f0);
}

/* ================= SIDEBAR ================= */
.sidebar {
  width:270px;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  background: linear-gradient(180deg,#020617,#020617,#0f172a);
  padding:28px 22px;
  color:white;
  display:flex;
  flex-direction:column;
  z-index:100;
  box-shadow: 8px 0 30px rgba(0,0,0,0.5);
}

.sidebar-logo {
  font-size:28px;
  font-weight:900;
  text-align:center;
  margin-bottom:30px;
  letter-spacing:1px;
  background: linear-gradient(135deg,#60a5fa,#a78bfa);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

/* USER CARD */
.user-box {
  background: rgba(255,255,255,0.08);
  padding:16px;
  border-radius:16px;
  text-align:center;
  margin-bottom:26px;
  border:1px solid rgba(255,255,255,0.08);
}

.user-box span {
  font-size:12px;
  opacity:0.75;
}

.user-box h4 {
  margin-top:6px;
  font-size:14px;
  font-weight:600;
  word-break: break-word;
}

/* SIDEBAR BUTTONS */
.sidebar button {
  background:transparent;
  border:none;
  color:#e5e7eb;
  padding:14px 16px;
  border-radius:14px;
  margin-bottom:10px;
  cursor:pointer;
  transition:all 0.25s ease;
  font-size:15px;
  text-align:left;
}

/* hover */
.sidebar button:hover {
  background: rgba(255,255,255,0.12);
  transform: translateX(4px);
}

/* active */
.sidebar button.active {
  background: linear-gradient(135deg,#667eea,#764ba2);
  box-shadow: 0 10px 25px rgba(102,126,234,0.5);
}

/* DARK MODE TOGGLE */
.dark-toggle {
  margin-top:auto;
  margin-bottom:12px;
  padding:14px;
  border-radius:30px;
  border:none;
  font-weight:600;
  cursor:pointer;
  background: linear-gradient(135deg,#22c55e,#16a34a);
  color:white;
  transition:0.25s;
}

.dark-toggle:hover {
  opacity:0.9;
}

/* LOGOUT */
.logout-btn {
  background:linear-gradient(135deg,#ef4444,#dc2626);
  padding:14px;
  border-radius:30px;
  border:none;
  color:white;
  font-weight:600;
  cursor:pointer;
  transition:0.25s;
}

.logout-btn:hover {
  opacity:0.9;
}

/* ================= MAIN CONTENT ================= */
.main-content {
  margin-left:270px;
  flex:1;
  height:100vh;
  overflow-y:auto;
  padding:48px;
}

.page-header {
  text-align:center;
  margin-bottom:34px;
}

.page-header h1 {
  font-size:42px;
  font-weight:800;
  color: #fff;
}

.page-header p {
  color: rgba(255,255,255,0.85);
}

/* SEARCH */
.toolbar {
  margin-bottom:22px;
}

.toolbar input {
  width:100%;
  padding:14px 18px;
  border-radius:14px;
  border:none;
  outline:none;
  font-size:14px;
}

/* CONTENT CARD */
.content-card {
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(14px);
  padding:36px;
  border-radius:26px;
  box-shadow:0 30px 60px rgba(0,0,0,0.35);
}

/* RECENT NOTE */
.recent-card {
  margin-top:26px;
  padding:22px;
  border-radius:20px;
  background: rgba(255,255,255,0.22);
  color:#fff;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {
  .sidebar {
    position:relative;
    width:100%;
    height:auto;
  }

  .main-content {
    margin-left:0;
    height:auto;
    overflow:visible;
    padding:26px;
  }
}

/* ===== FIX HEADING VISIBILITY ===== */

/* DARK MODE */
.home-wrapper.dark .page-header h1,
.home-wrapper.dark .page-header p {
  color: #ffffff !important;
}

/* LIGHT MODE */
.home-wrapper.light .page-header h1 {
  color: #0f172a !important;   /* dark slate */
}

.home-wrapper.light .page-header p {
  color: #475569 !important;   /* muted gray */
}



      `}</style>

      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-logo">📘 Ebook</div>

        <div className="user-box">
          <span>Logged in as</span>
          <h4>{userEmail}</h4>
        </div>

        <button className={activeSection==="add"?"active":""}
          onClick={()=>setActiveSection("add")}>➕ Add Note</button>

        <button className={activeSection==="show"?"active":""}
          onClick={()=>setActiveSection("show")}>📒 Show All Notes</button>

        <button className={activeSection==="update"?"active":""}
          onClick={()=>setActiveSection("update")}>✏️ Update Notes</button>

        <button className="dark-toggle" onClick={()=>setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <div className="page-header">
          <h1>
            {activeSection==="add" && "Add Your Notes"}
            {activeSection==="show" && "Your Notes"}
            {activeSection==="update" && "Update Notes"}
          </h1>
          <p>
            {activeSection==="add" && "Create notes instantly"}
            {activeSection==="show" && "Search & browse your notes"}
            {activeSection==="update" && "Edit or delete notes"}
          </p>
        </div>

        {activeSection!=="add" && (
          <div className="toolbar">
            <input
              placeholder="🔍 Search notes..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
        )}

        <div className="content-card">
          {activeSection==="add" && (
            <>
              <AddNote toast={toast} onNoteAdded={setLatestNote} />
              {latestNote && (
                <div className="recent-card">
                  <h3>🆕 Recently Added</h3>
                  <h4>{latestNote.title}</h4>
                  <p>{latestNote.description}</p>
                  <small><b>Author:</b> {latestNote.author}</small>
                </div>
              )}
            </>
          )}

          {activeSection==="show" && (
            <Notes mode="user" search={search} toast={toast} />
          )}

          {activeSection==="update" && (
            <Notes mode="update" search={search} toast={toast} />
          )}
        </div>
      </main>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Home;
