# Validation — 2026-09-25

## Passed

- ESLint: no errors or warnings.
- TypeScript: route type generation and strict type checking.
- Next.js production build: static pages, six arrangement routes, three journal routes, dynamic contact page.
- Six focused content tests: valid article, duplicate slug, invalid metadata, timezone requirement, draft/future exclusion, unsafe cover URL rejection.
- Local production HTTP checks: home, catalogue, arrangement detail, about, contact, journal, article, robots, sitemap and static form definition returned HTTP 200.
- Draft article, missing article and missing arrangement returned HTTP 404.
- Arrangement and size query parameters rendered selected options in the contact form; event query selected Wedding or event.
- React form field names match the Netlify HTML definition.
- All seven local WebP images returned HTTP 200.
- Demo has noindex/nofollow and an empty sitemap.
- AI source images visually inspected before integration.

## Live pilot — 2026-09-25

- Source pushed to `git@github.com:List-In-Hive/flowers_test.git`, branch `main`.
- Netlify deployment available at https://flowerslih.netlify.app/ over HTTPS.
- Live browser checks: home, catalogue, Romance filter, arrangement size and price changes, selected arrangement/size carried into the enquiry form, blog index and article page.
- Netlify detected the `flower-enquiry` form after form detection was enabled and the site redeployed.
- The owner confirmed a successful test enquiry and receipt of the email notification.

## Remaining checks

- Full desktop/mobile visual and accessibility review. Initial live inspection used a narrow browser viewport.
- Custom client domain and production indexing configuration. The current site is a demo.
- Publication of a new article through the agency admin and verification of the resulting deployment.

Local project: `/Users/admin/Desktop/IC/flowers`. The public site remains independent of the planned agency admin.
