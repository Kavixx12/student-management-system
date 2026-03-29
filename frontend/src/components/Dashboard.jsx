import { useState } from "react";
import './Dashboard.css';

const O = "#FF8C00";

// ── Icons used only in Dashboard Content ──
const IcoEye = () => (<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const IcoLeft = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>);
const IcoRight = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>);
const IcoTrend = () => (<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);
const IcoCal = () => (<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);

const IcoStudents2 = () => (<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>);
const IcoBriefcase = () => (<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);
const IcoDollar = () => (<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);

// ── Donut Chart Component ──
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

// ── Mini Calendar Component (Dynamic & Live) ──
function MiniCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();

    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDayIndex = startOfMonth.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const grid = [];
    let currentWeek = [];
    let dayCounter = 1;

    for (let i = 0; i < 7; i++) {
        if (i < startingDayIndex) {
            currentWeek.push(null);
        } else {
            currentWeek.push(dayCounter++);
        }
    }
    grid.push(currentWeek);

    // Fill the remaining weeks
    while (dayCounter <= daysInMonth) {
        currentWeek = [];
        for (let i = 0; i < 7; i++) {
            if (dayCounter <= daysInMonth) {
                currentWeek.push(dayCounter++);
            } else {
                currentWeek.push(null);
            }
        }
        grid.push(currentWeek);
    }


    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Example hardcoded exams for the 15th and 16th
    const exams = [15, 16];

    return (
        <div>
            <div className="widget-header">
                <span style={{color: O, fontSize: 11, fontWeight: 700}}>● EDIT</span>
                <span className="view-all-btn">VIEW ALL</span>
            </div>

            {/* Month & Year Title with Navigation Buttons */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <button onClick={handlePrevMonth} style={{background:"none",border:"none",color:"#666",cursor:"pointer"}}><IcoLeft /></button>
                <span style={{color:"white",fontWeight:700,fontSize:14}}>
          {monthNames[currentMonth]} {currentYear}
        </span>
                <button onClick={handleNextMonth} style={{background:"none",border:"none",color:"#666",cursor:"pointer"}}><IcoRight /></button>
            </div>

            {/* Days Header Row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",textAlign:"center",marginBottom:4}}>
                {days.map(d => <div key={d} style={{color:"#555",fontSize:11,fontWeight:600}}>{d}</div>)}
            </div>

            {/* Dynamic Calendar Grid Generation */}
            {grid.map((week, wi) => (
                <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",textAlign:"center"}}>
                    {week.map((day, di) => {

                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                        const exam = exams.includes(day);

                        return (
                            <div key={di} style={{padding:"3px 0",display:"flex",justifyContent:"center"}}>
                                {day !== null && (
                                    <span style={{
                                        width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
                                        borderRadius: isToday ? "50%" : 4,
                                        background: isToday ? O : exam ? "#2A1800" : "transparent",
                                        color: isToday ? "white" : exam ? O : "#bbb",
                                        fontWeight: isToday ? 700 : 400, fontSize: 12, cursor: "pointer",
                                    }}>{day}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Legends Section */}
            <div style={{marginTop:14,paddingTop:12,borderTop:"1px solid #1e1e1e"}}>
                <div style={{display:"flex",gap:14,marginBottom:8}}>
                    {[{bg:"#222",b:"1px solid #444",label:"Holidays"},{bg:"#2A1800",b:"none",label:"Exams"}].map(l=>(
                        <div key={l.label} style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{width:10,height:10,background:l.bg,border:l.b,borderRadius:2,display:"inline-block"}}/>
                            <span style={{color:"#555",fontSize:11}}>{l.label}</span>
                        </div>
                    ))}
                </div>
                <p style={{color:"#555",fontSize:11,marginBottom:3}}><span style={{color:O}}>15th - 16th</span> &nbsp;Mid Term Exams</p>
            </div>
        </div>
    );
}

// ── Enquiry Data Array ──
const CARDS = [
    { label:"TOTAL ENQUIRIES",    value:"13.4K", highlight:false },
    { label:"ENQUIRIES TODAY",    value:"500",   highlight:false },
    { label:"ENQUIRIES THIS WEEK",value:"1K",    highlight:false },
    { label:"ENQUIRIES THIS MONTH",value:"9K",   highlight:false },
    { label:"TOTAL REGISTRATIONS",value:"100K",  highlight:true  },
];

const TOP_STATS = [
    { label: "Total Students", value: "1,250", subtext: "+15 This Month", Icon: IcoStudents2 },
    { label: "Total Employees", value: "48", subtext: "+2 This Month", Icon: IcoBriefcase },
    { label: "Revenue", value: "$42,500", subtext: "+12% This Month", Icon: IcoDollar },
    { label: "Total Profit", value: "$18,200", subtext: "+8% This Month", Icon: IcoTrend }
];

// ── Main Dashboard Content ──
export default function Dashboard() {
    const [tab, setTab] = useState(0);
    const tabs = ["BACHELORS IN SCIENCE (HONS)... (BHM)", "DIPLOMA IN CULINARY ARTS"];

    return (
        <main className="dashboard-content" style={{ padding: '28px 32px' }}>
            <h1 className="dashboard-title" style={{ marginBottom: '24px' }}>Dashboard</h1>

            <div className="top-stats-grid">
                {TOP_STATS.map((stat, index) => (
                    <div key={index} className="top-stat-card">
                        <div className="stat-header">
                            <span className="stat-label">{stat.label.toUpperCase()}</span>
                            <div className="stat-icon-wrapper">
                                <stat.Icon />
                            </div>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-subtext">
                            <strong>{stat.subtext.split(' ')[0]}</strong> {stat.subtext.split(' ').slice(1).join(' ')}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Middle Row (Attendance & Calendar) ── */}
            <div className="dashboard-grid">

                {/* Attendance Widget */}
                <div className="widget-card">
                    <div className="widget-header">
                        <h2 className="widget-title">ATTENDANCE</h2>
                        <button className="view-all-btn">VIEW ALL</button>
                    </div>
                    <br/>

                    {/* Attendance Controls */}
                    <div className="controls-row">
                        <div className="custom-date">
                            <span style={{color:"#444",display:"flex"}}><IcoCal /></span>
                            <input type="date" defaultValue="2026-03-31" />
                        </div>
                        <button className="action-btn">
                            <IcoEye />&nbsp;VIEW ATTENDANCE
                        </button>
                    </div>

                    {/* Donut Chart & Legend */}
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

                {/* Calendar Widget */}
                <div className="widget-card">
                    <h2 className="widget-title" style={{marginBottom:12}}>CALENDAR</h2>
                    <MiniCalendar />
                </div>
            </div>

        </main>
    );
}