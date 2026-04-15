import { ArticleCard } from "@/components/article-card";
import { getAllArticles } from "@/lib/content";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Articles</h1>
        <p className="text-zinc-300">Analysis, comparisons, and practical guidance for AI model selection.</p>
      </header>

      <div className="grid gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
