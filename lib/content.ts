import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type ModelMeta = {
  slug: string;
  name: string;
  rating: number;
  best_for: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");
const MODELS_DIR = path.join(process.cwd(), "content/models");

function readMarkdownFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

export function getAllArticles(): ArticleMeta[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = readMarkdownFile(path.join(ARTICLES_DIR, fileName));

      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        description: String(data.description)
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  const { data, content } = readMarkdownFile(filePath);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    description: String(data.description),
    html: processedContent.toString()
  };
}

export function getAllModelSlugs() {
  return fs
    .readdirSync(MODELS_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getModelBySlug(slug: string) {
  const filePath = path.join(MODELS_DIR, `${slug}.md`);
  const { data, content } = readMarkdownFile(filePath);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    name: String(data.name),
    rating: Number(data.rating),
    best_for: String(data.best_for),
    html: processedContent.toString()
  };
}
