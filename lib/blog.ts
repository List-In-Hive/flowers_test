import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
const cover = z
  .string()
  .refine(
    (v) => /^\/(?!\/)[^\s]+$/.test(v) || /^https:\/\/[^\s]+$/.test(v),
    "Use a local /images/ path or HTTPS image URL",
  );
export const articleSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(1),
  publishedAt: z.iso.datetime({ offset: true }),
  status: z.enum(["draft", "published"]),
  coverImage: cover,
  coverAlt: z.string().trim().min(1),
});
export type Article = z.infer<typeof articleSchema> & {
  body: string;
  readingTime: number;
};
export function parseArticles(
  files: { name: string; source: string }[],
): Article[] {
  const slugs = new Set<string>();
  return files.map((file) => {
    const { data, content } = matter(file.source);
    const result = articleSchema.safeParse(data);
    if (!result.success)
      throw new Error(`${file.name}: ${result.error.message}`);
    if (!content.trim()) throw new Error(`${file.name}: article body is empty`);
    if (slugs.has(result.data.slug))
      throw new Error(`Duplicate article slug: ${result.data.slug}`);
    slugs.add(result.data.slug);
    return {
      ...result.data,
      body: content,
      readingTime: Math.max(
        1,
        Math.ceil(content.trim().split(/\s+/).length / 220),
      ),
    };
  });
}
export function publicArticles(articles: Article[], now = new Date()) {
  return articles
    .filter(
      (a) =>
        a.status === "published" &&
        new Date(a.publishedAt).getTime() <= now.getTime(),
    )
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
export function getArticles(): Article[] {
  const directory = path.join(process.cwd(), "content/blog");
  const files = fs
    .readdirSync(directory)
    .filter((f) => f.endsWith(".md"))
    .map((name) => ({
      name,
      source: fs.readFileSync(path.join(directory, name), "utf8"),
    }));
  const articles = parseArticles(files);
  for (const article of articles) {
    if (article.coverImage.startsWith("/")) {
      const publicRoot = path.join(process.cwd(), "public");
      const image = path.resolve(publicRoot, `.${article.coverImage}`);
      if (!image.startsWith(publicRoot + path.sep) || !fs.existsSync(image))
        throw new Error(`Missing or invalid cover image for ${article.slug}`);
    }
  }
  return publicArticles(articles);
}
export function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
