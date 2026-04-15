import Link from "next/link";
import { getAllArticles } from "@/lib/content";

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <section className="space-y-10">
      <div className="rounded-lg border border-border bg-panel p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">AI Reviews</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Model rankings and deep editorial analysis.</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Static-first publishing platform for leaderboards and markdown-based model reviews.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Link className="rounded-lg border border-border bg-panel p-6 transition hover:border-zinc-500" href="/leaderboard/overall">
          <h2 className="text-2xl font-semibold">Leaderboards</h2>
          <p className="mt-2 text-zinc-300">Overall, business, developer, and consumer rankings.</p>
        </Link>
        <Link className="rounded-lg border border-border bg-panel p-6 transition hover:border-zinc-500" href="/articles">
          <h2 className="text-2xl font-semibold">Articles</h2>
          <p className="mt-2 text-zinc-300">Markdown-native publishing workflow for editorial content.</p>
        </Link>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest articles</h2>
        <div className="grid gap-4">
          {latestArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="rounded-lg border border-border bg-panel p-5 transition hover:border-zinc-500"
            >
              <p className="text-sm text-muted">{article.date}</p>
              <h3 className="mt-1 text-lg font-semibold">{article.title}</h3>
              <p className="mt-2 text-zinc-300">{article.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
