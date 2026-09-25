import { Catalog } from "@/components/Catalog";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "The flower collection",
  "Explore seasonal bouquets and arrangements for thoughtful gestures, romance and celebrations.",
  "/flowers",
);
export default function Flowers() {
  return (
    <div className="container page-section">
      <div className="page-intro">
        <p className="eyebrow">The collection</p>
        <h1>
          Find a little <em>beautiful.</em>
        </h1>
        <p>
          Garden-inspired flowers for your kind of moment.
          <br />
          Choose a favourite, then let’s make it personal.
        </p>
      </div>
      <Catalog />
      <p className="catalog-note">
        Flowers follow the seasons. Specific stems and colours may vary; we’ll
        confirm the details with you.
      </p>
    </div>
  );
}
