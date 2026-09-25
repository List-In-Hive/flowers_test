import type { MetadataRoute } from "next";
import { indexable, absolute } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: "/__forms.html" }
      : { userAgent: "*", disallow: "/" },
    ...(indexable ? { sitemap: absolute("/sitemap.xml") } : {}),
  };
}
