import { useState } from 'react';

export default function CompanyInvestigator() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleInvestigate() {
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        'http://localhost:3001/api/investigate-company',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Investigation failed.');
      }

      setResult(data);
    } catch (err) {
      console.error('Company investigation error:', err);
      setError(
        err.message ||
          'Unable to reach the backend. Check that server.js is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(
        `Source: ${result.sourceUrl}\n\n${result.title}\n\n${result.content}`
      );
    } catch {
      setError('Could not copy automatically. Select and copy the evidence manually.');
    }
  }

  return (
    <section className="notice-analyzer">
      <div className="notice-analyzer-heading">
        <div>
          <span className="eyebrow">LIVE WEB INVESTIGATION</span>
          <h2>Investigate Company</h2>
          <p>
            Retrieve public webpage evidence to support placement
            eligibility verification.
          </p>
        </div>
        <span className="notice-demo-badge">TINYFISH</span>
      </div>

      <div className="notice-analyzer-panel">
        <label htmlFor="company-url">Public company webpage URL</label>
        <input
          id="company-url"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://company.example/careers"
        />

        <div className="notice-analyzer-actions">
          <button
            className="notice-analyze-button"
            onClick={handleInvestigate}
            disabled={!url.trim() || loading}
          >
            {loading ? 'Investigating webpage...' : 'Investigate company'}
          </button>
        </div>

        <p className="notice-helper">
          Only use public webpages. Retrieved content is evidence to review,
          not proof that a company policy is current or authentic.
        </p>

        {error && (
          <div className="notice-review-note" role="alert">
            <strong>Investigation issue</strong>
            <p>{error}</p>
          </div>
        )}
      </div>

      {result && (
        <div className="notice-analyzer-panel notice-analysis-results">
          <div className="notice-results-heading">
            <div>
              <h3>{result.title}</h3>
              <p>Retrieved webpage content</p>
            </div>
            <span className="notice-found-badge">Retrieved</span>
          </div>

          <p>
            <strong>Source:</strong>{' '}
            <a
              href={result.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.sourceUrl}
            </a>
          </p>

          <div
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
              maxHeight: '500px',
              overflowY: 'auto',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            {result.content}
          </div>

          <div className="notice-analyzer-actions">
            <button className="notice-analyze-button" onClick={handleCopy}>
              Copy evidence
            </button>
          </div>

          <div className="notice-review-note">
            <strong>Verification reminder</strong>
            <p>
              Check the source and publication date, if available. This
              page has not yet been checked for placement-specific
              eligibility rules.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}