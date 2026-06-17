"use client";

import { useEffect, useState } from "react";

type LeetCodeData = {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  globalRanking: number;
  contestRating: number;
  badges: Array<{ name: string; icon: string }>;
  recentSubmissions: Array<{
    title: string;
    date: string;
    status: string;
  }>;
};

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="leetcode-shell">{children}</div>;
}

export function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((response) => response.json())
      .then((payload: LeetCodeData | { error: string }) => {
        if ("error" in payload) {
          setError(payload.error);
        } else {
          setData(payload);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load LeetCode data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Shell>
        <div className="leetcode-loading" aria-label="Loading LeetCode data" />
      </Shell>
    );
  }

  if (error !== null || data === null) {
    return (
      <Shell>
        <p className="leetcode-error">{error ?? "Failed to load LeetCode data"}</p>
      </Shell>
    );
  }

  const difficulty = [
    { label: "Total", value: data.totalSolved, className: "leetcode-total" },
    { label: "Easy", value: data.easy, className: "leetcode-easy" },
    { label: "Medium", value: data.medium, className: "leetcode-medium" },
    { label: "Hard", value: data.hard, className: "leetcode-hard" },
  ];

  return (
    <Shell>
      <div className="leetcode-card-header">
        <h3>LeetCode profile</h3>
        <div className="leetcode-rating">
          <p>Contest rating</p>
          <strong>{data.contestRating || "N/A"}</strong>
        </div>
      </div>

      <div className="leetcode-difficulty-grid">
        {difficulty.map((item) => (
          <div key={item.label}>
            <strong className={item.className}>{item.value}</strong>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="leetcode-rank-grid">
        <div>
          <strong>{data.streak}</strong>
          <p>Day streak</p>
        </div>
        <div>
          <strong>{data.globalRanking > 0 ? data.globalRanking.toLocaleString() : "N/A"}</strong>
          <p>Global rank</p>
        </div>
      </div>

      {data.badges.length > 0 ? (
        <div className="leetcode-stack">
          <p className="leetcode-label">Badges</p>
          <div className="leetcode-badges">
            {data.badges.map((badge) => (
              <span key={badge.name}>{badge.name}</span>
            ))}
          </div>
        </div>
      ) : null}

      {data.recentSubmissions.length > 0 ? (
        <div className="leetcode-stack">
          <p className="leetcode-label">Recent submissions</p>
          <div className="leetcode-submissions">
            {data.recentSubmissions.map((submission) => (
              <div key={`${submission.title}-${submission.date}`}>
                <span>
                  <strong>{submission.title}</strong>
                  <small>{submission.date}</small>
                </span>
                <em>{submission.status}</em>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <a className="leetcode-profile-link" href="https://leetcode.com/u/aditya05yt/" target="_blank" rel="noreferrer">
        View full profile
      </a>
    </Shell>
  );
}
