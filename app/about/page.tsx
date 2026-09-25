import Link from "next/link";
import Image from "next/image";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Our approach",
  "An expressive, seasonal approach to floral design. Learn about Petal & Stem.",
  "/about",
);
export default function About() {
  return (
    <div className="container page-section">
      <div className="page-intro">
        <p className="eyebrow">Our approach</p>
        <h1>
          A little wild.
          <br />
          <em>Always thoughtful.</em>
        </h1>
      </div>
      <div className="about-grid">
        <div className="about-image">
          <Image
            src="/images/hero.webp"
            alt="Seasonal flowers arranged on a studio table"
            fill
            sizes="(max-width:760px) 90vw, 50vw"
          />
        </div>
        <div className="prose">
          <h2>Let the flowers be flowers.</h2>
          <p>
            Petal & Stem is a concept for a floral studio built around a simple
            idea: flowers should feel as individual as the people receiving
            them.
          </p>
          <p>
            We’re drawn to movement, texture, and colours that belong together
            without matching perfectly. A curving stem, an unexpected accent, a
            little space to breathe.
          </p>
          <h3>Led by the season</h3>
          <p>
            Every arrangement starts with a feeling. The exact flowers can
            change with availability, while the mood and palette guide the
            design.
          </p>
          <h3>Made personal</h3>
          <p>
            Tell us what matters to you: an occasion, a colour, a meaningful
            flower. We’ll discuss the possibilities and confirm the details
            before an order goes ahead.
          </p>
          <Link href="/contact" className="button">
            Let’s talk flowers <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
