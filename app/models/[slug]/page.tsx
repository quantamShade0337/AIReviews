import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getAllModelSlugs, getModelBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ slug }));
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const model = await getModelBySlug(slug);

    return (
      <article className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2 rounded-lg border border-border bg-panel p-6">
          <h1 className="text-3xl font-semibold tracking-tight">{model.name}</h1>
          <p className="text-zinc-300">Rating: <span className="text-text">{model.rating.toFixed(1)}/10</span></p>
          <p className="text-zinc-300">Best for: <span className="text-text">{model.best_for}</span></p>
        </header>
        <MarkdownRenderer html={model.html} />
      </article>
    );
  } catch {
    notFound();
  }
}
