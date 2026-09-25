import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { arrangements } from "@/config/catalog";
import { ArrangementOptions } from "@/components/ArrangementOptions";
import { FlowerCard } from "@/components/FlowerCard";
import { metadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return arrangements.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = arrangements.find((a) => a.slug === slug);
  if (!item) notFound();
  return metadata(item.name, item.description, `/flowers/${slug}`, item.image);
}
export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = arrangements.find((a) => a.slug === slug);
  if (!item) notFound();
  return (
    <div className="container page-section">
      <Link className="back-link" href="/flowers">
        ← The collection
      </Link>
      <section className="detail-grid">
        <div className="detail-image">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority
            sizes="(max-width:760px) 90vw, 50vw"
          />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{item.category} · Seasonal composition</p>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <ArrangementOptions item={item} />
          <details>
            <summary>The flowers</summary>
            <p>
              {item.flowers}. Seasonal availability may affect the final
              selection. We’ll confirm substitutions before your order is
              accepted.
            </p>
          </details>
          <details>
            <summary>A little care goes a long way</summary>
            <p>
              Use a clean vase, refresh the water regularly, and keep your
              flowers away from direct heat. Ask us for care notes for your
              specific stems.
            </p>
          </details>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>You might also love.</h2>
        </div>
        <div className="product-grid">
          {arrangements
            .filter((a) => a.slug !== slug)
            .slice(0, 3)
            .map((a) => (
              <FlowerCard key={a.slug} item={a} />
            ))}
        </div>
      </section>
    </div>
  );
}
