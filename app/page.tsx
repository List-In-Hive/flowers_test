import Link from "next/link";
import Image from "next/image";
import { arrangements } from "@/config/catalog";
import { FlowerCard } from "@/components/FlowerCard";
import { BlogCard } from "@/components/Cards";
import { getArticles } from "@/lib/blog";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Flowers with feeling",
  "Thoughtfully composed bouquets and seasonal flowers. Explore arrangements and tell us about your occasion.",
  "/",
);
export default function Home() {
  const articles = getArticles();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">Thoughtfully grown. Artfully gathered.</p>
          <h1>
            Some things
            <br />
            are better said
            <br />
            <em>with flowers.</em>
          </h1>
          <p className="hero-description">
            For the grand gestures. The little thank-yous.
            <br />
            And the beautiful, ordinary days in between.
          </p>
          <Link className="button" href="/flowers">
            Explore the flowers <span aria-hidden="true">↗</span>
          </Link>
          <div className="hero-footnote">
            <span className="fine-line" />
            Seasonal stems. A personal touch.
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/hero.webp"
            alt="Blush roses, ivory flowers and burgundy dahlias in a ceramic vase"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="image-caption">THE BEAUTY IS IN THE DETAILS</span>
        </div>
      </section>
      <div className="values-strip">
        <span>Inspired by the seasons</span>
        <span>Composed with care</span>
        <span>Made for your moment</span>
      </div>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2>A few of our favourites.</h2>
          </div>
          <Link className="text-link" href="/flowers">
            See all flowers <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="product-grid">
          {arrangements.slice(0, 3).map((item) => (
            <FlowerCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <section className="story-section">
        <div className="container story-grid">
          <p className="eyebrow">A note from the studio</p>
          <div>
            <h2>
              Flowers don’t need
              <br />a special occasion.
              <br />
              <em>But they make one.</em>
            </h2>
            <p>
              We love arrangements that feel a little like a garden: expressive,
              full of texture, and never too perfect. Our starting point is
              simple. Beautiful stems, thoughtfully brought together.
            </p>
            <Link href="/about" className="text-link">
              Our approach to flowers <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="container section occasions">
        <p className="eyebrow">Find your moment</p>
        <h2>There’s a flower for that.</h2>
        <div className="occasion-links">
          {[
            {
              n: "Just because",
              d: "Make an ordinary day a little brighter",
              href: "/flowers",
            },
            {
              n: "Love & celebration",
              d: "For the people who mean everything",
              href: "/flowers",
            },
            {
              n: "Weddings & gatherings",
              d: "Something personal for your big day",
              href: "/contact?type=event",
            },
          ].map((o, i) => (
            <Link href={o.href} key={o.n}>
              <span className="occasion-number">0{i + 1}</span>
              <div>
                <h3>{o.n}</h3>
                <p>{o.d}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="journal-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The journal</p>
              <h2>Notes on a blooming life.</h2>
            </div>
            <Link className="text-link" href="/blog">
              Visit the journal <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="product-grid">
            {articles.slice(0, 3).map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
      <section className="container custom-section">
        <p className="eyebrow">Something uniquely yours</p>
        <h2>Have a moment in mind?</h2>
        <p>
          A favourite colour. A meaningful flower. An idea you can’t quite put
          into words.
          <br />
          Let’s make something beautiful together.
        </p>
        <Link href="/contact" className="button">
          Tell us what you’re imagining <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
