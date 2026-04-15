import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);

    return (
      <article className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          {article.date ? <p className="text-sm text-muted">{article.date}</p> : null}
          <h1 className="text-4xl font-semibold tracking-tight">{article.title}</h1>
          <p className="text-zinc-300">{article.description}</p>
        </header>
        <MarkdownRenderer html={article.html} />
      </article>
    );
  } catch {
    notFound();
  }
}
