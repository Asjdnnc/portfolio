import { NextResponse } from "next/server";

type LeetCodeDifficulty = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
};

type LeetCodeBadge = {
  displayName: string;
  icon: string;
};

type LeetCodeSubmission = {
  title: string;
  timestamp: string;
};

type LeetCodeResponse = {
  data?: {
    userContestRanking?: {
      rating?: number;
      globalRanking?: number;
    } | null;
    matchedUser?: {
      badges?: LeetCodeBadge[];
      submitStats?: {
        acSubmissionNum?: LeetCodeDifficulty[];
      };
      userCalendar?: {
        streak?: number;
      };
    } | null;
    recentAcSubmissionList?: LeetCodeSubmission[];
  };
  errors?: unknown;
};

const query = `
  query portfolioLeetCode($username: String!, $limit: Int!) {
    userContestRanking(username: $username) {
      rating
      globalRanking
    }
    matchedUser(username: $username) {
      badges {
        displayName
        icon
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        streak
      }
    }
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      timestamp
    }
  }
`;

function countFor(items: LeetCodeDifficulty[] | undefined, difficulty: LeetCodeDifficulty["difficulty"]) {
  return items?.find((item) => item.difficulty === difficulty)?.count ?? 0;
}

function formatDate(timestamp: string) {
  const value = Number(timestamp);
  if (!Number.isFinite(value)) {
    return "Recent";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value * 1000));
}

export async function GET() {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        username: "aditya05yt",
        limit: 5,
      },
    }),
    next: {
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to load LeetCode data" }, { status: 502 });
  }

  const payload = (await response.json()) as LeetCodeResponse;
  if (payload.errors || !payload.data?.matchedUser) {
    return NextResponse.json({ error: "LeetCode profile data is unavailable" }, { status: 502 });
  }

  const solved = payload.data.matchedUser.submitStats?.acSubmissionNum;
  const badges = payload.data.matchedUser.badges ?? [];
  const recentSubmissions = payload.data.recentAcSubmissionList ?? [];
  const ranking = payload.data.userContestRanking;

  return NextResponse.json({
    totalSolved: countFor(solved, "All"),
    easy: countFor(solved, "Easy"),
    medium: countFor(solved, "Medium"),
    hard: countFor(solved, "Hard"),
    streak: payload.data.matchedUser.userCalendar?.streak ?? 0,
    globalRanking: ranking?.globalRanking ?? 0,
    contestRating: ranking?.rating ? Math.round(ranking.rating) : 0,
    badges: badges.slice(0, 4).map((badge) => ({
      name: badge.displayName,
      icon: badge.icon,
    })),
    recentSubmissions: recentSubmissions.map((submission) => ({
      title: submission.title,
      date: formatDate(submission.timestamp),
      status: "Accepted",
    })),
  });
}
