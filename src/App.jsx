import { useState } from 'react'
import './App.css'
import Eligibility from './Eligibility.jsx';
import NoticeAnalyzer from './NoticeAnalyzer.jsx';
import CompanyInvestigator from './CompanyInvestigator.jsx';
const drives = [
  { company: 'Google India', role: 'Software Engineering Intern', date: '25 Oct 2026', ctc: '₹1.2 LPA', status: 'Needs review', reason: 'CGPA interpretation needs verification' },
  { company: 'Microsoft', role: 'Explore Internship', date: '28 Oct 2026', ctc: 'Internship', status: 'Eligible', reason: 'All listed criteria met' },
  { company: 'Adobe', role: 'Product Engineering Intern', date: '02 Nov 2026', ctc: 'Internship', status: 'Eligible', reason: 'All listed criteria met' },
]

const students = [
  { name: 'Aarav Sharma', id: 'USICT/2025/0487', branch: 'CSE-DS', cgpa: 8.6, backlogs: 0, status: 'Eligible', reason: 'All criteria met' },
  { name: 'Ishita Verma', id: 'USICT/2025/0673', branch: 'CSE-DS', cgpa: 7.4, backlogs: 0, status: 'Eligible', reason: 'All criteria met' },
  { name: 'Rohan Malhotra', id: 'USICT/2025/0521', branch: 'CSE-AI', cgpa: 7.1, backlogs: 1, status: 'Not eligible', reason: 'Active backlog criterion' },
  { name: 'Neha Singh', id: 'USICT/2025/0634', branch: 'IT', cgpa: 7.8, backlogs: 0, status: 'Eligible', reason: 'All criteria met' },
  { name: 'Priya Mehta', id: 'USICT/2025/0712', branch: 'CSE-DS', cgpa: 6.8, backlogs: 0, status: 'Needs review', reason: 'Minimum CGPA interpretation unclear' },
  { name: 'Vivek Yadav', id: 'USICT/2025/0731', branch: 'ECE', cgpa: 6.9, backlogs: 1, status: 'Needs review', reason: 'Verify CGPA and backlog rules' },
]

function Brand() {
  return (
    <div className="brand">
      <img
        src="/tnp-copilot-logo.png"
        alt="TnP Copilot"
        className="brand-logo"
      />
      <div>
        <strong>TnP Copilot</strong>
        <small>USICT · Placement Services</small>
      </div>
    </div>
  );
}
function Status({ value }) {
  const cls = value === 'Eligible' ? 'eligible'
    : value === 'Not eligible' ? 'ineligible' : 'review'
  return <span className={`status ${cls}`}><i />{value}</span>
}

