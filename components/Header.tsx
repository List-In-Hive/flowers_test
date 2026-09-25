"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/config/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="wordmark-caption">A FLORAL STUDIO</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {site.navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path.startsWith(n.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="button button-small"
            onClick={() => setOpen(false)}
          >
            Let’s make something
          </Link>
        </nav>
      </div>
    </header>
  );
}
