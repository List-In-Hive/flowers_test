import Link from "next/link";
import Image from "next/image";
import { type Article, dateLabel } from "@/lib/blog";
export function BlogCard({ article }: { article: Article }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${article.slug}`}>
        <div className="blog-picture">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            unoptimized={article.coverImage.startsWith("https:")}
            sizes="(max-width: 640px) 90vw, 30vw"
          />
        </div>
        <p className="eyebrow">
          {dateLabel(article.publishedAt)} · {article.readingTime} min read
        </p>
        <h3>{article.title}</h3>
        <span className="text-link">
          Read the story <span aria-hidden="true">↗</span>
        </span>
      </Link>
    </article>
  );
}