function Login({ onEnter }) {
  const [role, setRole] = useState('student')

  return (
    <main className="login-page">
      <header className="login-top"><Brand /><span className="top-label">CAMPUS CAREERS, CONNECTED</span></header>
      <section className="login-hero">
        <div className="hero-copy">
          <span className="eyebrow"><i /> YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>Better placements.<br /><span>Brighter futures.</span></h1>
          <p>One connected space for campus opportunities, transparent eligibility and a smoother placement journey.</p>
          <div className="trust-points"><span>✓ Verified opportunities</span><span>✓ Clear eligibility</span><span>✓ Every step, organised</span></div>
          <div className="hero-note"><span className="note-icon">✳</span><div><strong>Built around students.</strong><small>Designed for the USICT placement community.</small></div></div>
        </div>
        <div className="login-card">
          <span className="card-kicker">WELCOME TO USICT</span>
          <h2>Choose your portal</h2>
          <p className="muted">Select a workspace to explore the prototype.</p>
          <div className="role-switch">
            <button className={`role-option ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
              <span className="role-icon">♙</span><span><strong>Student</strong><small>Explore opportunities</small></span><span className="radio-dot" />
            </button>
            <button className={`role-option ${role === 'coordinator' ? 'active' : ''}`} onClick={() => setRole('coordinator')}>
              <span className="role-icon">▤</span><span><strong>Coordinator</strong><small>Manage placements</small></span><span className="radio-dot" />
            </button>
          </div>
          <div className="selected-role"><span className="selected-check">✓</span><div><strong>{role === 'student' ? 'Student workspace' : 'Coordinator workspace'}</strong><small>{role === 'student' ? 'Discover drives and track applications.' : 'Review eligibility and coordinate company drives.'}</small></div></div>
          <button className="primary-button full" onClick={() => onEnter(role)}>Continue as {role === 'student' ? 'Student' : 'Coordinator'} <span>→</span></button>
          <p className="security-note">◇ Demo prototype · No real sign-in yet</p>
        </div>
      </section>
      <footer className="login-footer">© 2026 TnP Copilot · USICT concept prototype <span>Opportunity, made clearer.</span></footer>
    </main>
  )
}

function Sidebar({ role, page, setPage, onLogout }) {
  const studentLinks = [
    ['Overview', '⌂'], ['Placement drives', '▤'], ['My applications', '↗'], ['My profile', '♙'],
  ]
  const coordinatorLinks = [
  ['Overview', '⌂'],
  ['Eligibility traceability', '▣'],
  ['Company Notice Analyzer', '✧'],
  ['Investigate Company', '🔎'],
  ['Inbox', '✉'],
  ['Drives & companies', '▤'],
  ['Students', '♙'],
  ['Student Intelligence', '✦'],
  ['Review queue', '◷'],
  ['Reports', '▥'],
]
  const links = role === 'student' ? studentLinks : coordinatorLinks

  return (
    <aside className="sidebar">
      <Brand />
      <div className="side-label">WORKSPACE</div>
      <nav className="side-nav">
        {links.map(([label, icon]) => (
          <button key={label} className={page === label ? 'nav-link selected' : 'nav-link'} onClick={() => setPage(label)}>
            <span className="nav-icon">{icon}</span>{label}
            {label === 'Review queue' && <span className="nav-count">2</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="campus-card"><span className="campus-seal">U</span><div><strong>USICT</strong><small>{role === 'student' ? 'Student portal' : 'TnP Committee'}</small></div></div>
        <button className="logout-button" onClick={onLogout}>↪ <span>Back to portal selection</span></button>
      </div>
    </aside>
  )
}

function Header({ role, page }) {
  return (
    <header className="app-header">
      <div><span className="breadcrumb">USICT / {role === 'student' ? 'Student portal' : 'Coordinator portal'}</span><h2>{page}</h2></div>
      <div className="header-actions"><span className="prototype-tag">DEMO DATA</span><button className="bell" title="Notifications">♧<i /></button><div className="user-avatar">{role === 'student' ? 'ST' : 'TN'}</div><div className="user-info"><strong>{role === 'student' ? 'Student User' : 'TnP Coordinator'}</strong><small>{role === 'student' ? 'CSE-DS · Batch 2025' : 'Placement Services'}</small></div></div>
    </header>
  )
}

function Metric({ label, value, detail, tone }) {
  return <div className="metric-card"><div className={`metric-icon ${tone}`}>{tone === 'green' ? '✓' : tone === 'amber' ? '◷' : tone === 'red' ? '×' : '↗'}</div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div>
}

function StudentDashboard({ page, setPage }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const filtered = drives.filter(d => (d.company + d.role).toLowerCase().includes(search.toLowerCase()) && (filter === 'All' || d.status === filter))

  if (page === 'My profile') return <section className="content-section"><div className="section-heading"><div><h3>My profile</h3><p>Demo student information for the prototype.</p></div></div><div className="profile-card"><div className="profile-avatar">ST</div><h3>Student User</h3><p>USICT/2025/0712 · CSE-DS</p><div className="profile-grid"><div><small>Current CGPA</small><strong>6.8 / 10</strong></div><div><small>Active backlogs</small><strong>0</strong></div><div><small>Batch</small><strong>2025–2029</strong></div></div><p className="muted">These are sample values. A real account will use verified student records.</p></div></section>

  if (page === 'My applications') return <section className="content-section"><div className="section-heading"><div><h3>Application tracker</h3><p>Follow your progress across placement opportunities.</p></div></div><div className="panel"><div className="table-wrap"><table><thead><tr><th>Company</th><th>Role</th><th>Applied on</th><th>Application status</th></tr></thead><tbody><tr><td>Microsoft</td><td>Explore Internship</td><td>10 Oct 2026</td><td><Status value="Eligible" /></td></tr><tr><td>Google India</td><td>Software Engineering Intern</td><td>—</td><td><Status value="Needs review" /></td></tr></tbody></table></div></div></section>

  return (
    <div className="dashboard-content">
      <div className="welcome-row"><div><span className="eyebrow compact">YOUR PLACEMENT JOURNEY</span><h3>{page === 'Placement drives' ? 'Explore placement drives' : 'Welcome back, Student'}</h3><p>{page === 'Placement drives' ? 'Find opportunities and check your eligibility before applying.' : 'Here’s your overview of upcoming opportunities and application progress.'}</p></div><button className="secondary-button" onClick={() => setPage('My profile')}>View my profile ↗</button></div>
      <div className="metrics-grid">
        <Metric label="Open opportunities" value="08" detail="Across listed companies" tone="blue" />
        <Metric label="Eligible drives" value="02" detail="Based on demo profile" tone="green" />
        <Metric label="Applications" value="01" detail="In progress" tone="amber" />
      </div>
      <section className="content-section">
        <div className="section-heading"><div><h3>Placement opportunities</h3><p>Check each company’s requirements before applying.</p></div><button className="text-button" onClick={() => setPage('My applications')}>Track applications →</button></div>
        <div className="drive-tools"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies or roles..." /><select value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>Eligible</option><option>Needs review</option><option>Not eligible</option></select></div>
        <div className="drive-list">
          {filtered.map(d => <article className="drive-card" key={d.company}><div className="company-logo">{d.company[0]}</div><div className="drive-main"><div className="drive-title"><h4>{d.company}</h4><Status value={d.status} /></div><p>{d.role}</p><div className="drive-meta"><span>◷ Apply by {d.date}</span><span>◇ {d.ctc}</span></div><small className="reason-line">{d.reason}</small></div><button className="secondary-button" onClick={() => alert(`${d.company}: demo details only. Real applications will be connected later.`)}>View details ↗</button></article>)}
          {filtered.length === 0 && <p className="empty-state">No drives match your search.</p>}
        </div>
      </section>
      <div className="notice-card"><span>ⓘ</span><div><strong>Understand your eligibility</strong><p>When a rule is unclear, TnP Copilot should explain the uncertainty and refer it to a coordinator instead of making an unsupported decision.</p></div></div>
    </div>
  )
}

const studentProfiles = {
  'USICT/2025/0487': { email: 'aarav.demo@example.com', phone: '', linkedin: '', github: '', batch: '2025–2029', skills: ['Python', 'SQL', 'Data Analysis'], projects: [{ name: 'Student Performance Dashboard', detail: 'Sample project · add verified repository link' }, { name: 'Campus Utility App', detail: 'Sample project · details to be supplied by student' }], interests: ['Data Science', 'Backend Development'] },
  'USICT/2025/0673': { email: 'ishita.demo@example.com', phone: '', linkedin: '', github: '', batch: '2025–2029', skills: ['Python', 'Java', 'Problem Solving'], projects: [{ name: 'Personal Portfolio', detail: 'Sample project · add verified repository link' }], interests: ['Software Engineering', 'AI/ML'] },
  'USICT/2025/0521': { email: 'rohan.demo@example.com', phone: '', linkedin: '', github: '', batch: '2025–2029', skills: ['C++', 'Python', 'Data Structures'], projects: [{ name: 'Algorithm Visualizer', detail: 'Sample project · add verified repository link' }], interests: ['Software Engineering', 'Competitive Programming'] },
  'USICT/2025/0634': { email: 'neha.demo@example.com', phone: '', linkedin: '', github: '', batch: '2025–2029', skills: ['JavaScript', 'HTML/CSS', 'SQL'], projects: [{ name: 'Responsive Web App', detail: 'Sample project · add verified repository link' }], interests: ['Web Development', 'Product Engineering'] },
  'USICT/2025/0712': { email: 'priya.demo@example.com', phone: '', linkedin: '', github: '', batch: '2025–2029', skills: ['Python', 'Excel', 'SQL'], projects: [{ name: 'Data Exploration Notebook', detail: 'Sample project · add verified repository link' }], interests: ['Data Analytics', 'Machine Learning'] },
  'USICT/2025/0731': { email: 'vivek.demo@example.com', phone: '', linkedin: '', github: '', batch: '2025–2029', skills: ['C', 'Python', 'Networking Basics'], projects: [{ name: 'Network Monitor Prototype', detail: 'Sample project · add verified repository link' }], interests: ['Systems', 'Networking'] },
}

function StudentDirectory({ records, statusFor, onBack }) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(records[0]?.id || '')
  const visible = records.filter(s => `${s.name} ${s.id} ${s.branch}`.toLowerCase().includes(query.toLowerCase()))
  const student = records.find(s => s.id === selectedId) || visible[0]
  const profile = student ? (studentProfiles[student.id] || {}) : {}
  if (!student) return <section className="student-directory-page"><div className="student-page-heading"><button className="text-button" onClick={onBack}>← Back to overview</button><h2>Student directory</h2><p>No student records match this search.</p><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students..." /></div></section>
  const status = statusFor(student)
  const links = [{ label: 'Email', value: profile.email, href: profile.email ? `mailto:${profile.email}` : '' }, { label: 'Phone', value: profile.phone || 'Not provided', href: profile.phone ? `tel:${profile.phone}` : '' }, { label: 'LinkedIn', value: profile.linkedin || 'Profile not added', href: profile.linkedin }, { label: 'GitHub', value: profile.github || 'Profile not added', href: profile.github }]
  return <section className="student-directory-page">
    <div className="student-page-heading"><div><span className="eyebrow compact">CANDIDATE INTELLIGENCE</span><h2>Student profiles</h2><p>Academic details, skills, projects and placement eligibility in one workspace.</p></div><button className="secondary-button" onClick={onBack}>← Back to overview</button></div>
    <div className="student-directory-layout">
      <aside className="student-list-panel"><div className="student-list-title"><div><h3>Candidates</h3><small>{records.length} demo records</small></div><span className="student-list-count">{visible.length}</span></div><input aria-label="Search candidates" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, roll no. or branch" />
        <div className="student-list-items">{visible.map(s => <button key={s.id} className={`student-list-item ${student.id === s.id ? 'active' : ''}`} onClick={() => setSelectedId(s.id)}><span className="student-avatar large">{s.name.split(' ').map(n => n[0]).join('')}</span><span className="student-list-copy"><strong>{s.name}</strong><small>{s.branch} · CGPA {s.cgpa.toFixed(1)}</small><Status value={statusFor(s)} /></span><span className="student-chevron">›</span></button>)}</div>
      </aside>
      <div className="student-profile-content">
        <article className="student-profile-hero"><div className="student-profile-identity"><div className="student-profile-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div><div><span className="analytics-kicker">STUDENT PROFILE · DEMO</span><h2>{student.name}</h2><p>{student.id} · {student.branch} · Batch {profile.batch || '2025–2029'}</p><div className="student-profile-badges"><Status value={status} /><span className="student-verified-label">Sample record</span></div></div></div><div className="student-hero-actions"><button className="secondary-button" onClick={() => { if (profile.email) window.location.href = `mailto:${profile.email}` }}>✉ Email student</button><button className="primary-button" onClick={() => alert('Coordinator review action can be connected to the shared student database in the next iteration.')}>Review candidate ↗</button></div></article>
        <div className="student-stat-grid"><div className="student-stat-card"><span>Current CGPA</span><strong>{student.cgpa.toFixed(1)}<small> / 10</small></strong><div className="student-stat-track"><i style={{width: `${Math.min(100, student.cgpa * 10)}%`}} /></div></div><div className="student-stat-card"><span>Active backlogs</span><strong>{student.backlogs}</strong><small>{student.backlogs ? 'Requires criteria check' : 'No active backlog in sample'}</small></div><div className="student-stat-card"><span>Branch</span><strong className="branch-value">{student.branch}</strong><small>USICT · Sample cohort</small></div><div className="student-stat-card"><span>Eligibility</span><strong className="status-value">{status}</strong><small>Based on current demo rules</small></div></div>
        <div className="student-detail-grid"><div className="student-detail-main">
          <article className="student-detail-card"><div className="student-detail-heading"><div><h3>Skills & interests</h3><p>Use verified student-submitted information for actual screening.</p></div><span className="detail-heading-icon">✦</span></div><h4>Technical skills</h4><div className="student-skill-tags">{(profile.skills || []).map(skill => <span key={skill}>{skill}</span>)}</div><h4>Areas of interest</h4><div className="student-skill-tags muted-tags">{(profile.interests || []).map(skill => <span key={skill}>{skill}</span>)}</div></article>
          <article className="student-detail-card"><div className="student-detail-heading"><div><h3>Projects & portfolio</h3><p>Projects to discuss during recruiter screening.</p></div><span className="detail-heading-icon">⌘</span></div>{(profile.projects || []).map((project, i) => <div className="student-project-row" key={project.name}><span className="project-number">0{i + 1}</span><div><strong>{project.name}</strong><p>{project.detail}</p></div><span className="project-link-placeholder">Link pending</span></div>)}</article>
          <article className="student-detail-card"><div className="student-detail-heading"><div><h3>Eligibility explanation</h3><p>Keep the decision connected to criteria and source evidence.</p></div><span className="detail-heading-icon">✓</span></div><div className={`student-eligibility-note ${status === 'Eligible' ? 'is-eligible' : status === 'Not eligible' ? 'is-ineligible' : 'is-review'}`}><strong>{student.reason}</strong><p>This is a sample outcome. Confirm the company notice, CGPA threshold, branch list and backlog policy before using it for an official placement decision.</p></div></article>
        </div><aside className="student-detail-side"><article className="student-detail-card"><div className="student-detail-heading"><div><h3>Contact & profiles</h3><p>Click a link when a verified value is available.</p></div></div>{links.map(link => <div className="student-contact-row" key={link.label}><span className="student-contact-icon">{link.label === 'Email' ? '✉' : link.label === 'Phone' ? '☎' : link.label === 'LinkedIn' ? 'in' : '⌘'}</span><div><small>{link.label}</small>{link.href ? <a href={link.href} target={link.label === 'Email' || link.label === 'Phone' ? undefined : '_blank'} rel="noreferrer">{link.value}</a> : <span>{link.value}</span>}</div></div>)}<div className="student-contact-disclaimer">Demo contact details are placeholders. Replace them with student-approved, verified information.</div></article>
          <article className="student-detail-card"><div className="student-detail-heading"><div><h3>Coordinator checklist</h3><p>Before referring this candidate.</p></div></div><ul className="student-checklist"><li>Confirm CGPA from official records</li><li>Verify backlog status</li><li>Review CV and project links</li><li>Match skills to job requirements</li></ul></article></aside></div>
      </div>
    </div>
  </section>
}

function CoordinatorDashboard({
  page,
  setPage,
  appliedRules,
  setAppliedRules,
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [reviewed, setReviewed] = useState([])
  const statusFor = (student) => reviewed.includes(student.id) ? 'Eligible' : student.status
  const filtered = students.filter(s => (s.name + s.id + s.branch).toLowerCase().includes(search.toLowerCase()) && (filter === 'All' || statusFor(s) === filter))
  const eligibleStudents = students.filter(s => statusFor(s) === 'Eligible')
  const needsReview = students.filter(s => statusFor(s) === 'Needs review')
  const ineligibleStudents = students.filter(s => statusFor(s) === 'Not eligible')
  const totalStudents = students.length
  const percent = (count) => totalStudents ? Math.round((count / totalStudents) * 100) : 0
  const branchStats = [...new Set(students.map(s => s.branch))].map(branch => {
    const members = students.filter(s => s.branch === branch)
    return {
      branch,
      total: members.length,
      eligible: members.filter(s => statusFor(s) === 'Eligible').length,
      review: members.filter(s => statusFor(s) === 'Needs review').length,
      ineligible: members.filter(s => statusFor(s) === 'Not eligible').length,
    }
  }).sort((a, b) => b.total - a.total || a.branch.localeCompare(b.branch))
  const topReviewReasons = Object.entries(needsReview.reduce((acc, student) => {
    acc[student.reason] = (acc[student.reason] || 0) + 1
    return acc
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 3)
  if (page === 'Company Notice Analyzer') {
    return <NoticeAnalyzer setAppliedRules={setAppliedRules} setPage={setPage} />;
  }
  if (page === 'Investigate Company') {
    return <CompanyInvestigator />;
  }
  if (page === 'Inbox') {
    return <TnPInbox />;
  }
  if (page === 'Student Intelligence') {
    return <StudentDirectory records={students} statusFor={statusFor} onBack={() => setPage('Overview')} />;
  }
  if (page === 'Eligibility traceability') {
    return <Eligibility appliedRules={appliedRules} />;
  }
  
  if (page === 'Drives & companies') return <section className="content-section"><div className="section-heading"><div><h3>Drives & companies</h3><p>Sample company drives for the prototype.</p></div><button className="primary-button" onClick={() => alert('Drive creation form will be added in the next iteration.')}>+ Add a drive</button></div><div className="panel"><div className="table-wrap"><table><thead><tr><th>Company</th><th>Role</th><th>Deadline</th><th>Listed status</th></tr></thead><tbody>{drives.map(d => <tr key={d.company}><td><strong>{d.company}</strong></td><td>{d.role}</td><td>{d.date}</td><td><Status value={d.status} /></td></tr>)}</tbody></table></div></div></section>

  if (page === 'Reports') return <section className="content-section"><div className="section-heading"><div><h3>Placement reports</h3><p>Snapshot of sample eligibility outcomes.</p></div><button className="secondary-button" onClick={() => alert('CSV export will be added after the data model is connected.')}>Export report ↓</button></div><div className="metrics-grid"><Metric label="Eligible" value="82" detail="52.9% of sample" tone="green" /><Metric label="Needs review" value={String(needsReview.length)} detail="Pending coordinator review" tone="amber" /><Metric label="Not eligible" value="54" detail="34.8% of sample" tone="red" /></div><div className="notice-card"><span>ⓘ</span><div><strong>Demo report</strong><p>These totals are illustrative and are not calculated from actual student records.</p></div></div></section>

  return (
    <div className="dashboard-content">
      <div className="welcome-row"><div><span className="eyebrow compact">PLACEMENT OPERATIONS</span><h3>{page === 'Review queue' ? 'Coordinator review queue' : page === 'Students' ? 'Student directory' : 'Placement overview'}</h3><p>{page === 'Review queue' ? 'Resolve ambiguous eligibility cases with a traceable decision.' : 'Monitor eligibility outcomes and keep placement decisions explainable.'}</p></div><button className="secondary-button" onClick={() => setPage('Reports')}>View reports ↗</button></div>
      <div className="metrics-grid">
        <Metric label="Students assessed" value={String(totalStudents)} detail="Sample student records" tone="blue" />
        <Metric label="Eligible" value={String(eligibleStudents.length)} detail={`${percent(eligibleStudents.length)}% of sample`} tone="green" />
        <Metric label="Needs review" value={String(needsReview.length)} detail="Awaiting human review" tone="amber" />
        <Metric label="Not eligible" value={String(ineligibleStudents.length)} detail={`${percent(ineligibleStudents.length)}% of sample`} tone="red" />
      </div>
      {page === 'Overview' && <section className="analytics-grid" aria-label="Placement analytics">
        <article className="analytics-card outcomes-card">
          <div className="analytics-card-heading"><div><span className="analytics-kicker">LIVE SAMPLE BREAKDOWN</span><h4>Eligibility outcomes</h4><p>Distribution across the currently loaded student records.</p></div><span className="analytics-total">{totalStudents} records</span></div>
          <div className="outcome-visual">
            <div className="outcome-donut" style={{ '--eligible-share': `${percent(eligibleStudents.length)}%`, '--review-share': `${percent(needsReview.length)}%`, '--ineligible-share': `${percent(ineligibleStudents.length)}%` }}><div className="outcome-donut-center"><strong>{totalStudents}</strong><span>students</span></div></div>
            <div className="outcome-legend">
              <div><span className="legend-dot eligible-dot"/><span>Eligible</span><strong>{eligibleStudents.length}</strong><small>{percent(eligibleStudents.length)}%</small></div>
              <div><span className="legend-dot review-dot"/><span>Needs review</span><strong>{needsReview.length}</strong><small>{percent(needsReview.length)}%</small></div>
              <div><span className="legend-dot ineligible-dot"/><span>Not eligible</span><strong>{ineligibleStudents.length}</strong><small>{percent(ineligibleStudents.length)}%</small></div>
            </div>
          </div>
          <div className="analytics-footnote"><span className="footnote-icon">i</span>Demo records only. Outcomes update when a coordinator marks a case verified.</div>
        </article>
        <article className="analytics-card branch-card">
          <div className="analytics-card-heading"><div><span className="analytics-kicker">COHORT VIEW</span><h4>Branch-wise snapshot</h4><p>Compare eligibility outcomes by branch.</p></div></div>
          <div className="branch-chart">{branchStats.map(branch => <div className="branch-row" key={branch.branch}><div className="branch-row-label"><strong>{branch.branch}</strong><span>{branch.total} student{branch.total === 1 ? '' : 's'}</span></div><div className="branch-stack" aria-label={`${branch.branch}: ${branch.eligible} eligible, ${branch.review} needs review, ${branch.ineligible} not eligible`}>{branch.eligible > 0 && <span className="branch-segment eligible-segment" style={{ width: `${branch.eligible / branch.total * 100}%` }} />}{branch.review > 0 && <span className="branch-segment review-segment" style={{ width: `${branch.review / branch.total * 100}%` }} />}{branch.ineligible > 0 && <span className="branch-segment ineligible-segment" style={{ width: `${branch.ineligible / branch.total * 100}%` }} />}</div></div>)}</div>
          <div className="branch-legend"><span><i className="eligible-dot"/>Eligible</span><span><i className="review-dot"/>Review</span><span><i className="ineligible-dot"/>Not eligible</span></div>
        </article>
        <article className="analytics-card review-insights-card">
          <div className="analytics-card-heading"><div><span className="analytics-kicker">ACTION REQUIRED</span><h4>Review priorities</h4><p>Cases that still need coordinator attention.</p></div><span className="review-count-pill">{needsReview.length} pending</span></div>
          {needsReview.length ? <div className="review-priority-list">{topReviewReasons.map(([reason, count]) => <div className="priority-item" key={reason}><span className="priority-symbol">!</span><div><strong>{reason}</strong><small>{count} case{count === 1 ? '' : 's'} · confirm against source evidence</small></div><span className="priority-count">{count}</span></div>)}</div> : <div className="all-clear-state"><span>✓</span><div><strong>No pending review cases</strong><small>All sample cases have been reviewed.</small></div></div>}
          <button className="analytics-link" onClick={() => setPage('Review queue')}>Open review queue <span>→</span></button>
        </article>
      </section>}
      {page === 'Overview' && <section className="overview-ops-grid" aria-label="Placement operations and recent activity">
        <article className="overview-ops-card priority-card">
          <div className="overview-ops-heading"><div><span className="analytics-kicker">YOUR NEXT ACTIONS</span><h4>Priority actions</h4><p>Quick routes to the work that needs attention.</p></div><span className="overview-live-dot"><i /> Demo workspace</span></div>
          <button className="overview-action-row" onClick={() => setPage('Review queue')}><span className="overview-action-icon amber">!</span><span className="overview-action-copy"><strong>Resolve eligibility cases</strong><small>{needsReview.length} sample case{needsReview.length === 1 ? '' : 's'} awaiting human review</small></span><span className="overview-action-arrow">→</span></button>
          <button className="overview-action-row" onClick={() => setPage('Inbox')}><span className="overview-action-icon violet">✉</span><span className="overview-action-copy"><strong>Check team notices and HR messages</strong><small>Open the shared demo inbox and review instructions</small></span><span className="overview-action-arrow">→</span></button>
          <button className="overview-action-row" onClick={() => setPage('Company Notice Analyzer')}><span className="overview-action-icon blue">✧</span><span className="overview-action-copy"><strong>Analyze a placement notice</strong><small>Extract criteria, then verify before applying rules</small></span><span className="overview-action-arrow">→</span></button>
          <button className="overview-action-row" onClick={() => setPage('Investigate Company')}><span className="overview-action-icon green">⌕</span><span className="overview-action-copy"><strong>Investigate a company webpage</strong><small>Collect source evidence with TinyFish</small></span><span className="overview-action-arrow">→</span></button>
        </article>
        <article className="overview-ops-card deadlines-card">
          <div className="overview-ops-heading"><div><span className="analytics-kicker">DRIVE TRACKER</span><h4>Upcoming deadlines</h4><p>Illustrative dates from the sample drive list.</p></div><button className="overview-mini-link" onClick={() => setPage('Drives & companies')}>All drives ↗</button></div>
          <div className="overview-deadline-list">
            <div className="overview-deadline-row"><div className="overview-date-tile"><strong>25</strong><span>OCT</span></div><div className="overview-deadline-copy"><strong>Google India</strong><small>Software Engineering Intern</small></div><span className="overview-deadline-status review">Review</span></div>
            <div className="overview-deadline-row"><div className="overview-date-tile"><strong>28</strong><span>OCT</span></div><div className="overview-deadline-copy"><strong>Microsoft</strong><small>Explore Internship</small></div><span className="overview-deadline-status good">Eligible</span></div>
            <div className="overview-deadline-row"><div className="overview-date-tile"><strong>02</strong><span>NOV</span></div><div className="overview-deadline-copy"><strong>Adobe</strong><small>Product Engineering Intern</small></div><span className="overview-deadline-status good">Eligible</span></div>
          </div>
          <div className="overview-demo-note"><span>i</span> Sample schedule only. Confirm actual deadlines against official company notices.</div>
        </article>
        <article className="overview-ops-card activity-card">
          <div className="overview-ops-heading"><div><span className="analytics-kicker">WORKSPACE PULSE</span><h4>Recent activity</h4><p>A quick guide to the prototype workflow.</p></div><span className="activity-count">4 steps</span></div>
          <div className="overview-timeline">
            <div className="overview-timeline-item"><span className="timeline-marker violet">✧</span><div><strong>Notice analysis</strong><p>Gemini can extract criteria for coordinator review.</p><small>Company Notice Analyzer</small></div><button onClick={() => setPage('Company Notice Analyzer')} aria-label="Open notice analyzer">↗</button></div>
            <div className="overview-timeline-item"><span className="timeline-marker blue">⌕</span><div><strong>Company research</strong><p>TinyFish retrieves webpage content to inspect and verify.</p><small>Investigate Company</small></div><button onClick={() => setPage('Investigate Company')} aria-label="Open company investigation">↗</button></div>
            <div className="overview-timeline-item"><span className="timeline-marker green">✓</span><div><strong>Eligibility review</strong><p>Review uncertain cases before treating results as final.</p><small>Eligibility traceability</small></div><button onClick={() => setPage('Eligibility traceability')} aria-label="Open eligibility traceability">↗</button></div>
            <div className="overview-timeline-item"><span className="timeline-marker amber">✉</span><div><strong>Team coordination</strong><p>Keep sample HR messages and team notices together.</p><small>Inbox</small></div><button onClick={() => setPage('Inbox')} aria-label="Open inbox">↗</button></div>
          </div>
        </article>
      </section>}
      <section className="content-section">
        <div className="section-heading"><div><h3>{page === 'Review queue' ? 'Cases awaiting review' : 'Eligibility traceability'}</h3><p>Every result should connect to a rule and its source evidence.</p></div><button className="text-button" onClick={() => setPage('Review queue')}>Review queue ({needsReview.length}) →</button></div>
        <div className="drive-tools"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, roll number or branch..." /><select value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>Eligible</option><option>Needs review</option><option>Not eligible</option></select></div>
        <div className="panel"><div className="table-wrap"><table><thead><tr><th>Student</th><th>Branch</th><th>CGPA</th><th>Backlogs</th><th>Eligibility</th><th>Reason</th><th>Action</th></tr></thead><tbody>
          {filtered.map(s => <tr key={s.id}><td><div className="student-cell"><span className="student-avatar">{s.name.split(' ').map(n => n[0]).join('')}</span><span><strong>{s.name}</strong><small>{s.id}</small></span></div></td><td>{s.branch}</td><td>{s.cgpa.toFixed(1)}</td><td>{s.backlogs}</td><td><Status value={statusFor(s)} /></td><td className="reason-cell">{s.reason}</td><td><button className="table-action" onClick={() => setSelected(s)}>Review ↗</button></td></tr>)}
        </tbody></table>{filtered.length === 0 && <p className="empty-state">No students match your search.</p>}</div></div>
      </section>
      <div className="notice-card"><span>✦</span><div><strong>Traceability, not guesswork</strong><p>Ambiguous company criteria should be flagged for a coordinator. The prototype does not make official placement decisions.</p></div></div>
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="review-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}>×</button><span className="card-kicker">ELIGIBILITY REVIEW · DEMO</span><h3>{selected.name}</h3><p className="muted">{selected.id} · {selected.branch} · CGPA {selected.cgpa} · Backlogs {selected.backlogs}</p><Status value={statusFor(selected)} /><div className="evidence-box"><strong>Rule explanation</strong><p>{selected.reason}</p><strong>Source evidence</strong><p>Sample company circular · Eligibility clause not yet linked to an uploaded document.</p><small>Evidence is illustrative. Do not treat this as an official decision.</small></div><div className="modal-actions"><button className="secondary-button" onClick={() => { alert('Case kept for further investigation.'); setSelected(null) }}>Keep for review</button><button className="primary-button" onClick={() => { setReviewed(old => old.includes(selected.id) ? old : [...old, selected.id]); setSelected(null) }}>Mark verified</button></div></section></div>}
    </div>
  )
}


const initialInboxMessages = [
  { id: 1, type: 'hr', sender: 'Campus Hiring Team', email: 'careers@example-company.test', subject: 'Campus hiring enquiry — software roles', preview: 'A sample recruiter message about exploring campus hiring opportunities.', date: 'Today · 10:42 AM', unread: true, company: 'Example Company', body: 'Hello TnP Team,\n\nWe would like to explore campus hiring for entry-level software roles. Please share your placement process and the appropriate point of contact.\n\nRegards,\nCampus Hiring Team', tag: 'HR outreach', source: 'Demo message — not a real email' },
  { id: 2, type: 'notice', sender: 'TnP Team Lead', email: 'Internal committee update', subject: 'New placement notice — coordinator review', preview: 'Please review the attached notice summary and acknowledge the deadline.', date: 'Today · 9:15 AM', unread: true, company: 'Multiple companies', body: 'Team,\n\nA new placement notice has been shared for coordinator review. Please verify the eligibility criteria, note the application deadline, and flag any ambiguity before communicating with students.\n\nThis demo message has no real attachment. Add the official notice in the live workflow.', tag: 'Action required', source: 'Demo notice' },
  { id: 3, type: 'team', sender: 'Calling Team', email: 'Internal team message', subject: 'Recruiter follow-up summary', preview: 'One contact requested that we follow up next week.', date: 'Yesterday', unread: false, company: 'Example Company', body: 'Calling team update: a recruiter contact requested a follow-up next week. Please check the Company & HR Directory and confirm the assigned coordinator before the next call.', tag: 'Follow-up', source: 'Demo team update' },
  { id: 4, type: 'notice', sender: 'TnP Team Lead', email: 'Internal committee update', subject: 'Reminder: update company research sheet', preview: 'Please ensure source links and verification status are recorded.', date: '14 Oct 2026', unread: false, company: 'Committee-wide', body: 'Please add source URLs for researched HR contacts, mark unverified information clearly, and avoid adding personal contact details unless they are publicly listed for professional use.', tag: 'Team instruction', source: 'Demo notice' },
];

function TnPInbox() {
  const [messages, setMessages] = useState(initialInboxMessages);
  const [activeId, setActiveId] = useState(1);
  const [filter, setFilter] = useState('All messages');
  const [query, setQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [draft, setDraft] = useState({ type: 'notice', recipient: 'All coordinators', subject: '', body: '' });
  const active = messages.find(m => m.id === activeId) || messages[0];
  const visible = messages.filter(m => {
    const matchesFilter = filter === 'All messages' || (filter === 'Unread' ? m.unread : filter === 'Company HR' ? m.type === 'hr' : filter === 'Placement notices' ? m.type === 'notice' : m.type === 'team');
    const text = `${m.sender} ${m.subject} ${m.preview} ${m.company}`.toLowerCase();
    return matchesFilter && text.includes(query.toLowerCase());
  });
  function openMessage(message) {
    setActiveId(message.id);
    setMessages(old => old.map(m => m.id === message.id ? { ...m, unread: false } : m));
  }
  function sendDemoMessage() {
    if (!draft.subject.trim() || !draft.body.trim()) return;
    const message = { id: Date.now(), type: draft.type, sender: 'You · TnP Coordinator', email: draft.recipient, subject: draft.subject.trim(), preview: draft.body.trim().slice(0, 105), date: 'Just now', unread: false, company: draft.recipient, body: draft.body.trim(), tag: draft.type === 'notice' ? 'Shared notice' : 'Team message', source: 'Created in local demo' };
    setMessages(old => [message, ...old]); setActiveId(message.id); setFilter('All messages'); setQuery(''); setShowCompose(false); setDraft({ type: 'notice', recipient: 'All coordinators', subject: '', body: '' });
  }
  return <section className="content-section inbox-page">
    <div className="section-heading inbox-title-row"><div><span className="inbox-kicker">TNP COMMUNICATIONS</span><h3>Inbox & shared notices</h3><p>Keep company conversations and committee updates in one workspace.</p></div><button className="primary-button" onClick={() => setShowCompose(true)}>＋ Share a notice</button></div>
    <div className="inbox-stats"><div><span className="inbox-stat-icon violet">✉</span><div><small>Messages</small><strong>{messages.length}</strong></div></div><div><span className="inbox-stat-icon green">↗</span><div><small>Company HR</small><strong>{messages.filter(m=>m.type==='hr').length}</strong></div></div><div><span className="inbox-stat-icon amber">▤</span><div><small>Placement notices</small><strong>{messages.filter(m=>m.type==='notice').length}</strong></div></div><div><span className="inbox-stat-icon blue">●</span><div><small>Unread</small><strong>{messages.filter(m=>m.unread).length}</strong></div></div></div>
    <div className="inbox-layout"><aside className="inbox-list-panel"><div className="inbox-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search messages..." /></div><div className="inbox-filters">{['All messages','Unread','Company HR','Placement notices','Team shared'].map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="inbox-message-list">{visible.map(m=><button key={m.id} className={`inbox-message ${activeId===m.id?'selected':''} ${m.unread?'unread':''}`} onClick={()=>openMessage(m)}><div className="inbox-message-top"><span className={`inbox-avatar ${m.type}`}>{m.type==='hr'?'HR':m.type==='notice'?'TL':'TM'}</span><span className="inbox-message-sender">{m.sender}</span><time>{m.date}</time></div><strong>{m.subject}</strong><p>{m.preview}</p><div className="inbox-message-bottom"><span className={`inbox-tag ${m.type}`}>{m.type==='hr'?'Company HR':m.type==='notice'?'Placement notice':'Team shared'}</span>{m.unread&&<i className="inbox-unread-dot"/>}</div></button>)}{visible.length===0&&<p className="inbox-empty">No messages match this filter.</p>}</div></aside>
    <article className="inbox-detail">{active ? <><div className="inbox-detail-head"><span className={`inbox-avatar large ${active.type}`}>{active.type==='hr'?'HR':active.type==='notice'?'TL':'TM'}</span><div className="inbox-detail-title"><span className={`inbox-tag ${active.type}`}>{active.type==='hr'?'COMPANY HR':active.type==='notice'?'PLACEMENT NOTICE':'TEAM SHARED'}</span><h4>{active.subject}</h4><p>{active.sender} · {active.email}</p></div><button className="inbox-icon-button" title="Mark unread" onClick={()=>setMessages(old=>old.map(m=>m.id===active.id?{...m,unread:true}:m))}>◉</button></div><div className="inbox-detail-meta"><span>To: TnP Committee</span><span>{active.date}</span></div><div className="inbox-message-body">{active.body}</div><div className="inbox-context-card"><div className="inbox-context-icon">ⓘ</div><div><strong>{active.tag}</strong><p>{active.source}. Confirm source authenticity and details before taking official action.</p></div></div><div className="inbox-detail-actions"><button className="secondary-button" onClick={()=>setMessages(old=>old.map(m=>m.id===active.id?{...m,unread:!m.unread}:m))}>{active.unread?'Mark as read':'Mark unread'}</button>{active.type==='notice'&&<button className="primary-button" onClick={()=>alert('Acknowledgement recorded for this local demo only.')}>✓ Acknowledge notice</button>}</div></>:<div className="inbox-empty">Select a message to read it.</div>}</article></div>
    {showCompose&&<div className="modal-backdrop" onClick={()=>setShowCompose(false)}><section className="review-modal inbox-compose" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowCompose(false)}>×</button><span className="card-kicker">INTERNAL COMMUNICATION</span><h3>Share with the TnP team</h3><p className="muted">Create a demo notice or internal update. This does not send an email or notify other users.</p><label>Message type</label><select value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})}><option value="notice">Placement notice</option><option value="team">Team update</option></select><label>Share with</label><select value={draft.recipient} onChange={e=>setDraft({...draft,recipient:e.target.value})}><option>All coordinators</option><option>Calling team</option><option>Searching team</option><option>Team lead</option></select><label>Subject</label><input value={draft.subject} onChange={e=>setDraft({...draft,subject:e.target.value})} placeholder="e.g. New placement notice for review"/><label>Message / instructions</label><textarea rows="5" value={draft.body} onChange={e=>setDraft({...draft,body:e.target.value})} placeholder="Add deadline, action required, source link or team instructions..."/><div className="modal-actions"><button className="secondary-button" onClick={()=>setShowCompose(false)}>Cancel</button><button className="primary-button" disabled={!draft.subject.trim()||!draft.body.trim()} onClick={sendDemoMessage}>Add to demo inbox</button></div></section></div>}
    <p className="inbox-disclaimer">Prototype inbox · Sample messages only · Changes are held in this page's React state and are not shared across browsers or users.</p>
  </section>;
}

function App() {
  const [role, setRole] = useState(null)
  const [page, setPage] = useState('Overview')
  const [appliedRules, setAppliedRules] = useState(null)

  function enterPortal(selectedRole) {
    setRole(selectedRole)
    setPage('Overview')
  }

  function logout() {
    setRole(null)
    setPage('Overview')
  }

  if (!role) return <Login onEnter={enterPortal} />

  return (
    <div className="app-shell">
      <Sidebar role={role} page={page} setPage={setPage} onLogout={logout} />
      <main className="main-area">
        <Header role={role} page={page} />
        {role === 'student'
          ? <StudentDashboard page={page} setPage={setPage} />
          :  <CoordinatorDashboard page={page} setPage={setPage} appliedRules={appliedRules} setAppliedRules={setAppliedRules} />}
        <footer className="app-footer">TnP Copilot · USICT concept prototype <span>Demo data only · Not an official placement system</span></footer>
      </main>
    </div>
  )
}

export default App