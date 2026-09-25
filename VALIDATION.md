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

## Not verified

- Interactive desktop/mobile browser inspection: this environment's browser blocked localhost (`ERR_BLOCKED_BY_CLIENT`). Responsive styles are implemented, but visual browser QA and client interactions need checking after local launch.
- Real Netlify deployment, form recording and delivery of email notifications.
- Production domain, HTTPS and production indexing configuration.
- GitHub repository creation or upload.

The project is delivered as source files, with no public deployment. No folder was created on the user's Mac: that filesystem is not connected. Extract the archive on Desktop to create `~/Desktop/flowers`.
