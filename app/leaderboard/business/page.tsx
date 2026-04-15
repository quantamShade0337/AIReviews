import { LeaderboardTable } from "@/components/leaderboard-table";
import { CATEGORY_WEIGHTS, getLeaderboard } from "@/lib/leaderboard";

export default function BusinessLeaderboardPage() {
  const category = "business" as const;
  const rows = getLeaderboard(category);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Business Leaderboard</h1>
        <p className="text-zinc-300">Enterprise reliability, support, and integration depth.</p>
      </header>
      <LeaderboardTable rows={rows} rubricKeys={Object.keys(CATEGORY_WEIGHTS[category])} category={category} />
    </section>
  );
}
