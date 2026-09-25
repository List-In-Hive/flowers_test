import Link from "next/link";
import { site } from "@/config/site";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link className="wordmark" href="/">
            {site.name}
          </Link>
          <p>A little beauty. A lasting feeling.</p>
        </div>
        <div className="footer-links">
          <Link href="/flowers">Explore flowers</Link>
          <Link href="/about">Our story</Link>
          <Link href="/blog">The journal</Link>
          <Link href="/contact">Get in touch</Link>
        </div>
        <div>
          <p>
            For thoughtful gestures
            <br />
            and moments worth celebrating.
          </p>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.phone && <a href={`tel:${site.phone}`}>{site.phone}</a>}
          {site.socialLinks.map((s) => (
            <a key={s.href} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Demonstration studio · Sample arrangements and prices</span>
      </div>
    </footer>
  );
}
