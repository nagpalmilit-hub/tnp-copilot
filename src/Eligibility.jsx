import { useMemo, useState } from 'react';
import './Eligibility.css';

const sampleStudents = [
  {
    id: 'USICT/2025/0487',
    name: 'Aarav Sharma',
    branch: 'CSE-DS',
    cgpa: 8.6,
    backlogs: 0,
  },
  {
    id: 'USICT/2025/0673',
    name: 'Ishita Verma',
    branch: 'CSE-DS',
    cgpa: 7.4,
    backlogs: 0,
  },
  {
    id: 'USICT/2025/0521',
    name: 'Rohan Malhotra',
    branch: 'CSE-AI',
    cgpa: 7.1,
    backlogs: 1,
  },
  {
    id: 'USICT/2025/0634',
    name: 'Neha Singh',
    branch: 'IT',
    cgpa: 7.8,
    backlogs: 0,
  },
  {
    id: 'USICT/2025/0712',
    name: 'Priya Mehta',
    branch: 'CSE-DS',
    cgpa: 6.8,
    backlogs: 0,
  },
  {
    id: 'USICT/2025/0731',
    name: 'Vivek Yadav',
    branch: 'ECE',
    cgpa: 6.9,
    backlogs: 1,
  },
];

// Fictional company profiles for demonstrating the prototype.
// These are NOT official company placement criteria.
const companyProfiles = {
  'Company A': {
    minimumCgpa: 7.0,
    eligibleBranches: ['CSE-DS', 'CSE-AI', 'IT'],
    allowBacklogs: false,
  },
  'Company B': {
    minimumCgpa: 6.5,
    eligibleBranches: ['CSE-DS', 'CSE-AI', 'IT', 'ECE'],
    allowBacklogs: true,
  },
  'Company C': {
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE-DS', 'CSE-AI'],
    allowBacklogs: false,
  },
};

function getEligibility(student, rules) {
  const reasons = [];

  if (student.cgpa < rules.minimumCgpa) {
    reasons.push(
      `CGPA ${student.cgpa.toFixed(1)} is below the required minimum of ${rules.minimumCgpa.toFixed(1)}.`
    );
  }

  if (!rules.eligibleBranches.includes(student.branch)) {
    reasons.push(
      `${student.branch} is not included in this company's listed eligible branches.`
    );
  }

  if (!rules.allowBacklogs && student.backlogs > 0) {
    reasons.push(
      'Active backlogs are not allowed under this company profile.'
    );
  }

  if (reasons.length > 0) {
    return {
      status: 'Not eligible',
      reason: reasons.join(' '),
    };
  }

  return {
    status: 'Eligible',
    reason:
      'The student meets all criteria in the selected demo company profile.',
  };
}

