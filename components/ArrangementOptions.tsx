"use client";
import { useState } from "react";
import Link from "next/link";
import { type Arrangement, price } from "@/config/catalog";
export function ArrangementOptions({ item }: { item: Arrangement }) {
  const [size, setSize] = useState(item.sizes[0]);
  return (
    <div className="arrangement-options">
      <p className="detail-price">{price(size.price)}</p>
      <fieldset>
        <legend>Make it your own</legend>
        <div className="size-options">
          {item.sizes.map((s) => (
            <label key={s.label}>
              <input
                type="radio"
                name="size"
                value={s.label}
                checked={size.label === s.label}
                onChange={() => setSize(s)}
              />
              <span>{s.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <Link
        className="button"
        href={`/contact?arrangement=${encodeURIComponent(item.slug)}&size=${encodeURIComponent(size.label)}`}
      >
        Enquire about this arrangement <span aria-hidden="true">↗</span>
      </Link>
      <p className="small muted">
        This is an enquiry, not a confirmed order. Availability and final
        details are confirmed personally.
      </p>
    </div>
  );
}
