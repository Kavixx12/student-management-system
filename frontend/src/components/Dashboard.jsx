import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const IcoEye = () => (<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const IcoZap = () => (<svg width="20" height="20" fill="white" stroke="white" strokeWidth="1" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const IcoLeft = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>);
const IcoRight = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>);
const IcoTrend = () => (<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);
const IcoCal = () => (<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);

// ── Donut Chart ──
function DonutChart() {
  const r = 68, cx = 88, cy = 88, circ = 2 * Math.PI * r;
  const segs = [
    { v: 0.80, color: O, off: 0 },
    { v: 0.07, color: "#7A3E00", off: 0.80 },
    { v: 0.13, color: "#252525", off: 0.87 },
  ];
  return (
    <svg width="176" height="176" viewBox="0 0 176 176">
      <circle cx={cx} cy={cy} r={r} fill="#1a1a1a" />
      {segs.map((s, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="20"
          strokeDasharray={`${s.v * circ} ${circ}`} strokeDashoffset={-s.off * circ} transform={`rotate(-90 ${cx} ${cy})`} />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="22" fontWeight="800">80%</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fill={O} fontSize="11" fontWeight="700">✓ PRESENT</text>
    </svg>
  );
}

// ── Mini Calendar ──
function MiniCalendar() {
  const days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const grid = [
    [null,null,1,2,3,4,5], [6,7,8,9,10,11,12], [13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26], [27,28,29,30,31,null,null],
  ];
  const exams = [28,29,30];
  return (
    <div>
      <div className="widget-header">
        <span style={{color:O,fontSize:11,fontWeight:700}}>● EDIT</span>
        <span className="view-all-btn">VIEW ALL</span>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <button style={{background:"none",border:"none",color:"#666",cursor:"pointer"}}><IcoLeft /></button>
        <span style={{color:"white",fontWeight:700,fontSize:14}}>January 2019</span>
        <button style={{background:"none",border:"none",color:"#666",cursor:"pointer"}}><IcoRight /></button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",textAlign:"center",marginBottom:4}}>
        {days.map(d => <div key={d} style={{color:"#555",fontSize:11,fontWeight:600}}>{d}</div>)}
      </div>
      {grid.map((week,wi) => (
        <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",textAlign:"center"}}>
          {week.map((day,di) => {
            const sel = day === 1; const exam = exams.includes(day);
            return (
              <div key={di} style={{padding:"3px 0",display:"flex",justifyContent:"center"}}>
                {day !== null && (
                  <span style={{
                    width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",
                    borderRadius:sel?"50%":4, background:sel?O:exam?"#2A1800":"transparent",
                    color:sel?"white":exam?O:"#bbb", fontWeight:sel?700:400,fontSize:12,cursor:"pointer",
                  }}>{day}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{marginTop:14,paddingTop:12,borderTop:"1px solid #1e1e1e"}}>
        <div style={{display:"flex",gap:14,marginBottom:8}}>
          {[{bg:"#222",b:"1px solid #444",label:"Holidays"},{bg:"#2A1800",b:"none",label:"Exams"}].map(l=>(
            <div key={l.label} style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:10,height:10,background:l.bg,border:l.b,borderRadius:2,display:"inline-block"}}/>
              <span style={{color:"#555",fontSize:11}}>{l.label}</span>
            </div>
          ))}
        </div>
        <p style={{color:"#555",fontSize:11,marginBottom:3}}><span style={{color:O}}>Jan 1</span> &nbsp;New Year Holiday</p>
        <p style={{color:"#555",fontSize:11}}><span style={{color:O}}>Jan 28–30</span> &nbsp;2nd Term Exams</p>
      </div>
    </div>
  );
}

// ── Sidebar ──
const NAV = [
  { Icon: IcoDashboard, label: "Dashboard", active: true },
  { Icon: IcoEnquiry,   label: "Enquiry" },
  { Icon: IcoAttendance,label: "Attendance" },
  { Icon: IcoStudents,  label: "Students" },
  { Icon: IcoBatch,     label: "Batch" },
  { Icon: IcoUsers,     label: "Users" },
  { Icon: IcoSettings,  label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo"><IcoZap /></div>
        <div>
          <div className="brand-text-white">EDU</div>
          <div className="brand-text-orange">SPARK</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({Icon,label,active}) => (
          <button key={label} className={`nav-item ${active ? 'active' : ''}`}>
            <Icon />{label}
          </button>
        ))}
      </nav>

      <div className="sidebar-upgrade">
        <div style={{color:"white",fontWeight:700,fontSize:13,marginBottom:6}}>🚀 Upgrade to Plus</div>
        <div style={{color:"#555",fontSize:11,marginBottom:10,lineHeight:1.5}}>Unlock AI tutoring, unlimited resources & priority support.</div>
        <button className="upgrade-btn">Get Plus →</button>
      </div>
    </aside>
  );
}

// ── Top Bar ──
function TopBar({ onLogout }) {
  return (
    <div className="topbar">
      <div className="search-bar">
        <span style={{color:"#444",display:"flex"}}><IcoSearch /></span>
        <input placeholder="Search students by name or code..." />
      </div>
      <div className="topbar-right">
        <span style={{color:"#444",fontSize:12}}>12:31pm, 2026-02-22</span>
        <button className="notification-btn"><IcoBell /></button>
        <div className="user-profile">
          <div className="user-avatar">K</div>
          <span style={{color:"#999",fontSize:14}}>Hi <strong style={{color:"white"}}>Kaveesha</strong></span>
          
          <button onClick={onLogout} className="logout-btn">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Enquiry Data ──
const CARDS = [
  { label:"TOTAL ENQUIRIES",    value:"13.4K", highlight:false },
  { label:"ENQUIRIES TODAY",    value:"500",   highlight:false },
  { label:"ENQUIRIES THIS WEEK",value:"1K",    highlight:false },
  { label:"ENQUIRIES THIS MONTH",value:"9K",   highlight:false },
  { label:"TOTAL REGISTRATIONS",value:"100K",  highlight:true  },
];

// ── Main Dashboard ──
export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const tabs = ["BACHELORS IN SCIENCE (HONS)... (BHM)", "DIPLOMA IN CULINARY ARTS"];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");               
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main-area">
        
        <TopBar onLogout={handleLogout} />

        <main className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>

          {/* ── Top Row ── */}
          <div className="dashboard-grid">

            {/* Attendance */}
            <div className="widget-card">
              <div className="widget-header">
                <h2 className="widget-title">ATTENDANCE</h2>
                <button className="view-all-btn">VIEW ALL</button>
              </div>

              {/* Tabs */}
              <div className="tabs-container">
                {tabs.map((t,i) => (
                  <button key={i} onClick={() => setTab(i)} className={`tab-btn ${i === tab ? 'active' : ''}`}>
                    {t}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="controls-row">
                <select className="custom-select">
                  <option>BHM 1</option><option>BHM 2</option>
                </select>
                <div className="custom-date">
                  <span style={{color:"#444",display:"flex"}}><IcoCal /></span>
                  <input type="date" defaultValue="2019-01-07" />
                </div>
                <button className="action-btn">
                  <IcoEye />&nbsp;VIEW ATTENDANCE
                </button>
              </div>

              {/* Donut + Legend */}
              <div style={{display:"flex",alignItems:"center",gap:32}}>
                <DonutChart />
                <div>
                  {[
                    {color:O,label:"Present"},
                    {color:"#7A3E00",label:"Late/Half leave"},
                    {color:"#252525",label:"Absent",border:"1px solid #444"},
                  ].map(l => (
                    <div key={l.label} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <span style={{width:12,height:12,borderRadius:"50%",background:l.color,border:l.border||"none",display:"inline-block"}}/>
                      <span style={{color:"#888",fontSize:13}}>{l.label}</span>
                    </div>
                  ))}
                  <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #1e1e1e",display:"flex",gap:10,flexWrap:"wrap"}}>
                    {[{l:"PRESENT:",v:"40",c:O},{l:"ABSENT:",v:"10",c:"#444"},{l:"LATE:",v:"4",c:"#7A3E00"}].map(s => (
                      <span key={s.l} style={{color:"#555",fontSize:11}}>
                        {s.l} <strong style={{color:s.c}}>{s.v}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="widget-card">
              <h2 className="widget-title" style={{marginBottom:12}}>CALENDAR</h2>
              <MiniCalendar />
            </div>
          </div>

          {/* ── Enquiry Row ── */}
          <div>
            <div className="widget-header">
              <h2 className="widget-title">ENQUIRY</h2>
              <button className="view-all-btn">VIEW ALL</button>
            </div>
            <div className="enquiry-grid">
              {CARDS.map(card => (
                <div key={card.label} className={`enquiry-card ${card.highlight ? 'highlight' : ''}`}>
                  {card.highlight && <div className="enquiry-card-top-bar" />}
                  <p className="enquiry-card-label">{card.label}</p>
                  <p className="enquiry-card-value">{card.value}</p>
                  <span style={{color:card.highlight?O:"#2a2a2a",display:"flex"}}><IcoTrend /></span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}