# Petal & Stem — Flowers

A standalone demonstration flower website built with Next.js App Router, TypeScript, Markdown articles and Netlify Forms. Website copy and documentation are in English. The public site does not require the Inspirovate admin, database or OpenAI credentials to build or run.

Repository: [List-In-Hive/flowers_test](https://github.com/List-In-Hive/flowers_test). Demo website: [flowerslih.netlify.app](https://flowerslih.netlify.app/).

## Local development

Use Node.js 24 (or a compatible version satisfying package.json), then run from this repository:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open the address printed by Next.js, normally http://localhost:3000. For a production preview, run `npm run build`, then `npm start`. Stop any existing server on the same port first.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Pages and editing

- `/`: featured arrangements, studio approach, occasions and articles.
- `/flowers` and `/flowers/[slug]`: catalogue, category filters and arrangement details.
- `/contact`: enquiry with arrangement/size prefill and event or delivery details.
- `/about`: studio introduction.
- `/blog` and `/blog/[slug]`: published Markdown articles with covers and supporting images.

Business identity and navigation live in `config/site.ts`; catalogue data in `config/catalog.ts`; styling in `app/globals.css`; local WebP files in `public/images`. Hidden/blank contact details should only be replaced with verified public details. The form logic is in `components/ContactForm.tsx` and the matching Netlify definition in `public/__forms.html`.

Petal & Stem is fictional. Prices are examples and AI images are not photographs of real stock. Replace demo claims, prices and assets before a real commercial launch. See [ASSETS.md](ASSETS.md) for image provenance. There is no cart, payment processing, customer account or built-in AI generator.

## Article format and publication

Add `content/blog/a-thoughtful-floral-story.md`:

```markdown
---
title: "A thoughtful floral story"
slug: "a-thoughtful-floral-story"
description: "A concise description of the article."
publishedAt: "2026-01-15T09:00:00Z"
status: "published"
coverImage: "/images/arrangement-1.webp"
coverAlt: "A blush rose bouquet"
---

Article text in **Markdown**.

## A useful heading

More text and an [internal link](/flowers).
```

Use an existing WebP path. Keep dates quoted, with a timezone offset, and slugs descriptive with lowercase letters, numbers and hyphens. Duplicate slugs, invalid metadata, empty bodies and missing local covers fail validation. An optional `publicationId` can be supplied by the publisher.

Only published, nonfuture articles appear on routes, lists and sitemap. Future dates alone do not trigger a build. The external worker pushes the article when due; Netlify then rebuilds. Raw HTML is skipped when rendering Markdown. The cover appears once on the article; supporting photos use normal Markdown image syntax and must exist under `public/images`.

`lib/publication.ts` computes the same hash as the admin. The article route includes `data-publication-hash`; `scripts/publication-manifest.ts` runs through `prebuild` to create `public/publication-manifest.json` from Netlify's deployment identifiers and the public article hashes. The generated manifest is not committed. Preserve this contract when redesigning the website.

Published articles can be edited through Git. Changing a published slug requires a redirect. New articles do not require editing React components. The admin currently verifies the exact publication commit, so a later unrelated deploy can prevent verification of an earlier pending publication.

## Netlify deployment and enquiry form

1. Import this repository into Netlify using the production branch. Leave Base directory empty, use `npm run build` and publish `.next`. Keep the automatic Next.js adapter; do not force a static export.
2. Use the committed `.nvmrc` to select Node without manually entering NODE_VERSION.
3. Netlify's built-in `URL` supplies the primary site origin. No manual SITE_URL is needed there. Outside Netlify, SITE_URL is an optional override. Rebuild after a primary-domain change.
4. Enable **Forms → Form detection**, then deploy again. Confirm `flower-enquiry` appears with the expected fields.
5. Configure the receiving email through Netlify form submission notifications.
6. Set this template's `NEXT_PUBLIC_FORMS_ENABLED=true` for the intended deployment and rebuild. It defaults to false and is embedded at build time.
7. Submit a clearly marked test enquiry on the deployed site. Check the Netlify record and actual email, including arrangement, size, date and message.

The React form and `public/__forms.html` must use identical field names. Submission is a URL-encoded AJAX POST to `/__forms.html`, including `form-name` and a honeypot. Success is shown only after an OK response; errors preserve the form values and repeated clicks are blocked while sending. Local or disabled forms honestly report that nothing was sent. An enquiry is not an order confirmation or payment.

The sample keeps indexing disabled with `ALLOW_INDEXING=false`. Enable it only after replacing demonstration content and reviewing production metadata. Previews remain excluded from indexing. Relative navigation needs no origin; canonical, social and sitemap URLs use the primary production origin.

Official guidance: [Next.js deployment](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [Forms setup](https://docs.netlify.com/manage/forms/setup/), [Forms troubleshooting](https://docs.netlify.com/manage/forms/troubleshooting-tips/), [built-in environment variables](https://docs.netlify.com/build/configure-builds/environment-variables/).

## Connect to Inspirovate Admin

Set the live website URL in GitHub's About section. In the admin, choose All projects → Add project and paste the repository URL. Grant the server token Contents read/write for this repository. Import can use a paid AI request to suggest business rules; it does not deploy the site or start automation.

Review Project settings, the live URL, Blog rules & settings, enabled Knowledge and Blog library. Confirm website setup, test a draft and verified publication, then enable the Calendar if required. The shared **Documentation** section in the admin sidebar contains a complete website-building prompt and developer contract. Updating blog counts does not retroactively rewrite old articles.

## Handover and verification

Check mobile navigation, filters, enquiry prefill, images, missing-page behavior, canonical, sitemap and form delivery on the live deployment. Source checks alone cannot prove Netlify email delivery. See [VALIDATION.md](VALIDATION.md) for the existing validation record; it is not a claim that every later change was retested.

Transfer source, Markdown, assets, repository and hosting access as appropriate. Update the recipient and domain, rebuild and test a new enquiry. Each client website is independent; moving away from Netlify requires replacing its form handler. The agency scheduler can be disabled separately from the site.
