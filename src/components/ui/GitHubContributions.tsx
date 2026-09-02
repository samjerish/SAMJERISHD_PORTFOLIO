import React, { useEffect, useState, useMemo } from "react";
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

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const GitHubContributions: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalYearContributions, setTotalYearContributions] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
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

      // 3. Fetch real-time contribution calendar (CORS-enabled API)
      const contribRes = await fetch(
        "https://github-contributions-api.jogruber.de/v4/samjerish?y=last"
      );
      if (contribRes.ok) {
        const data = await contribRes.json();
        if (data && data.contributions) {
          setContributions(data.contributions);
          if (data.total && data.total.lastYear !== undefined) {
            setTotalYearContributions(data.total.lastYear);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch live GitHub telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

  // Group contributions into 52/53 weeks of 7 days
  const { weeks, monthHeaders } = useMemo(() => {
    const list: ContributionDay[] =
      contributions.length > 0
        ? contributions
        : Array.from({ length: 364 }, (_, i) => ({
            date: `2025-01-${(i % 28) + 1}`,
            count: 0,
            level: 0,
          }));

    const resultWeeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    list.forEach((item, idx) => {
      currentWeek.push(item);
      if (currentWeek.length === 7 || idx === list.length - 1) {
        resultWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Determine month label positions along week columns
    const headers: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;

    resultWeeks.forEach((week, colIdx) => {
      const firstDay = week[0];
      if (firstDay && firstDay.date) {
        const d = new Date(firstDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          headers.push({ month: MONTH_NAMES[m], colIndex: colIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: resultWeeks, monthHeaders: headers };
  }, [contributions]);

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

      {/* Pure Dark-Themed Contribution Matrix (All Non-Commits in Dark Black) */}
      <div className="github-timeline-container">
        <div className="timeline-header-row">
          <div className="timeline-title-wrap">
            <h3 className="timeline-title">CONTRIBUTION ACTIVITY</h3>
            <span className="timeline-badge">
              <span className="badge-pulse-dot"></span>
              {totalYearContributions !== null
                ? `${totalYearContributions} contributions in the last year`
                : "Real-time Sync"}
            </span>
          </div>
          <span className="timeline-caption-year">Last 12 Months</span>
        </div>

        {/* Full-Cover Native SVG Contribution Matrix */}
        <div className="timeline-graph-window">
          <div className="timeline-native-scroll">
            <svg
              className="native-contrib-svg"
              viewBox={`0 0 ${weeks.length * 15 + 40} 135`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Month Text Headers */}
              {monthHeaders.map((h, i) => (
                <text
                  key={i}
                  x={36 + h.colIndex * 15}
                  y={14}
                  className="svg-month-label"
                >
                  {h.month}
                </text>
              ))}

              {/* Day Labels (Mon, Wed, Fri) */}
              <text x={0} y={42} className="svg-day-label">
                Mon
              </text>
              <text x={0} y={72} className="svg-day-label">
                Wed
              </text>
              <text x={0} y={102} className="svg-day-label">
                Fri
              </text>

              {/* Grid of Weeks & Days (Boxes in Deep Black / Neon Green) */}
              <g transform="translate(36, 22)">
                {weeks.map((week, colIdx) => (
                  <g key={colIdx} transform={`translate(${colIdx * 15}, 0)`}>
                    {week.map((day, rowIdx) => {
                      const levelClass = `cell-lvl-${day.level || 0}`;
                      return (
                        <rect
                          key={rowIdx}
                          x={0}
                          y={rowIdx * 15}
                          width={11}
                          height={11}
                          rx={2.5}
                          ry={2.5}
                          className={`contrib-cell ${levelClass}`}
                          onMouseEnter={() =>
                            setHoveredDay({ date: day.date, count: day.count })
                          }
                          onMouseLeave={() => setHoveredDay(null)}
                        >
                          <title>{`${day.count} contributions on ${day.date}`}</title>
                        </rect>
                      );
                    })}
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Timeline Footer & Hover Tooltip */}
        <div className="timeline-footer-row">
          <div className="footer-legend-hint">
            {hoveredDay ? (
              <span className="hover-activity-badge">
                <strong>{hoveredDay.count}</strong> contributions on{" "}
                <strong>{hoveredDay.date}</strong>
              </span>
            ) : null}
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
