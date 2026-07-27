import { useEffect, useState } from 'react';
import Spinner from '../components/spinner';
import ErrorMessage from '../components/errormessage';

// Change this to your own GitHub username
const GITHUB_USERNAME = 'Hemangi253443';

function Projects() {
  // Practical 3 required state: data, loading, error
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Supplementary: retryCount re-triggers the effect below
  const [retryCount, setRetryCount] = useState(0);

  // Supplementary: search input that filters the fetched list by name
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retryCount]);

  const handleRetry = () => setRetryCount((count) => count + 1);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  return (
    <section id="projects" className="projects">
      <p className="section-label">Projects</p>

      <input
        type="text"
        className="repo-search"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRepos.length === 0 ? (
        <p className="no-results">No repositories match "{search}".</p>
      ) : (
        <div className="projects-grid">
          {filteredRepos.map((repo) => (
            <div className="project-card" key={repo.id}>
              <div className="project-card__header">
                <h3>{repo.name}</h3>
                {/* Supplementary: star count alongside the name */}
                <span className="star-count">★ {repo.stargazers_count}</span>
              </div>
              <p>{repo.description || 'No description provided.'}</p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;