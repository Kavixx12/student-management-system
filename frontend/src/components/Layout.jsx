import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const O = "#FF8C00";

// ── Inline SVG Icons ──────────────────────────────
const IcoDashboard = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>);
const IcoEnquiry = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>);
const IcoAttendance = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3v4M8 3v4M2 11h20"/></svg>);
const IcoStudents = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>);
const IcoBatch = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>);
const IcoUsers = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12a5 5 0 100-10 5 5 0 000 10z"/><path d="M20 21a8 8 0 10-16 0"/></svg>);
const IcoSettings = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>);
const IcoSearch = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const IcoBell = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>);

// ── Sidebar ──
const NAV = [
  { Icon: IcoDashboard, label: "Dashboard", path: "/dashboard" },
  { Icon: IcoEnquiry,   label: "Enquiry", path: "#" },
  { Icon: IcoAttendance,label: "Attendance", path: "#" },
  { Icon: IcoStudents,  label: "Students", path: "/students" },
  { Icon: IcoBatch,     label: "Batch", path: "#" },
  { Icon: IcoUsers,     label: "Users", path: "#" },
  { Icon: IcoSettings,  label: "Settings", path: "#" },
];

function Sidebar() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '50px', marginBottom: '20px' }}>
        <img 
          
          src={isHovered ? "/logoorange.png" : "/logo.png"} 
          alt="Logo" 
          
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            width: '100px', 
            height: '100px', 
            objectFit: 'contain',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease-in-out'
          }} 
        />
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({Icon, label, path}) => {
          const isActive = currentPath === path;
          return (
            <button 
              key={label} 
              onClick={() => navigate(path)} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon />{label}
            </button>
          )
        })}
      </nav>
    </aside>
  );
}

// ── Top Bar ──
function TopBar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");               
  };

  return (
    <div className="topbar">
      <div className="search-bar">
        <span style={{color:"#444",display:"flex"}}><IcoSearch /></span>
        <input placeholder="Search students by name or code..." />
      </div>
      <div className="topbar-right">
        <span style={{color:"#444",fontSize:12}}>12:31pm, 2026-02-26</span>
        <button className="notification-btn"><IcoBell /></button>
        <div className="user-profile">
          <div className="user-avatar">K</div>
          <span style={{color:"#999",fontSize:14}}>Hi <strong style={{color:"white"}}>Kaveesha</strong></span>
          <button onClick={handleLogout} className="logout-btn">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Layout Component ──
export default function Layout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-main-area">
        <TopBar />

        <div style={{ flex: 1, overflowY: "auto" }}>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}