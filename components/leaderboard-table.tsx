"use client";

import { useRouter } from "next/navigation";
import { CategoryKey, LeaderboardResult } from "@/lib/leaderboard";

export function LeaderboardTable({
  rows,
  rubricKeys,
  category
}: {
  rows: LeaderboardResult[];
  rubricKeys: string[];
  category: CategoryKey;
}) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-panel">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-border text-muted">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Model</th>
            <th className="px-4 py-3">Final Score</th>
            {rubricKeys.map((key) => (
              <th key={key} className="px-4 py-3 capitalize">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.slug}
              role="link"
              tabIndex={0}
              onClick={() => router.push(`/models/${row.slug}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(`/models/${row.slug}`);
                }
              }}
              className="cursor-pointer border-b border-border last:border-b-0 hover:bg-zinc-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zinc-500"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-medium">{row.name}</td>
              <td className="px-4 py-3 font-semibold">{row.finalScore.toFixed(1)}</td>
              {rubricKeys.map((key) => (
                <td key={`${row.slug}-${key}`} className="px-4 py-3 text-zinc-300">
                  {row.rubricScores[key].toFixed(1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 text-xs text-muted">Category: {category}</div>
    </div>
  );
}
