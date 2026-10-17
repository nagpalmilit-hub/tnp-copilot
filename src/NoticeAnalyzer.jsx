import { useState } from 'react';
import './NoticeAnalyzer.css';

const API_URL = 'http://localhost:3001/api/analyze-notice';

const KNOWN_BRANCHES = ['CSE-DS', 'CSE-AI', 'IT', 'ECE'];

export default function NoticeAnalyzer({ setAppliedRules, setPage }) {
  const [noticeText, setNoticeText] = useState('');
  const [noticeName, setNoticeName] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [minimumCgpa, setMinimumCgpa] = useState('');
  const [eligibleBranches, setEligibleBranches] = useState([]);
  const [allowBacklogs, setAllowBacklogs] = useState('');
  const [verifiedAgainstNotice, setVerifiedAgainstNotice] = useState(false);

  async function handleAnalyze() {
    if (!noticeText.trim()) return;

    setLoading(true);
    setError('');
    setAnalysis(null);
    setVerifiedAgainstNotice(false);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noticeText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not analyze the notice.');
      }

      const rules = data.rules;

      const detectedBranches = Array.isArray(rules.eligibleBranches)
        ? rules.eligibleBranches
        : [];

      const supportedBranches = KNOWN_BRANCHES.filter((branch) =>
        detectedBranches.some(
          (detected) =>
            detected.trim().toLowerCase() === branch.toLowerCase()
        )
      );

      const unsupportedBranches = detectedBranches.filter(
        (detected) =>
          !KNOWN_BRANCHES.some(
            (branch) =>
              branch.toLowerCase() === detected.trim().toLowerCase()
          )
      );

      setAnalysis({
        noticeName: rules.noticeName || 'Company name not found',
        summary: rules.summary || '',
        needsReview: Array.isArray(rules.needsReview)
          ? rules.needsReview
          : [],
        minimumCgpaSpecified: rules.minimumCgpaSpecified,
        eligibleBranchesSpecified: rules.eligibleBranchesSpecified,
        backlogRuleSpecified: rules.backlogRuleSpecified,
        unsupportedBranches,
      });

      setMinimumCgpa(
        rules.minimumCgpaSpecified ? String(rules.minimumCgpa) : ''
      );
      setEligibleBranches(supportedBranches);
      setAllowBacklogs(
        rules.backlogRuleSpecified
          ? String(Boolean(rules.allowBacklogs))
          : ''
      );

      if (
        !noticeName.trim() &&
        rules.noticeName &&
        rules.noticeName !== 'Company name not found'
      ) {
        setNoticeName(rules.noticeName);
      }
    } catch (err) {
      console.error('Notice analysis error:', err);
      setError(
        err.message ||
          'Could not connect to the analysis server. Check that it is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleBranch(branch) {
    setEligibleBranches((current) =>
      current.includes(branch)
        ? current.filter((item) => item !== branch)
        : [...current, branch]
    );
  }

  function handleReset() {
    setNoticeText('');
    setNoticeName('');
    setAnalysis(null);
    setMinimumCgpa('');
    setEligibleBranches([]);
    setAllowBacklogs('');
    setVerifiedAgainstNotice(false);
    setError('');
  }

  function handleApplyRules() {
    const cgpa = Number(minimumCgpa);

    if (
      minimumCgpa.trim() === '' ||
      !Number.isFinite(cgpa) ||
      cgpa < 0 ||
      cgpa > 10
    ) {
      alert('Enter a valid minimum CGPA between 0 and 10.');
      return;
    }

    if (eligibleBranches.length === 0) {
      alert('Select at least one eligible branch.');
      return;
    }

    if (allowBacklogs !== 'true' && allowBacklogs !== 'false') {
      alert('Select whether active backlogs are allowed.');
      return;
    }

    if (!verifiedAgainstNotice) {
      alert('Verify the edited criteria against the original notice first.');
      return;
    }

    const confirmed = window.confirm(
      `Apply these verified rules?\n\n` +
        `Company: ${noticeName.trim() || analysis.noticeName}\n` +
        `Minimum CGPA: ${cgpa}\n` +
        `Eligible branches: ${eligibleBranches.join(', ')}\n` +
        `Active backlogs allowed: ${allowBacklogs === 'true' ? 'Yes' : 'No'}\n\n` +
        `Only continue if you checked the original company notice.`
    );

    if (!confirmed) return;

    setAppliedRules({
      noticeName: noticeName.trim() || analysis.noticeName,
      minimumCgpa: cgpa,
      eligibleBranches,
      allowBacklogs: allowBacklogs === 'true',
    });

    setPage('Eligibility traceability');
  }

  const cgpaValid =
    minimumCgpa.trim() !== '' &&
    Number.isFinite(Number(minimumCgpa)) &&
    Number(minimumCgpa) >= 0 &&
    Number(minimumCgpa) <= 10;

  const canApply =
    Boolean(analysis) &&
    cgpaValid &&
    eligibleBranches.length > 0 &&
    (allowBacklogs === 'true' || allowBacklogs === 'false') &&
    verifiedAgainstNotice;

  return (
    <section className="notice-analyzer">
      <div className="notice-analyzer-heading">
        <div>
          <span className="eyebrow">PLACEMENT OPERATIONS</span>
          <h2>Company Notice Analyzer</h2>
          <p>
            Extract, edit and verify placement eligibility criteria
            before applying them to student records.
          </p>
        </div>
        <span className="notice-demo-badge">AI ANALYZER</span>
      </div>

      <div className="notice-analyzer-panel">
        <label htmlFor="notice-name">
          Company or notice name
        </label>
        <input
          id="notice-name"
          type="text"
          value={noticeName}
          onChange={(event) => setNoticeName(event.target.value)}
          placeholder="e.g. Example Company — Internship Drive"
        />

        <label htmlFor="notice-text">Placement notice text</label>
        <textarea
          id="notice-text"
          value={noticeText}
          onChange={(event) => setNoticeText(event.target.value)}
          placeholder="Paste the eligibility section of the original company notice..."
          rows={9}
        />

        <div className="notice-analyzer-actions">
          <button
            className="notice-analyze-button"
            onClick={handleAnalyze}
            disabled={!noticeText.trim() || loading}
          >
            {loading ? 'Analyzing with AI...' : 'Analyze notice'}
          </button>

          <button
            className="notice-reset-button"
            onClick={handleReset}
            disabled={loading}
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="notice-review-note" role="alert">
            <strong>Analysis failed</strong>
            <p>{error}</p>
          </div>
        )}

        <p className="notice-helper">
          AI analyzes pasted text. It does not independently authenticate
          the notice or verify company policies online.
        </p>
      </div>

      {analysis && (
        <div className="notice-analyzer-panel notice-analysis-results">
          <div className="notice-results-heading">
            <div>
              <h3>Review and edit eligibility criteria</h3>
              <p>
                AI detected: {analysis.noticeName}
              </p>
            </div>
            <span className="notice-review-badge">
              Coordinator review
            </span>
          </div>

          {analysis.summary && <p>{analysis.summary}</p>}

          <p>
            <strong>1. Minimum CGPA</strong>
          </p>
          <label htmlFor="edit-cgpa">
            Minimum CGPA (0–10)
          </label>
          <input
            id="edit-cgpa"
            type="number"
            min="0"
            max="10"
            step="0.01"
            value={minimumCgpa}
            onChange={(event) => {
              setMinimumCgpa(event.target.value);
              setVerifiedAgainstNotice(false);
            }}
            placeholder="Enter CGPA from the notice"
          />
          {!analysis.minimumCgpaSpecified && (
            <p className="notice-review-note">
              AI did not confidently find this requirement. Check the
              original notice and enter a value if it is stated.
            </p>
          )}

          <divider />

          <p>
            <strong>2. Eligible branches</strong>
          </p>
          <p>Select all branches explicitly permitted by the notice.</p>

          {KNOWN_BRANCHES.map((branch) => (
            <label
              key={branch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '8px 0',
              }}
            >
              <input
                type="checkbox"
                checked={eligibleBranches.includes(branch)}
                onChange={() => {
                  toggleBranch(branch);
                  setVerifiedAgainstNotice(false);
                }}
              />
              {branch}
            </label>
          ))}

          {!analysis.eligibleBranchesSpecified && (
            <p className="notice-review-note">
              AI could not confirm the eligible branches. Select the
              correct branches only after checking the original notice.
            </p>
          )}

          {analysis.unsupportedBranches.length > 0 && (
            <div className="notice-review-note">
              <strong>Branch names needing attention</strong>
              <p>
                AI detected: {analysis.unsupportedBranches.join(', ')}.
                This prototype supports CSE-DS, CSE-AI, IT and ECE.
                Do not omit a valid branch from the real notice without
                resolving this limitation.
              </p>
            </div>
          )}

          <divider />

          <p>
            <strong>3. Active backlog policy</strong>
          </p>
          <label htmlFor="backlog-policy">
            Choose the policy stated in the notice
          </label>
          <select
            id="backlog-policy"
            value={allowBacklogs}
            onChange={(event) => {
              setAllowBacklogs(event.target.value);
              setVerifiedAgainstNotice(false);
            }}
          >
            <option value="">Not verified — select a policy</option>
            <option value="true">Active backlogs allowed</option>
            <option value="false">Active backlogs not allowed</option>
          </select>

          {!analysis.backlogRuleSpecified && (
            <p className="notice-review-note">
              AI could not establish the backlog policy. Verify it
              against the original notice before choosing.
            </p>
          )}

          {analysis.needsReview.length > 0 && (
            <div className="notice-review-note">
              <strong>AI review notes</strong>
              <ul>
                {analysis.needsReview.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="notice-review-note">
            <strong>Final verification</strong>
            <p>
              Compare every field above with the original placement
              notice. Selecting this checkbox confirms your review;
              it does not independently prove that the criteria are correct.
            </p>

            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginTop: '12px',
              }}
            >
              <input
                type="checkbox"
                checked={verifiedAgainstNotice}
                onChange={(event) =>
                  setVerifiedAgainstNotice(event.target.checked)
                }
              />
              I have checked the CGPA, branches and backlog policy
              against the original company notice.
            </label>
          </div>

          <div className="notice-analyzer-actions">
            <button
              className="notice-analyze-button"
              onClick={handleApplyRules}
              disabled={!canApply}
            >
              Confirm &amp; Apply Rules
            </button>
          </div>
        </div>
      )}
    </section>
  );
}