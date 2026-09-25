import { ContactForm } from "@/components/ContactForm";
import { arrangements } from "@/config/catalog";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Let’s talk flowers",
  "Enquire about a bouquet, a custom arrangement or flowers for your wedding and event.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const item = arrangements.find((a) => a.slug === query.arrangement);
  const size = item?.sizes.find((s) => s.label === query.size)?.label ?? "";
  return (
    <div className="container page-section contact-grid">
      <div className="contact-copy">
        <p className="eyebrow">Get in touch</p>
        <h1>
          Good things
          <br />
          start with
          <br />
          <em>a hello.</em>
        </h1>
        <p>
          A bouquet, a celebration, or just the beginning of an idea. Tell us
          what you have in mind.
        </p>
        {site.email && (
          <a className="text-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        )}
        {site.phone && (
          <a className="text-link" href={`tel:${site.phone}`}>
            {site.phone}
          </a>
        )}
        {site.whatsapp && (
          <a className="text-link" href={`https://wa.me/${site.whatsapp}`}>
            Message us on WhatsApp
          </a>
        )}
        <div className="contact-note">
          <h3>A personal conversation</h3>
          <p>
            We’ll discuss the flowers, timing and final price with you. Sending
            an enquiry doesn’t reserve a date or confirm an order.
          </p>
        </div>
      </div>
      <ContactForm
        key={`${item?.slug ?? ""}-${size}-${query.type ?? ""}`}
        arrangement={item?.slug}
        size={size}
        event={query.type === "event"}
      />
    </div>
  );
}
