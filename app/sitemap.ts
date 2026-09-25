import type { MetadataRoute } from "next";
import { absolute, indexable } from "@/lib/seo";
import { arrangements } from "@/config/catalog";
import { getArticles } from "@/lib/blog";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return [
    ...[
      "/",
      "/flowers",
      "/about",
      "/contact",
      "/blog",
      ...arrangements.map((a) => `/flowers/${a.slug}`),
    ].map((path) => ({ url: absolute(path)! })),
    ...getArticles().map((a) => ({
      url: absolute(`/blog/${a.slug}`)!,
      lastModified: a.publishedAt,
    })),
  ];
}
