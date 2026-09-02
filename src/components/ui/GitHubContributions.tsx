import React, { useEffect, useState } from "react";
import "./GitHubContributions.css";
import { FiGithub, FiStar, FiGitBranch, FiFolder, FiExternalLink, FiRefreshCw } from "react-icons/fi";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34f26",
  CSS: "#1572b6",
  Java: "#b07219",
  default: "#4ade80",
};

export const GitHubContributions: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      // 1. Fetch live user profile
      const userRes = await fetch("https://api.github.com/users/samjerish");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      // 2. Fetch live repositories
      const reposRes = await fetch(
        "https://api.github.com/users/samjerish/repos?sort=updated&per_page=6"
      );
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err) {
      console.error("Failed to fetch live GitHub data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, [refreshKey]);

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

  return (
    <section className="github-sync-section">
      {/* Header Bar */}
      <div className="github-sync-header">
        <div className="github-header-left">
          <div className="github-icon-bubble">
            <FiGithub />
          </div>
          <div>
            <h2 className="github-sync-title">GITHUB ACTIVITY & STATS</h2>
            <p className="github-sync-subtitle">
              Live real-time sync with{" "}
              <a
                href="https://github.com/samjerish"
                target="_blank"
                rel="noreferrer"
                className="github-profile-link"
              >
                @samjerish
              </a>
            </p>
          </div>
        </div>

        <div className="github-header-actions">
          <button
            className="github-refresh-btn"
            onClick={() => setRefreshKey((k) => k + 1)}
            title="Sync Latest GitHub Data"
          >
            <FiRefreshCw className={loading ? "is-spinning" : ""} />
            <span>Sync Live</span>
          </button>
          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noreferrer"
            className="github-open-btn"
          >
            <span>Follow on GitHub</span>
            <FiExternalLink />
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="github-metrics-grid">
        <div className="github-metric-card">
          <div className="metric-icon-wrap">
            <FiFolder />
          </div>
          <div className="metric-content">
            <span className="metric-val">
              {loading ? "..." : user ? user.public_repos : "9+"}
            </span>
            <span className="metric-lbl">Total Repositories</span>
          </div>
        </div>

        <div className="github-metric-card">
          <div className="metric-icon-wrap star-wrap">
            <FiStar />
          </div>
          <div className="metric-content">
            <span className="metric-val">{loading ? "..." : totalStars}</span>
            <span className="metric-lbl">Total Stars</span>
          </div>
        </div>

        <div className="github-metric-card">
          <div className="metric-icon-wrap fork-wrap">
            <FiGitBranch />
          </div>
          <div className="metric-content">
            <span className="metric-val">{loading ? "..." : totalForks}</span>
            <span className="metric-lbl">Total Forks</span>
          </div>
        </div>

        <div className="github-metric-card">
          <div className="metric-icon-wrap follow-wrap">
            <FiGithub />
          </div>
          <div className="metric-content">
            <span className="metric-val">
              {loading ? "..." : user ? user.followers : "4"}
            </span>
            <span className="metric-lbl">Followers</span>
          </div>
        </div>
      </div>

      {/* Live GitHub Contributions Heatmap */}
      <div className="github-chart-container">
        <div className="chart-header-row">
          <h3 className="chart-title">CONTRIBUTIONS GRAPH</h3>
          <span className="chart-sync-indicator">
            <span className="sync-pulse"></span>
            Real-time GitHub Heatmap
          </span>
        </div>

        <div className="chart-image-wrap">
          <img
            src={`https://ghchart.rshah.org/4ade80/samjerish?timestamp=${Date.now()}`}
            alt="Sam Jerish's GitHub Contribution Graph"
            className="github-chart-img"
            loading="lazy"
            onError={(e) => {
              // Fallback styling if chart provider is slow
              (e.currentTarget as HTMLElement).style.opacity = "0.7";
            }}
          />
        </div>

        <div className="chart-footer-caption">
          <span>Contributions in the last year</span>
          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noreferrer"
            className="chart-inspect-link"
          >
            Inspect GitHub Graph ↗
          </a>
        </div>
      </div>

      {/* Featured Live Repositories Grid */}
      <div className="github-repos-section">
        <div className="repos-header-row">
          <h3 className="repos-heading">RECENT REPOSITORIES</h3>
          <span className="repos-sub">Automatically updated from GitHub</span>
        </div>

        <div className="github-repos-grid">
          {repos.map((repo) => {
            const langColor =
              repo.language && LANGUAGE_COLORS[repo.language]
                ? LANGUAGE_COLORS[repo.language]
                : LANGUAGE_COLORS.default;

            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="github-repo-card"
              >
                <div className="repo-card-top">
                  <div className="repo-title-wrap">
                    <FiFolder className="repo-icon" />
                    <h4 className="repo-name">{repo.name}</h4>
                  </div>
                  <FiExternalLink className="repo-ext-icon" />
                </div>

                <p className="repo-desc">
                  {repo.description || "Public repository and code exploration."}
                </p>

                <div className="repo-card-footer">
                  {repo.language && (
                    <div className="repo-lang-badge">
                      <span
                        className="lang-color-dot"
                        style={{ backgroundColor: langColor }}
                      ></span>
                      <span>{repo.language}</span>
                    </div>
                  )}

                  <div className="repo-stats-right">
                    {repo.stargazers_count > 0 && (
                      <span className="repo-stat-item">
                        <FiStar /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="repo-stat-item">
                        <FiGitBranch /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
