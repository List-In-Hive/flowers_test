import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import { getArticles, dateLabel } from "@/lib/blog";
import { metadata, absolute } from "@/lib/seo";
import { BlogCard } from "@/components/Cards";
import { publicationHash } from "@/lib/publication";
export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticles().find((a) => a.slug === slug);
  if (!a) notFound();
  return metadata(a.title, a.description, `/blog/${slug}`, a.coverImage);
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    ...(absolute("/")
      ? { url: absolute(`/blog/${slug}`), image: absolute(article.coverImage) }
      : {}),
  };
  return (
    <div className="container page-section">
      <Link className="back-link" href="/blog">
        ← The journal
      </Link>
      <article data-publication-hash={publicationHash(article)}>
        <header className="article-header">
          <p className="eyebrow">
            {dateLabel(article.publishedAt)} · {article.readingTime} min read
          </p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </header>
        <div className="article-cover">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            priority
            unoptimized={article.coverImage.startsWith("https:")}
            sizes="(max-width: 1200px) 90vw, 1152px"
          />
        </div>
        <div className="prose article-body">
          <Markdown skipHtml>{article.body}</Markdown>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
        }}
      />
      <section className="section">
        <h2>More from the journal.</h2>
        <div className="product-grid related-posts">
          {articles
            .filter((a) => a.slug !== slug)
            .slice(0, 2)
            .map((a) => (
              <BlogCard key={a.slug} article={a} />
            ))}
        </div>
      </section>
    </div>
  );
}
