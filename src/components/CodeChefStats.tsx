"use client";

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="leetcode-shell">{children}</div>;
}

export function CodeChefStats() {
  const difficulty = [
    { label: "Stars", value: "3★", className: "leetcode-total" },
    { label: "Max Rating", value: "1676", className: "leetcode-medium" },
    { label: "Global Rank", value: "9538", className: "leetcode-easy" },
    { label: "Country Rank", value: "8549", className: "leetcode-hard" },
  ];

  return (
    <Shell>
      <div className="leetcode-card-header">
        <h3>CodeChef profile</h3>
        <div className="leetcode-rating">
          <p>Contest rating</p>
          <strong>1676</strong>
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
          <strong>Div 2</strong>
          <p>Division</p>
        </div>
        <div>
          <strong>Active</strong>
          <p>Status</p>
        </div>
      </div>

      <a className="leetcode-profile-link" href="https://www.codechef.com/users/adityakumar5" target="_blank" rel="noreferrer">
        View full profile
      </a>
    </Shell>
  );
}
