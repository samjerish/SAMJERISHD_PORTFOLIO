import React, { useEffect, useState } from "react";
import "./GitHubContributions.css";
import {
  FiGithub,
  FiStar,
  FiGitBranch,
  FiFolder,
  FiExternalLink,
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
  }, []);

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
              <span className="live-radar-text">LIVE TELEMETRY</span>
            </div>
            <h2 className="github-sync-title">CODING ACTIVITY & CONTRIBUTIONS</h2>
            <p className="github-sync-subtitle">
              Real-time activity synced with{" "}
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
      </div>

      {/* Clean Dark Mode GitHub Contribution Timeline */}
      <div className="github-timeline-container">
        <div className="timeline-header-row">
          <div className="timeline-title-wrap">
            <h3 className="timeline-title">CONTRIBUTION ACTIVITY</h3>
            <span className="timeline-badge">
              <span className="badge-pulse-dot"></span>
              Real-time Sync
            </span>
          </div>
          <span className="timeline-caption-year">Last 12 Months</span>
        </div>

        {/* Heatmap Graph Window */}
        <div className="timeline-graph-window">
          <div className="timeline-graph-scroll">
            <img
              src={`https://ghchart.rshah.org/39d353/samjerish?timestamp=${Date.now()}`}
              alt="Sam Jerish's GitHub Dark Heatmap Chart"
              className="github-timeline-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Timeline Footer */}
        <div className="timeline-footer-row">
          <div className="footer-legend-hint">
            <span>Points in </span>
            <span className="green-accent-text">green</span>
            <span> indicate active commit days</span>
          </div>

          <a
            href="https://github.com/samjerish"
            target="_blank"
            rel="noreferrer"
            className="timeline-inspect-btn"
          >
            <span>View GitHub Profile</span>
            <FiExternalLink />
          </a>
        </div>
      </div>
    </section>
  );
};
