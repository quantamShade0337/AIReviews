export function MarkdownRenderer({ html }: { html: string }) {
  return <article className="prose-custom" dangerouslySetInnerHTML={{ __html: html }} />;
}
