import { getArticles } from "@/lib/blog";
import { BlogCard } from "@/components/Cards";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "The journal",
  "Flower care, thoughtful gifting and notes on seasonal floral design.",
  "/blog",
);
export default function Blog() {
  return (
    <div className="container page-section">
      <div className="page-intro">
        <p className="eyebrow">The journal</p>
        <h1>
          Notes on a <em>blooming life.</em>
        </h1>
        <p>
          A little inspiration, a little know-how.
          <br />
          More ways to enjoy the flowers around you.
        </p>
      </div>
      <div className="product-grid">
        {getArticles().map((a) => (
          <BlogCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
