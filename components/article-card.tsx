import Link from "next/link";
import { ArticleMeta } from "@/lib/content";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block rounded-lg border border-border bg-panel p-6 transition hover:border-zinc-500"
    >
      <h2 className="text-2xl font-semibold tracking-tight">{article.title}</h2>
      <p className="mt-2 text-sm text-muted">{article.date}</p>
      <p className="mt-4 text-zinc-300">{article.description}</p>
    </Link>
  );
}
