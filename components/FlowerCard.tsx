import Link from "next/link";
import Image from "next/image";
import { price, type Arrangement } from "@/config/catalog";
export function FlowerCard({ item }: { item: Arrangement }) {
  return (
    <article className="flower-card">
      <Link href={`/flowers/${item.slug}`}>
        <div className="flower-picture">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 30vw"
          />
          <span className="card-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="card-heading">
          <h3>{item.name}</h3>
          <span>from {price(item.sizes[0].price)}</span>
        </div>
        <p>{item.category}</p>
      </Link>
    </article>
  );
}
