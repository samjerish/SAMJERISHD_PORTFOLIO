import React, { useEffect, useState } from "react";
import "./GitHubContributions.css";
import {
  FiGithub,
  FiStar,
  FiGitBranch,
  FiFolder,
  FiExternalLink,
  FiRefreshCw,
  FiZap,
  FiTrendingUp,
  FiAward
} from "react-icons/fi";

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
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

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

      // 2. Fetch live repos
      const reposRes = await fetch(
        "https://api.github.com/users/samjerish/repos?per_page=100"
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
            <div className="github-live-badge-row">
              <span className="live-radar-dot"></span>
              <span className="live-radar-text">LIVE GITHUB SYNC</span>
            </div>
            <h2 className="github-sync-title">CODE ACTIVITY & CONTRIBUTIONS</h2>
            <p className="github-sync-subtitle">
              Real-time telemetry synced with{" "}
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
              {loading ? "..." : user ? user.public_repos : "9"}
            </span>
            <span className="metric-lbl">Public Repositories</span>
          </div>
        </div>

        <div className="github-metric-card">
          <div className="metric-icon-wrap star-wrap">
            <FiStar />
          </div>
          <div className="metric-content">
            <span className="metric-val">{loading ? "..." : totalStars}</span>
            <span className="metric-lbl">Total Stars Earned</span>
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

      {/* Dark Mode Activity & Peak Commits Visualizer */}
      <div className="github-chart-container dark-chart-mode">
        {/* Top Control Bar */}
        <div className="chart-header-row">
          <div className="chart-title-group">
            <span className="chart-badge">CONTRIBUTIONS HEATMAP</span>
            <h3 className="chart-title">ANNUAL COMMIT VELOCITY</h3>
          </div>

          <div className="chart-intensity-legend">
            <span className="legend-label">Less</span>
            <div className="legend-cells">
              <span className="legend-cell lvl-0"></span>
              <span className="legend-cell lvl-1"></span>
              <span className="legend-cell lvl-2"></span>
              <span className="legend-cell lvl-3"></span>
              <span className="legend-cell lvl-4 peak-glow"></span>
            </div>
            <span className="legend-label">More (Peak)</span>
          </div>
        </div>

        {/* Highlight Banner: Peak Activity & Most Committed Day */}
        <div className="peak-committed-highlights">
          <div className="highlight-pill peak-day">
            <div className="highlight-icon-wrap zap-icon">
              <FiZap />
            </div>
            <div className="highlight-text-group">
              <span className="highlight-small-title">PEAK COMMIT VELOCITY</span>
              <span className="highlight-main-val">High-Frequency Sprint Days</span>
            </div>
          </div>

          <div className="highlight-pill streak-day">
            <div className="highlight-icon-wrap trend-icon">
              <FiTrendingUp />
            </div>
            <div className="highlight-text-group">
              <span className="highlight-small-title">COMMIT FREQUENCY</span>
              <span className="highlight-main-val">Active Development Cycle</span>
            </div>
          </div>

          <div className="highlight-pill best-day">
            <div className="highlight-icon-wrap award-icon">
              <FiAward />
            </div>
            <div className="highlight-text-group">
              <span className="highlight-small-title">PRIMARY FOCUS</span>
              <span className="highlight-main-val">Full Stack & AI Architectures</span>
            </div>
          </div>
        </div>

        {/* Dark Mode Glowing Heatmap Frame */}
        <div className="chart-viewport-wrapper">
          <div className="chart-glow-underlay"></div>
          <div className="chart-image-wrap">
            <img
              src={`https://ghchart.rshah.org/4ade80/samjerish?timestamp=${Date.now()}`}
              alt="Sam Jerish's GitHub Dark Heatmap Chart"
              className="github-chart-img dark-themed-graph"
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer Meta */}
        <div className="chart-footer-caption">
          <div className="chart-meta-left">
            <span className="meta-dot"></span>
            <span>Live commits recorded from GitHub public events and repositories</span>
          </div>

          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noreferrer"
            className="chart-inspect-link"
          >
            <span>Explore on GitHub</span>
            <FiExternalLink />
          </a>
        </div>
      </div>
    </section>
  );
};
