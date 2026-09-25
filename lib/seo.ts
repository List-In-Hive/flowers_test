import type { Metadata } from "next";
import { site } from "@/config/site";
const raw = process.env.SITE_URL?.trim();
export const siteUrl = raw ? new URL(raw) : undefined;
if (
  siteUrl &&
  (!/^https?:$/.test(siteUrl.protocol) ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash)
)
  throw new Error(
    "SITE_URL must be an http(s) origin without a path, query or fragment.",
  );
const preview = process.env.CONTEXT && process.env.CONTEXT !== "production";
export const indexable = Boolean(
  siteUrl && process.env.ALLOW_INDEXING === "true" && !preview,
);
if (process.env.ALLOW_INDEXING === "true" && !siteUrl)
  throw new Error("SITE_URL is required when ALLOW_INDEXING=true.");
export function absolute(path: string) {
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}
export function metadata(
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: absolute(path) } : undefined,
    openGraph: {
      title,
      description,
      siteName: site.name,
      type: "website",
      ...(siteUrl
        ? {
            url: absolute(path),
            ...(image ? { images: [{ url: absolute(image)! }] } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteUrl && image ? { images: [absolute(image)!] } : {}),
    },
  };
}