export default function Eligibility({ appliedRules }) {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('Company A');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const companyRules = appliedRules || companyProfiles[selectedCompany];
  const companyDisplayName = appliedRules
  ? appliedRules.noticeName
  : selectedCompany;
    console.log("Applied rules:", appliedRules);
    console.log("Company display name:", companyDisplayName);
  const results = useMemo(() => {
    return sampleStudents.map((student) => ({
      ...student,
      ...getEligibility(student, companyRules),
    }));
  }, [companyRules]);

  const filteredStudents = results.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.id.toLowerCase().includes(searchText);

    const matchesBranch =
      branch === 'All' || student.branch === branch;

    return matchesSearch && matchesBranch;
  });

  const eligibleCount = results.filter(
    (student) => student.status === 'Eligible'
  ).length;

  const notEligibleCount = results.filter(
    (student) => student.status === 'Not eligible'
  ).length;

  return (
    <section className="eligibility-page">
      <div className="eligibility-heading">
        <div>
          <span className="eyebrow">PLACEMENT OPERATIONS</span>
          <h2>Eligibility traceability</h2>
          <p>
            Compare student records against company-specific demo criteria
            and understand every eligibility result.
          </p>
        </div>

        <span className="demo-label">DEMO DATA</span>
      </div>

      <div className="eligibility-metrics">
        <article className="eligibility-metric">
          <span>Total student records</span>
          <strong>{results.length}</strong>
        </article>

        <article className="eligibility-metric">
          <span>Eligible under selected rules</span>
          <strong>{eligibleCount}</strong>
        </article>

        <article className="eligibility-metric">
          <span>Not eligible under selected rules</span>
          <strong>{notEligibleCount}</strong>
        </article>
      </div>

      <div className="eligibility-layout">
        <section className="eligibility-panel">
          <div className="eligibility-panel-heading">
            <div>
              <h3>Company eligibility rules</h3>
              <p>
                Select a demo company to update the eligibility results.
              </p>
            </div>
          </div>

          <div className="rule-field">
            <label htmlFor="company-profile">Company profile</label>

            <select
              id="company-profile"
              value={selectedCompany}
              disabled={Boolean(appliedRules)}
              onChange={(event) =>
                setSelectedCompany(event.target.value)
              }
            >
              {Object.keys(companyProfiles).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className="rule-field">
            <label>Minimum required CGPA</label>
            <div className="company-rule-value">
              {companyRules.minimumCgpa.toFixed(1)} / 10.0
            </div>
          </div>

          <div className="rule-field">
            <label>Eligible branches</label>
            <div className="branch-tags">
              {companyRules.eligibleBranches.map((item) => (
                <span className="branch-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rule-field">
            <label>Active backlog policy</label>
            <div
              className={`backlog-policy ${
                companyRules.allowBacklogs
                  ? 'backlog-allowed'
                  : 'backlog-restricted'
              }`}
            >
              {companyRules.allowBacklogs
                ? 'Allowed in this demo profile'
                : 'Not allowed in this demo profile'}
            </div>
          </div>

          <div className="rule-note">
            <strong>Important: demo criteria</strong>
            <p>
              Company A, B, and C are fictional profiles. Their criteria
              are for testing only and are not official USICT or employer
              requirements. Verify actual placement notices before making
              decisions.
            </p>
          </div>
        </section>

        <section className="eligibility-panel student-results">
          <div className="eligibility-panel-heading">
            <div>
              <h3>Student eligibility records</h3>
              <p>
                {filteredStudents.length} records shown for {companyDisplayName}
              </p>
            </div>
          </div>

          <div className="eligibility-filters">
            <input
              type="search"
              placeholder="Search name or student ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search students"
            />

            <select
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
              aria-label="Filter by branch"
            >
              <option value="All">All branches</option>
              <option value="CSE-DS">CSE-DS</option>
              <option value="CSE-AI">CSE-AI</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div className="eligibility-table-wrap">
            <table className="eligibility-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                  <th>Backlogs</th>
                  <th>Eligibility</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <strong>{student.name}</strong>
                      <small>{student.id}</small>
                    </td>

                    <td>{student.branch}</td>
                    <td>{student.cgpa.toFixed(1)}</td>
                    <td>{student.backlogs}</td>

                    <td>
                      <span
                        className={`eligibility-status ${
                          student.status === 'Eligible'
                            ? 'status-eligible'
                            : 'status-ineligible'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="eligibility-detail-button"
                        onClick={() => setSelectedStudent(student)}
                      >
                        Explain →
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="eligibility-empty">
                      No students match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedStudent && (
        <div
          className="eligibility-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <section
            className="eligibility-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="eligibility-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="eligibility-modal-close"
              onClick={() => setSelectedStudent(null)}
              aria-label="Close explanation"
            >
              ×
            </button>

            <span className="eyebrow">DECISION EXPLANATION</span>
            <h3 id="eligibility-modal-title">
              {selectedStudent.name}
            </h3>

            <p className="eligibility-student-id">
              {selectedStudent.id}
            </p>

            <div className="eligibility-explanation-status">
              <span
                className={`eligibility-status ${
                  selectedStudent.status === 'Eligible'
                    ? 'status-eligible'
                    : 'status-ineligible'
                }`}
              >
                {selectedStudent.status}
              </span>
            </div>

            <div className="eligibility-explanation-row">
              <span>Selected company</span>
              <strong>{companyDisplayName}</strong>
            </div>

            <div className="eligibility-explanation-row">
              <span>Student CGPA</span>
              <strong>{selectedStudent.cgpa.toFixed(1)}</strong>
            </div>

            <div className="eligibility-explanation-row">
              <span>Required minimum CGPA</span>
              <strong>{companyRules.minimumCgpa.toFixed(1)}</strong>
            </div>

            <div className="eligibility-explanation-row">
              <span>Student branch</span>
              <strong>{selectedStudent.branch}</strong>
            </div>

            <div className="eligibility-explanation-row">
              <span>Active backlogs in sample data</span>
              <strong>{selectedStudent.backlogs}</strong>
            </div>

            <div className="eligibility-reason">
              <strong>Why this result?</strong>
              <p>{selectedStudent.reason}</p>
            </div>

            <button
              className="eligibility-close-button"
              onClick={() => setSelectedStudent(null)}
            >
              Close explanation
            </button>
          </section>
        </div>
      )}
    </section>
  );
}