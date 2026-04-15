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

function getStringValue(
  value: unknown,
  fallback: string
) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function normalizeDate(value: unknown) {
  const date = getStringValue(value, "");
  return date;
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
        title: getStringValue(data.title, slug.replace(/-/g, " ")),
        date: normalizeDate(data.date),
        description: getStringValue(data.description, "No description provided yet.")
      };
    })
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
}

export async function getArticleBySlug(slug: string) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  const { data, content } = readMarkdownFile(filePath);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: getStringValue(data.title, slug.replace(/-/g, " ")),
    date: normalizeDate(data.date),
    description: getStringValue(data.description, "No description provided yet."),
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
    name: getStringValue(data.name, slug.replace(/-/g, " ")),
    rating: typeof data.rating === "number" ? data.rating : Number(data.rating) || 0,
    best_for: getStringValue(data.best_for, "General usage"),
    html: processedContent.toString()
  };
}
